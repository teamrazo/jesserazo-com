import { Button, Container, Eyebrow, PhotoSlot, Section } from "@/components/ui";
import { HeadlineLines, RevealGroup, RevealItem } from "@/components/Motion";
import { ScrollStory, TimeBackStepper, type Chapter } from "@/components/ScrollStory";
import { LINKS, PATHS, STATS, TIMEBACK } from "@/lib/site";

export default function Home() {
  const [challenge, audit, lever, partner] = PATHS;

  return (
    <>
      {/* Hero: pure black so the portrait's black background blends in. Portrait runs top to bottom. */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-y-0 right-0 hidden w-[56%] md:block lg:w-[54%]">
          <PhotoSlot
            label="Jesse Razo"
            photo="hero-portrait.jpg"
            fit="contain"
            position="right-bottom"
            priority
            sizes="(min-width: 768px) 56vw, 1px"
            dark
            className="h-full w-full bg-black"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent" aria-hidden="true" />
        </div>
        <Container className="relative flex items-center pb-12 pt-16 md:min-h-[calc(100svh-4rem)] md:max-h-[60rem] md:py-24">
          <div className="w-full md:max-w-[48%]">
            <Eyebrow className="text-white/70">Founder. Builder. Faith-driven.</Eyebrow>
            <HeadlineLines
              className="text-6xl text-white md:text-7xl lg:text-[6.5rem]"
              lines={[{ text: "Faith first." }, { text: "Freedom by design.", accent: true }]}
            />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
              Build a business that serves your faith, your family and your future. Stop operating. Start architecting.
            </p>
            <div className="mt-10">
              <Button href="/work-with-jesse" track="hero">Work with Jesse</Button>
            </div>
          </div>
        </Container>
        <PhotoSlot label="Jesse Razo" photo="hero-portrait.jpg" priority sizes="(min-width: 768px) 1px, 100vw" dark className="aspect-square w-full bg-black md:hidden" />
      </section>

      {/* Track record */}
      <section aria-label="Track record" className="border-t border-white/10 bg-black">
        <Container className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {STATS.map((st) => (
            <div key={st.label} className="flex items-center gap-3">
              <span className="font-display text-4xl text-white md:text-5xl">{st.value}</span>
              <span className="max-w-[9rem] text-xs leading-snug text-white/60">{st.label}</span>
            </div>
          ))}
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

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          <RevealItem className="md:col-span-2"><BentoCard path={challenge} tone="light" title="Get close. Stay close." /></RevealItem>
          <RevealItem><BentoCard path={audit} tone="dark" title="Find your time leaks." /></RevealItem>
          <RevealItem><BentoCard path={lever} tone="dark" title="Run on systems." /></RevealItem>
          <RevealItem className="md:col-span-2"><BentoCard path={partner} tone="dark" title="Earn, learn and grow." /></RevealItem>
        </RevealGroup>
      </Section>

      {/* Story: pinned scroll sequence on desktop, stacked on mobile */}
      <section className="bg-sand">
        <ScrollStory chapters={STORY} ctaHref="/about" />
      </section>

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
        <TimeBackStepper steps={TIMEBACK} />
        <div className="mt-10">
          <Button href={LINKS.timeback} variant="ghost" track="timeback_section">Start with a TimeBACK Audit</Button>
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
          <PhotoSlot label="Family moment" photo="legacy.jpg" dark className="aspect-[4/5] w-full" />
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
              <Button href="/legacy" track="legacy_section">The legacy vision</Button>
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
}: {
  path: (typeof PATHS)[number];
  tone: "light" | "dark";
  title: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`flex h-full min-h-[22rem] flex-col justify-between p-8 md:p-10 ${
        dark ? "bg-charcoal text-white/70" : "bg-sand text-muted"
      }`}
    >
      <p className={`text-2xl font-semibold ${dark ? "text-white" : "text-charcoal"}`}>{path.name}</p>
      <div>
        <p className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-muted"}`}>
          {path.for}
        </p>
        <h3 className={`text-3xl ${dark ? "text-white" : ""}`}>{title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed">{path.body}</p>
        <div className="mt-7">
          <Button href={path.href} variant={dark ? "light" : "primary"} track={`path - ${path.name}`}>
            {path.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}

const STORY: Chapter[] = [
  {
    eyebrow: "The Operator",
    title: "Everything ran through me.",
    body: "Commercial diver. Navy aircrewman. Then entrepreneur. I ran on discipline and effort, and every decision and every fire ran through me. The business grew, and it took more than it gave.",
    photo: "story-operator.jpg",
    alt: "Jesse on the road between meetings",
  },
  {
    eyebrow: "The turning point",
    title: "Order changed everything.",
    body: "As a single father of three girls, I needed a business that gave time back. Christ first. Family second. Then a business built on systems instead of on me.",
    photo: "story.jpg",
    alt: "Jesse climbing a granite boulder",
  },
  {
    eyebrow: "The Architect",
    title: "Building on purpose.",
    body: "Now I help faith-driven founders do the same. Clear direction, the right systems and time back for what matters most.",
    photo: "about-architect.jpg",
    alt: "Jesse on a summit overlooking the valley",
  },
];
