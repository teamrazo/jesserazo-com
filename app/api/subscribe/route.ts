import { NextResponse } from "next/server";
import { EMAIL_RE, attributionNote, clean, envTags, ghlConfigured, upsertWithNote } from "@/lib/ghl";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (clean(data.website)) return NextResponse.json({ ok: true }); // honeypot

  const email = clean(data.email, 200).toLowerCase();
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });

  const note = [`Newsletter signup (jesserazo.com)`, `Page: ${clean(data.page, 500)}`, "", attributionNote(data.attribution as never)].join("\n");

  if (!ghlConfigured()) {
    console.warn("GHL not configured; signup logged only", { email });
    return NextResponse.json({ ok: true, mode: "no-ghl" });
  }

  try {
    await upsertWithNote({ email, tags: envTags("GHL_SUBSCRIBE_TAGS"), source: "jesserazo.com - newsletter" }, note);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Please try again." }, { status: 502 });
  }
}
