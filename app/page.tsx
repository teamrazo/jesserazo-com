import { Button, Container, Eyebrow, PhotoSlot, Section } from "@/components/ui";
import { LINKS, PATHS, STATS, TIMEBACK } from "@/lib/site";

export default function Home() {
  const [challenge, audit, lever, partner] = PATHS;

  return (
    <>
      {/* Hero: full dark, photo right, stat bar inline */}
      <section className="relative overflow-hidden bg-charcoal">
        <PhotoSlot label="Jesse hero portrait" dark className="absolute inset-y-0 right-0 hidden w-1/2 items-start pt-24 md:flex" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent md:block" aria-hidden="true" />
        <Container className="relative pb-12 pt-24 md:pt-40">
          <Eyebrow className="text-white/70">Founder. Builder. Faith-driven.</Eyebrow>
          <h1 className="max-w-4xl text-6xl text-white md:text-8xl lg:text-[7.5rem]">
            Faith first.
            <br />
            <span className="text-purple">Freedom by design.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
            Build a business that serves your faith, your family and your future. Stop operating. Start architecting.
          </p>
          <div className="mt-10">
            <Button href="/work-with-jesse">Work with Jesse</Button>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="font-display text-4xl text-white md:text-5xl">{s.value}</span>
                <span className="max-w-[9rem] text-xs leading-snug text-white/60">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Audience + bento grid of paths */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>For faith-driven founders</Eyebrow>
            <h2 className="text-5xl md:text-7xl">
              You were built
              <br />
              for more than the grind.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted md:justify-self-end">
            Build a business that runs without you. Get your time back for the people who matter most. Then build
            something that lasts.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <BentoCard path={challenge} tone="light" className="md:col-span-2" title="Put first things first." />
          <BentoCard path={audit} tone="dark" title="Find your time leaks." />
          <BentoCard path={lever} tone="dark" title="Run on systems." />
          <BentoCard path={partner} tone="dark" className="md:col-span-2" title="Earn, learn and grow." />
        </div>
      </Section>

      {/* Story */}
      <Section tone="sand">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <PhotoSlot label="Jesse at work" className="aspect-[4/5] w-full" />
          <div>
            <Eyebrow>My story</Eyebrow>
            <h2 className="text-6xl md:text-8xl">
              From Operator
              <br />
              to Architect.
            </h2>
            <p className="mt-8 leading-relaxed text-muted">
              I spent years as the Operator. Every decision, every fire and every late night ran through me. The
              business grew, and it took more than it gave.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              <strong className="text-charcoal">Order changed everything.</strong> Faith first. Family second. Then a
              business built on systems instead of on me.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Now I help faith-driven founders do the same. Clear direction, the right systems and{" "}
              <strong className="text-charcoal">time back for what matters most.</strong>
            </p>
            <div className="mt-10">
              <Button href="/about">Read my story</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* TimeBACK System */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>The system</Eyebrow>
            <h2 className="text-5xl md:text-7xl">
              The TimeBACK
              <br />
              <span className="text-purple">System.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted md:justify-self-end">
            AI scales whatever you already have. Direction comes first, then speed. Four steps, reviewed every 90 days.
          </p>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden bg-charcoal/10 md:grid-cols-4">
          {TIMEBACK.map((t, i) => (
            <li key={t.step} className="bg-ivory p-8">
              <p className="text-xs font-semibold text-purple">0{i + 1}</p>
              <h3 className="mt-3 text-2xl">{t.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button href={LINKS.timeback} variant="ghost">Start with a TimeBACK Audit</Button>
        </div>
      </Section>

      {/* Legacy */}
      <Section tone="dark">
        <Eyebrow className="text-white/60">Legacy</Eyebrow>
        <h2 className="text-5xl md:text-8xl">
          Build what
          <br />
          <span className="text-purple">outlasts you.</span>
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <PhotoSlot label="Family moment" dark className="aspect-[4/5] w-full" />
          <div>
            <p className="text-lg leading-relaxed">
              Legacy is not what you leave behind. It is what you build into people while you are here.
            </p>
            <ol className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {[
                ["Faith and family first.", "The business serves them. Never the other way around."],
                ["The Legacy Fund.", "10% of top-line revenue given to causes that serve people and the planet."],
                ["One step at a time.", "One dollar, one idea, one founder set free at a time."],
              ].map(([t, b], i) => (
                <li key={t} className="grid grid-cols-[3rem_1fr] py-6">
                  <span className="text-xs text-purple">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl">{t}</h3>
                    <p className="mt-2 text-sm text-white/65">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/legacy">The legacy vision</Button>
              <Button href={LINKS.legacyFund} variant="light">Join Legacy</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function BentoCard({
  path,
  tone,
  title,
  className = "",
}: {
  path: (typeof PATHS)[number];
  tone: "light" | "dark";
  title: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex min-h-[22rem] flex-col justify-between p-8 md:p-10 ${
        dark ? "bg-charcoal text-white/70" : "bg-sand text-muted"
      } ${className}`}
    >
      <p className={`text-2xl font-semibold ${dark ? "text-white" : "text-charcoal"}`}>{path.name}</p>
      <div>
        <p className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-muted"}`}>
          {path.for}
        </p>
        <h3 className={`text-3xl ${dark ? "text-white" : ""}`}>{title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed">{path.body}</p>
        <div className="mt-7">
          <Button href={path.href} variant={dark ? "light" : "primary"}>
            {path.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
