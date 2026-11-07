import type { Metadata } from "next";
import { Button, Container, Eyebrow, PhotoSlot, Section } from "@/components/ui";
import { LINKS, PILLARS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legacy",
  description: "Jesse Razo's vision for legacy: faith, family, freedom and the Legacy Fund.",
  alternates: { canonical: "/legacy" },
};

export default function Legacy() {
  return (
    <>
      <section className="bg-charcoal pb-20 pt-16 text-white/80 md:pb-28 md:pt-24">
        <Container className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Legacy</p>
          <h1 className="text-4xl leading-tight text-white md:text-6xl">Build what outlasts you.</h1>
          {/* DRAFT: replace with Jesse's legacy vision in his own words. */}
          <p className="mt-6 text-lg leading-relaxed">
            Legacy is not a number in an account. It is the faith you pass on, the family you show up for and the people
            who are better because you were here. The business is just the vehicle.
          </p>
        </Container>
      </section>

      <Section>
        <Eyebrow>One picture</Eyebrow>
        <h2 className="max-w-2xl text-3xl md:text-4xl">Faith, family and freedom add up to legacy.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div
              key={p.name}
              className={`rounded-2xl p-6 ${i === 3 ? "bg-charcoal text-white/80 [&_h3]:text-white" : "border border-charcoal/10 bg-white"}`}
            >
              <h3 className="text-2xl">{p.name}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${i === 3 ? "" : "text-muted"}`}>{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>The Legacy Fund</Eyebrow>
            <h2 className="text-3xl md:text-4xl">Ten percent, given forward.</h2>
            <p className="mt-5 leading-relaxed text-muted">
              RazoRSharp Networks commits 10% of top-line revenue to the Legacy Fund. Clients can opt in at checkout, so
              every project helps build something bigger than one business.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              The fund supports technology that makes better use of natural resources and builds a more sustainable
              future. One dollar, one idea, one step at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={LINKS.legacyFund}>Join Legacy</Button>
              <Button href="/work-with-jesse" variant="ghost">Work with Jesse</Button>
            </div>
          </div>
          <PhotoSlot label="Legacy" className="aspect-[4/3] w-full" />
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">What will you build that lasts?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          It starts with getting your time back. Then you can spend it on what matters.
        </p>
        <div className="mt-8">
          <Button href="/work-with-jesse">Work with Jesse</Button>
        </div>
      </Section>
    </>
  );
}
