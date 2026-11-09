// RSN smart-form helpers for jesserazo.com (TypeScript port of the gitlever-home
// api/_lib standard: attribution.js, notify.js).
//   - Safe upsert: find by email; create only if new; existing contacts keep name/email/phone
//   - First/last-touch attribution custom fields + a note recording both touches
//   - Slack as the durable fallback when HighLevel is missing or fails
//
// Env:
//   GHL_PRIVATE_TOKEN, GHL_LOCATION_ID, GHL_VERSION (optional, default 2021-07-28)
//   Slack (optional, recommended), either:
//     SLACK_BOT_TOKEN + SLACK_NOTIFICATION_CHANNEL (default C05Q3RKUQGL, same as gitlever.ai)
//     SLACK_NOTIFICATION_WEBHOOK or SLACK_WEBHOOK_URL

const GHL = "https://services.leadconnectorhq.com";
const env = (k: string) => (process.env[k] || "").trim().replace(/\r?\n/g, "");

export function ghlConfig() {
  const token = env("GHL_PRIVATE_TOKEN");
  const locationId = env("GHL_LOCATION_ID");
  const version = env("GHL_VERSION") || "2021-07-28";
  return token && locationId ? { token, locationId, version } : null;
}

// ---------- attribution ----------
type Touch = { source: string; medium: string; campaign: string; landing_page: string; referrer: string; at: string };
export type Attribution = { form: string; site: string; first: Touch; last: Touch };

const s = (v: unknown, n: number) => String(v == null ? "" : v).replace(/[\x00-\x1F\x7F<>]/g, " ").trim().slice(0, n);
const KEYS: (keyof Touch)[] = ["source", "medium", "campaign", "landing_page", "referrer", "at"];

function touch(input: unknown, fallback: Touch): Touch {
  if (!input || typeof input !== "object") return fallback;
  const o = input as Record<string, unknown>;
  const t = {} as Touch;
  for (const k of KEYS) t[k] = s(o[k], k === "landing_page" ? 300 : 120);
  if (!t.source) t.source = fallback.source;
  const d = new Date(t.at);
  t.at = isNaN(d.getTime()) ? fallback.at : d.toISOString();
  return t;
}

export function parseAttribution(input: unknown, form: string, site: string, pageUrl: string): Attribution {
  const base: Touch = { source: "direct", medium: "none", campaign: "", landing_page: s(pageUrl, 300), referrer: "", at: new Date().toISOString() };
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const last = touch(o.last, base);
  return { form: s(form, 60), site: s(o.site || site, 120), first: touch(o.first, last), last };
}

function fields(prefix: "first" | "last", t: Touch, form: string) {
  return [
    { key: `${prefix}_touch_source`, field_value: t.source },
    { key: `${prefix}_touch_medium`, field_value: t.medium },
    { key: `${prefix}_touch_campaign`, field_value: t.campaign },
    { key: `${prefix}_touch_landing_page`, field_value: t.landing_page },
    { key: `${prefix}_touch_form`, field_value: form },
    { key: `${prefix}_touch_date`, field_value: t.at.slice(0, 10) },
  ];
}
const attributionFields = (a: Attribution, isNew: boolean) => [...(isNew ? fields("first", a.first, a.form) : []), ...fields("last", a.last, a.form)];

export function attributionNote(a: Attribution, isNew: boolean) {
  const line = (label: string, t: Touch) =>
    `${label}: ${t.source} / ${t.medium}${t.campaign ? " / " + t.campaign : ""}${t.landing_page ? " at " + t.landing_page : ""}${
      t.referrer ? " (from " + t.referrer + ")" : ""
    } on ${t.at.slice(0, 10)}`;
  return [`Attribution (${a.form} on ${a.site}):`, isNew ? line("First touch", a.first) : "First touch: unchanged (existing contact)", line("Last touch", a.last)].join("\n");
}

// ---------- HighLevel ----------
type Cfg = NonNullable<ReturnType<typeof ghlConfig>>;
const headers = (c: Cfg) => ({ Authorization: `Bearer ${c.token}`, Version: c.version, "Content-Type": "application/json" });
const timeout = (ms: number) => AbortSignal.timeout(ms);

export async function upsertSafely(
  c: Cfg,
  payload: Record<string, unknown> & { email: string },
  tags: string[],
  attribution: Attribution,
): Promise<{ contactId: string | null; existed: boolean }> {
  let contactId: string | null = null;
  let existed = false;
  try {
    const f = await fetch(`${GHL}/contacts/search/duplicate?locationId=${encodeURIComponent(c.locationId)}&email=${encodeURIComponent(payload.email)}`, {
      headers: headers(c),
      signal: timeout(6000),
    });
    const fj = await f.json().catch(() => ({}));
    contactId = fj?.contact?.id || null;
    existed = !!contactId;
  } catch {
    /* fall through to create */
  }

  if (!contactId) {
    const post = (body: object) => fetch(`${GHL}/contacts/`, { method: "POST", headers: headers(c), signal: timeout(8000), body: JSON.stringify(body) });
    const base = { locationId: c.locationId, ...payload, tags };
    let r = await post({ ...base, customFields: attributionFields(attribution, true) });
    let j = await r.json().catch(() => ({}));
    if (!r.ok && !j?.contact?.id && !j?.meta?.contactId) {
      // Location may not have the attribution fields yet: never lose the contact.
      console.warn(JSON.stringify({ event: "ghl_create_with_attribution_failed", status: r.status }));
      r = await post(base);
      j = await r.json().catch(() => ({}));
    }
    contactId = j?.contact?.id || j?.meta?.contactId || null;
    existed = !j?.contact?.id && !!contactId;
  }

  if (contactId && existed) {
    await Promise.allSettled([
      fetch(`${GHL}/contacts/${contactId}/tags`, { method: "POST", headers: headers(c), signal: timeout(6000), body: JSON.stringify({ tags }) }),
      fetch(`${GHL}/contacts/${contactId}`, {
        method: "PUT",
        headers: headers(c),
        signal: timeout(6000),
        body: JSON.stringify({ customFields: attributionFields(attribution, false) }),
      }),
    ]);
  }
  return { contactId, existed };
}

export async function addNote(c: Cfg, contactId: string, body: string) {
  try {
    const r = await fetch(`${GHL}/contacts/${contactId}/notes`, { method: "POST", headers: headers(c), signal: timeout(6000), body: JSON.stringify({ body }) });
    if (!r.ok) console.warn(JSON.stringify({ event: "ghl_note_failed", status: r.status }));
    return r.ok;
  } catch {
    console.warn(JSON.stringify({ event: "ghl_note_error" }));
    return false;
  }
}

export async function sendEmail(c: Cfg, contactId: string, msg: { subject: string; html: string; emailFrom: string; emailFromName: string }) {
  const r = await fetch(`${GHL}/conversations/messages`, {
    method: "POST",
    headers: headers(c),
    signal: timeout(6000),
    body: JSON.stringify({ type: "Email", contactId, ...msg }),
  });
  if (!r.ok) {
    const detail = (await r.text().catch(() => "")).slice(0, 300);
    console.warn(JSON.stringify({ event: "ghl_email_failed", status: r.status, detail }));
  }
}

// ---------- Slack ----------
const slackBot = () => env("SLACK_BOT_TOKEN") || env("LEVER_SLACK_BOT_TOKEN");
const slackWebhook = () => env("SLACK_NOTIFICATION_WEBHOOK") || env("SLACK_WEBHOOK_URL");

export function slackConfigured() {
  return Boolean(slackBot() || slackWebhook());
}

export async function postSlack(text: string) {
  const bot = slackBot();
  if (bot) {
    try {
      const channel = env("SLACK_NOTIFICATION_CHANNEL") || env("LEVER_SLACK_NOTIFICATION_CHANNEL") || "C05Q3RKUQGL";
      const r = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: { Authorization: `Bearer ${bot}`, "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ channel, text }),
        signal: timeout(5000),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) return true;
      console.warn(JSON.stringify({ event: "slack_bot_failed", status: r.status, error: j?.error }));
    } catch {
      console.warn(JSON.stringify({ event: "slack_bot_error" }));
    }
  }
  const webhook = slackWebhook();
  if (webhook) {
    try {
      const r = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }), signal: timeout(5000) });
      if (r.ok) return true;
      console.warn(JSON.stringify({ event: "slack_webhook_failed", status: r.status }));
    } catch {
      console.warn(JSON.stringify({ event: "slack_webhook_error" }));
    }
  }
  return false;
}

export function leadText(title: string, rows: [string, string | null | undefined][]) {
  const lines = [`*${title}*`];
  for (const [label, value] of rows) if (value) lines.push(`- *${label}:* ${String(value).slice(0, 1500)}`);
  return lines.join("\n");
}
