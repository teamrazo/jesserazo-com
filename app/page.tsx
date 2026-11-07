import { Button, Container, Eyebrow, PhotoSlot, Section } from "@/components/ui";
import { NewsletterForm } from "@/components/Forms";
import { LINKS, PATHS, PILLARS, STATS, TIMEBACK } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ivory pb-16 pt-16 md:pb-24 md:pt-24">
        <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Faith. Family. Freedom. Legacy.</Eyebrow>
            <h1 className="text-4xl leading-[1.1] md:text-6xl">
              Faith first. Family always. <span className="text-purple">Freedom by design.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              I help faith-driven founders build businesses that serve their faith, their family and their future. Less
              operating. More architecting. A legacy that lasts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/work-with-jesse">Work with Jesse</Button>
              <Button href="/about" variant="ghost">Read my story</Button>
            </div>
          </div>
          <PhotoSlot label="Jesse headshot" className="aspect-[4/5] w-full" />
        </Container>
      </section>

      {/* Stat bar */}
      <section aria-label="Track record" className="border-y border-charcoal/10 bg-white">
        <Container className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl text-charcoal md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Pillars */}
      <Section>
        <div className="max-w-2xl">
          <Eyebrow>What I stand for</Eyebrow>
          <h2 className="text-3xl md:text-4xl">Four pillars. One life in order.</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div key={p.name} className="rounded-2xl border border-charcoal/10 bg-white p-6">
              <p className="font-serif text-sm text-gold">0{i + 1}</p>
              <h3 className="mt-2 text-2xl">{p.name}</h3>
              <p className="mt-3 font-medium text-charcoal">{p.line}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Story teaser */}
      <Section tone="sand">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <PhotoSlot label="Jesse at work" className="aspect-[4/3] w-full" />
          <div>
            <Eyebrow>My story</Eyebrow>
            <h2 className="text-3xl md:text-4xl">From Operator to Architect.</h2>
            <p className="mt-5 leading-relaxed text-muted">
              I spent years as the Operator. Every decision, every fire and every late night ran through me. The
              business grew, and it took more than it gave.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Faith reset my priorities. Systems gave me my time back. Now I build the business on purpose, and I help
              other founders do the same.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="ghost">Read the full story</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Paths */}
      <Section>
        <div className="max-w-2xl">
          <Eyebrow>How I help</Eyebrow>
          <h2 className="text-3xl md:text-4xl">Start where you are.</h2>
          <p className="mt-4 text-muted">The shortest distance to freedom is a straight line. Pick the step that fits today.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PATHS.map((p) => (
            <div key={p.name} className="flex flex-col rounded-2xl border border-charcoal/10 bg-white p-7">
              <p className="text-sm text-purple">{p.for}</p>
              <h3 className="mt-2 text-2xl">{p.name}</h3>
              <p className="mt-3 flex-1 text-muted">{p.body}</p>
              <div className="mt-6">
                <Button href={p.href} variant="ghost">{p.cta}</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TimeBACK */}
      <Section tone="dark">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">The system</p>
          <h2 className="text-3xl md:text-4xl">The TimeBACK System.</h2>
          <p className="mt-4">AI scales whatever you already have. Direction first, then speed. Here is the cycle.</p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {TIMEBACK.map((t, i) => (
            <li key={t.step} className="rounded-2xl border border-white/10 p-6">
              <p className="font-serif text-sm text-gold">Step {i + 1}</p>
              <h3 className="mt-2 text-2xl">{t.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button href={LINKS.timeback} variant="light">Start with a TimeBACK Audit</Button>
        </div>
      </Section>

      {/* Legacy teaser */}
      <Section tone="sand">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Legacy</Eyebrow>
            <h2 className="text-3xl md:text-4xl">Build what outlasts you.</h2>
            <p className="mt-5 leading-relaxed text-muted">
              Legacy is not what you leave behind. It is what you build into people while you are here. Ten percent of
              top-line revenue goes to the Legacy Fund, so every client helps build something bigger.
            </p>
            <div className="mt-8">
              <Button href="/legacy" variant="ghost">See the legacy vision</Button>
            </div>
          </div>
          <PhotoSlot label="Family moment" className="aspect-[4/3] w-full" />
        </div>
      </Section>

      {/* Newsletter */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Weekly</Eyebrow>
          <h2 className="text-3xl md:text-4xl">Clarity in your inbox.</h2>
          <p className="mt-4 text-muted">
            One short note a week on faith, family, freedom and building systems that give you time back.
          </p>
          <div className="mt-8 flex justify-center">
            <NewsletterForm />
          </div>
          <p className="mt-6 text-sm text-muted">
            Prefer video? Watch{" "}
            <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-purple hover:underline">
              The Freedom Project
            </a>
            .
          </p>
        </div>
      </Section>

      {/* Close */}
      <Section tone="dark" className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl">Ready to build on purpose?</h2>
        <p className="mx-auto mt-5 max-w-xl">Apply to work with me. If it is a fit, we will map your path from Operator to Architect.</p>
        <div className="mt-8 flex justify-center">
          <Button href="/work-with-jesse">Work with Jesse</Button>
        </div>
      </Section>
    </>
  );
}
