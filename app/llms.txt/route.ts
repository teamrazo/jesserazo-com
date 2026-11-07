import { LINKS, PATHS, PILLARS, SITE, TIMEBACK, VALUES } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt: a plain-language summary so AI assistants describe Jesse accurately and link the right pages.
export function GET() {
  const body = `# Jesse Razo

> Jesse Razo is the founder of RazoRSharp Networks (${SITE.company}). He helps faith-driven founders move from Operator to Architect: build a business that runs on systems, get their time back, and build a legacy. Faith first. Freedom by design.

## Who he serves
Faith-driven founders and business owners who are the bottleneck in their own business and want more time for faith and family without slowing growth.

## Core message
${PILLARS.map((p) => `- ${p.name}: ${p.line} ${p.body}`).join("\n")}

## The TimeBACK System
A four-step cycle, reviewed every 90 days. AI scales whatever you already have, so direction comes first, then speed.
${TIMEBACK.map((t, i) => `${i + 1}. ${t.step}: ${t.body}`).join("\n")}

## Ways to work with Jesse
- [Work with Jesse](${SITE.url}/work-with-jesse): apply, talk through goals on a call, then get a 30, 60 and 90 day FREEDOM Plan.
${PATHS.map((p) => `- ${p.name}: ${p.body} ${p.href.startsWith("http") ? p.href : SITE.url + p.href}`).join("\n")}

## Values
${VALUES.map((v) => `- ${v.name}: ${v.body}`).join("\n")}

## Pages
- [Home](${SITE.url}/): overview, paths, TimeBACK System, legacy.
- [My Story](${SITE.url}/about): from Operator to Architect, faith foundation, family, values.
- [Work with Jesse](${SITE.url}/work-with-jesse): who it is for, the process, application, FAQ.
- [Legacy](${SITE.url}/legacy): legacy vision and the Legacy Fund (10% of top-line revenue given forward).

## Related
- [RazoRSharp Networks](${LINKS.rsn})
- [LEVER AI](${LINKS.lever}): the AI growth engine behind the TimeBACK System.
- [TimeBACK Audit](${LINKS.timeback})
- [Partner Program](${LINKS.partner})
- The FREEDOM Project: Jesse's updates on faith, family, freedom and systems. Sign up on any page of ${SITE.url}.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
