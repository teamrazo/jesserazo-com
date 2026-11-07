import { NextResponse } from "next/server";
import { guardedJson } from "@/lib/guard";
import { EMAIL_RE, attributionNote, clean, envTags, ghlConfigured, upsertWithNote } from "@/lib/ghl";

export async function POST(req: Request) {
  const parsed = await guardedJson(req);
  if (parsed instanceof NextResponse) return parsed;
  const data = parsed;

  if (clean(data.website)) return NextResponse.json({ ok: true }); // honeypot

  const email = clean(data.email, 200).toLowerCase();
  const firstName = clean(data.firstName, 100);
  const lastName = clean(data.lastName, 100);
  if (!EMAIL_RE.test(email) || !firstName || !lastName) {
    return NextResponse.json({ error: "Please add your name and a valid email." }, { status: 400 });
  }

  const note = [
    "Work with Jesse application (jesserazo.com)",
    `Business: ${clean(data.company, 200) || "n/a"}`,
    `Revenue: ${clean(data.revenue, 50) || "n/a"}`,
    `Depends on owner most: ${clean(data.bottleneck)}`,
    `What freedom gives back: ${clean(data.freedom) || "n/a"}`,
    `Page: ${clean(data.page, 500)}`,
    "",
    attributionNote(data.attribution as never),
  ].join("\n");

  if (!ghlConfigured()) {
    console.warn("GHL not configured; application logged only", { email });
    console.log(note);
    return NextResponse.json({ ok: true, mode: "no-ghl" });
  }

  try {
    await upsertWithNote(
      {
        firstName,
        lastName,
        email,
        phone: clean(data.phone, 40) || undefined,
        companyName: clean(data.company, 200) || undefined,
        tags: envTags("GHL_APPLY_TAGS"),
        source: "jesserazo.com - work with jesse",
      },
      note,
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "We could not save that. Please try again." }, { status: 502 });
  }
}
