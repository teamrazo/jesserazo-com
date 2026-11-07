// Minimal HighLevel client: upsert a contact, then attach a note.
// Uses the same env names as the other RSN Vercel projects.

const API = "https://services.leadconnectorhq.com";

type Upsert = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  tags?: string[];
  source: string;
};

export function ghlConfigured() {
  return Boolean(process.env.GHL_PRIVATE_TOKEN && process.env.GHL_LOCATION_ID);
}

function headers() {
  return {
    Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export function envTags(name: string): string[] {
  return (process.env[name] || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function upsertWithNote(contact: Upsert, note: string) {
  // Tags are added separately so existing tags on the contact are never replaced.
  const { tags, ...rest } = contact;
  const body: Record<string, unknown> = { ...rest, locationId: process.env.GHL_LOCATION_ID };

  const res = await fetch(`${API}/contacts/upsert`, { method: "POST", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`GHL upsert ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { contact?: { id?: string } };
  const id = json.contact?.id;

  if (id && tags?.length) {
    const t = await fetch(`${API}/contacts/${id}/tags`, { method: "POST", headers: headers(), body: JSON.stringify({ tags }) });
    if (!t.ok) console.error("GHL tags failed", t.status, await t.text());
  }

  if (id && note) {
    const n = await fetch(`${API}/contacts/${id}/notes`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ body: note }),
    });
    if (!n.ok) console.error("GHL note failed", n.status, await n.text());
  }
  return id;
}

type Touch = { url?: string; referrer?: string; utm?: Record<string, string>; at?: string } | null;

export function attributionNote(a?: { first?: Touch; last?: Touch }) {
  const fmt = (label: string, t?: Touch) =>
    t
      ? `${label}: ${t.url || ""}${t.referrer ? ` (referrer ${t.referrer})` : ""}${
          t.utm && Object.keys(t.utm).length ? ` utm ${JSON.stringify(t.utm)}` : ""
        } at ${t.at || ""}`
      : `${label}: unknown`;
  return [fmt("First touch", a?.first), fmt("Last touch", a?.last)].join("\n");
}

export function clean(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendEmail(
  contactId: string,
  msg: { subject: string; html: string; emailFrom: string; emailFromName: string },
) {
  const res = await fetch(`${API}/conversations/messages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ type: "Email", contactId, ...msg }),
  });
  if (!res.ok) throw new Error(`GHL email ${res.status}: ${await res.text()}`);
}
