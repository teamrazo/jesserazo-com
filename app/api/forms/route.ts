import { NextResponse } from "next/server";
import { guardedJson } from "@/lib/guard";
import { addNote, attributionNote, ghlConfig, leadText, parseAttribution, postSlack, sendEmail, upsertSafely } from "@/lib/rsn-forms";

// POST /api/forms   body.form = "freedom" | "apply"
//   freedom: FREEDOM Project signup. Same list, tags and confirmation email as the gitlever.ai pop-up.
//   apply:   Work with Jesse application. Answers saved as a contact note and posted to Slack.
// The visitor sees success only when HighLevel or Slack stored the lead.

const SITE = "jesserazo.com";
// Existing tags only. Site-specific source/report tags need Jesse's OK first.
const FREEDOM_TAGS = ["action - email - subscribe", "action - lever ai project update - subscribed", "notify:new-lead"];
const APPLY_TAGS = ["notify:new-lead"];

const str = (v: unknown, n: number) => String(v == null ? "" : v).trim().slice(0, n);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const parsed = await guardedJson(req);
  if (parsed instanceof NextResponse) return parsed;
  const body = parsed;

  if (str(body.company_website, 200)) return NextResponse.json({ ok: true }); // honeypot

  const form = body.form === "apply" ? "apply" : "freedom";
  const email = str(body.email, 250).toLowerCase();
  const pageUrl = str(body.pageUrl, 500) || "https://www.jesserazo.com/";
  if (!str(body.firstName, 200) || !email) return NextResponse.json({ ok: false, error: "First name and email are required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  if (form === "apply" && (!str(body.lastName, 100) || !str(body.bottleneck, 2000))) {
    return NextResponse.json({ ok: false, error: "Please complete the required fields." }, { status: 400 });
  }

  const parts = str(body.firstName, 200).split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "Anonymous";
  const lastName = str(body.lastName, 100) || parts.slice(1).join(" ");
  const phone = str(body.phone, 40);
  const company = str(body.company, 200);
  const attribution = parseAttribution(body.attribution, form === "apply" ? "work with jesse application" : "freedom project signup", SITE, pageUrl);

  const answers: [string, string][] =
    form === "apply"
      ? [
          ["Business", company],
          ["Annual revenue", str(body.revenue, 50)],
          ["Where the business depends on them most", str(body.bottleneck, 2000)],
          ["What more time and margin would give back", str(body.freedom, 2000)],
        ]
      : [];
  const title = form === "apply" ? "Work with Jesse application (jesserazo.com)" : "FREEDOM Project signup (jesserazo.com)";

  const cfg = ghlConfig();
  let contactId: string | null = null;
  let existed = false;
  if (cfg) {
    try {
      const payload: Record<string, unknown> & { email: string } = {
        firstName,
        lastName,
        email,
        source: form === "apply" ? "jesserazo.com Work with Jesse" : "jesserazo.com FREEDOM Project",
      };
      if (phone) payload.phone = phone;
      if (company) payload.companyName = company;
      ({ contactId, existed } = await upsertSafely(cfg, payload, form === "apply" ? APPLY_TAGS : FREEDOM_TAGS, attribution));
    } catch {
      console.warn(JSON.stringify({ event: "ghl_upsert_error", form }));
    }
    if (contactId) {
      const lines = answers.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
      await addNote(cfg, contactId, [title, ...lines, `Page: ${pageUrl}`, "", attributionNote(attribution, !existed)].join("\n"));
      if (form === "freedom") {
        const safe = firstName.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]!);
        await sendEmail(cfg, contactId, {
          subject: "You're on the list for the FREEDOM Project",
          html: `<p>Hi ${safe},</p><p>You're on the list. We'll keep you in the loop as the FREEDOM Project develops.</p><p>Jesse and the RazoRSharp team</p>`,
          emailFrom: "jrazo@razorsharpnetworks.com",
          emailFromName: "Jesse Razo · FREEDOM Project",
        }).catch(() => undefined);
      }
    }
  } else {
    console.warn(JSON.stringify({ event: "ghl_env_missing", form }));
  }

  const slackOk = await postSlack(
    leadText(title + (contactId ? "" : " (not saved in GHL)"), [
      ["Name", `${firstName} ${lastName}`.trim()],
      ["Email", email],
      ["Phone", phone],
      ...answers,
      ["Source", `${attribution.last.source} / ${attribution.last.medium}${attribution.last.campaign ? " / " + attribution.last.campaign : ""}`],
      ["GHL contact", contactId],
    ]),
  );

  if (!contactId && !slackOk) {
    console.error(JSON.stringify({ event: "lead_not_saved", form }));
    return NextResponse.json({ ok: false, error: "We could not save that. Please try again, or email jrazo@razorsharpnetworks.com." }, { status: 503 });
  }
  return NextResponse.json({ ok: true, saved: contactId ? "ghl" : "slack" });
}
