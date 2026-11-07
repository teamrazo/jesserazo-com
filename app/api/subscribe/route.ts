import { NextResponse } from "next/server";
import { guardedJson } from "@/lib/guard";
import { EMAIL_RE, attributionNote, clean, ghlConfigured, sendEmail, upsertWithNote } from "@/lib/ghl";

// Same list and tags as the gitlever.ai "FREEDOM Project" pop-up (gitlever-home/api/lever-waitlist.js).
const TAGS = ["action - email - subscribe", "action - lever ai project update - subscribed"];

export async function POST(req: Request) {
  const parsed = await guardedJson(req);
  if (parsed instanceof NextResponse) return parsed;
  const data = parsed;

  if (clean(data.website)) return NextResponse.json({ ok: true }); // honeypot

  const email = clean(data.email, 250).toLowerCase();
  const nameInput = clean(data.firstName, 200);
  if (!nameInput || !email) return NextResponse.json({ error: "First name and email are required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });

  const [firstName, ...rest] = nameInput.split(/\s+/);
  const note = ["FREEDOM Project signup (jesserazo.com)", `Page: ${clean(data.page, 500)}`, "", attributionNote(data.attribution as never)].join("\n");

  if (!ghlConfigured()) {
    console.warn("GHL not configured; signup logged only", { email });
    return NextResponse.json({ ok: true, mode: "no-ghl" });
  }

  try {
    const id = await upsertWithNote(
      { firstName, lastName: rest.join(" ") || undefined, email, tags: TAGS, source: "jesserazo.com - FREEDOM Project" },
      note,
    );
    if (id) {
      const safe = firstName.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
      await sendEmail(id, {
        subject: "You're on the list: FREEDOM Project",
        html: `<p>Hi ${safe},</p><p>You're on the list. We'll keep you in the loop as the FREEDOM Project develops.</p><p>Jesse &amp; the RazoRSharp team</p>`,
        emailFrom: "jrazo@razorsharpnetworks.com",
        emailFromName: "Jesse Razo · FREEDOM Project",
      }).catch((e) => console.error("confirmation email failed", e));
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Please try again." }, { status: 502 });
  }
}
