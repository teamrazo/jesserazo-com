import type { Metadata } from "next";
import { Button, Eyebrow, PageHero, Section } from "@/components/ui";
import { ApplicationForm } from "@/components/Forms";
import { PATHS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work with Jesse",
  description: "Apply to work with Jesse Razo. For faith-driven founders ready to move from Operator to Architect.",
  alternates: { canonical: "/work-with-jesse" },
};

const FOR = [
  "You lead with faith and want your business to reflect it.",
  "The business depends on you more than it should.",
  "You want more time with family without slowing growth.",
  "You are ready to act on a clear plan.",
];

const NOT_FOR = [
  "You want a quick hack instead of a system.",
  "You are not willing to change how you work.",
  "You want someone to do it all with no involvement from you.",
];

const STEPS = [
  { name: "Apply", body: "Tell us where you are and where you want to go. It takes about five minutes." },
  { name: "Call", body: "We talk through your goals and see if there is a fit. No pressure." },
  { name: "FREEDOM Plan", body: "If it is a fit, we map your 30, 60 and 90 day path and get to work." },
];

const FAQ = [
  {
    q: "Who is this for?",
    a: "Founders and owners who want business freedom without sacrificing faith or family, and who are ready to build systems.",
  },
  {
    q: "What happens after I apply?",
    a: "Our team reviews every application. If it looks like a fit, you will book a call to talk through next steps.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. We handle the systems and the AI. You bring the vision and the decisions.",
  },
  {
    q: "What if I am not ready to apply?",
    a: "Start with the Proximity Challenge or a TimeBACK Audit. Both are linked below.",
  },
];

export default function WorkWithJesse() {
  const calendarUrl = process.env.NEXT_PUBLIC_APPLY_CALENDAR_URL || undefined;
  return (
    <>
      <PageHero
        eyebrow="Work with Jesse"
        title="Build the business"
        accent="on purpose."
        body="I work with a small number of faith-driven founders at a time. If you are ready to stop operating and start architecting, apply below."
      >
        <Button href="#apply">Apply now</Button>
      </PageHero>

      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8">
            <h2 className="text-2xl">This is for you if</h2>
            <ul className="mt-5 space-y-3">
              {FOR.map((f) => (
                <li key={f} className="flex gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-charcoal/10 p-8">
            <h2 className="text-2xl">This is not for you if</h2>
            <ul className="mt-5 space-y-3">
              {NOT_FOR.map((f) => (
                <li key={f} className="flex gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charcoal/30" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>The process</Eyebrow>
        <h2 className="text-5xl md:text-7xl">Three simple steps.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.name} className="rounded-2xl border border-charcoal/10 bg-white p-7">
              <p className="text-xs font-semibold text-purple">Step {i + 1}</p>
              <h3 className="mt-2 text-2xl">{s.name}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="apply" tone="sand">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Application</Eyebrow>
          <h2 className="text-5xl md:text-7xl">Tell me about your business.</h2>
          <p className="mb-8 mt-4 text-muted">Honest answers help us make the most of your call.</p>
          <ApplicationForm calendarUrl={calendarUrl} />
        </div>
      </Section>

      <Section>
        <Eyebrow>Not ready yet?</Eyebrow>
        <h2 className="text-5xl md:text-7xl">Other ways to start.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PATHS.filter((p) => p.name !== "Partner Program").map((p) => (
            <div key={p.name} className="flex flex-col border border-charcoal/10 bg-white p-6">
              <h3 className="text-xl">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{p.body}</p>
              <div className="mt-5">
                <Button href={p.href} variant="ghost">{p.cta}</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-5xl md:text-7xl">Questions.</h2>
          <div className="mt-8 divide-y divide-charcoal/10 bg-white">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-charcoal">
                  {f.q}
                  <span className="text-purple transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
