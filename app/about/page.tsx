import type { Metadata } from "next";
import { Button, Eyebrow, PageHero, PhotoSlot, Section } from "@/components/ui";
import { VALUES } from "@/lib/site";

export const metadata: Metadata = {
  title: "My Story",
  description: "How Jesse Razo went from Operator to Architect, and why faith and family come first.",
  alternates: { canonical: "/about" },
};

// DRAFT copy. Replace with Jesse's story beats (low point, turning point, what changed, today).
const CHAPTERS = [
  {
    eyebrow: "The Operator",
    photo: "about-operator.jpg",
    title: "Everything ran through me.",
    body: [
      "Like most founders, I built the business by doing everything myself. Sales, delivery, systems and every fire in between.",
      "It worked, until it did not. The business grew, and so did the cost. Time with family. Margin. Peace.",
    ],
  },
  {
    eyebrow: "The turning point",
    photo: "about-turning-point.jpg",
    title: "Order before speed.",
    body: [
      "I had to get honest about what came first. Faith. Then family. Then the business that is meant to serve them both.",
      "Once the order was right, the work changed. I stopped asking how to do more and started asking what should not need me at all.",
    ],
  },
  {
    eyebrow: "The Architect",
    photo: "about-architect.jpg",
    title: "Building on purpose.",
    body: [
      "Today I design systems instead of carrying them. AI and automation handle the repeatable work, so people can do the meaningful work.",
      "That is what I help other founders do now. Clear direction, the right systems and time back for what matters most.",
    ],
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="My story"
        photo="about-hero.jpg"
        title="From Operator"
        accent="to Architect."
        body="I am Jesse Razo, founder of RazoRSharp Networks. I help faith-driven founders get their time back and build businesses that serve what matters most."
      />

      {CHAPTERS.map((c, i) => (
        <Section key={c.title} tone={i % 2 ? "sand" : "light"}>
          <div className={`grid items-center gap-12 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <h2 className="text-5xl md:text-7xl">{c.title}</h2>
              {c.body.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted">{p}</p>
              ))}
            </div>
            <PhotoSlot label={c.eyebrow} photo={c.photo} className="aspect-[4/3] w-full" />
          </div>
        </Section>
      ))}

      <Section tone="dark">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-purple">Faith</p>
          <h2 className="text-5xl md:text-7xl">The foundation under everything.</h2>
          {/* DRAFT: replace with Jesse's faith statement in his own words. */}
          <p className="mt-6 text-lg leading-relaxed">
            I believe God gave us our time, our families and our gifts to steward well. My work is one way I try to honor
            that. Build with integrity. Serve people first. Leave things better than I found them.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Family</Eyebrow>
            <h2 className="text-5xl md:text-7xl">The reason I build.</h2>
            <p className="mt-4 leading-relaxed text-muted">
              My family is the measure of whether the business is working. If it costs them, it is not success.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PhotoSlot label="Family" photo="family-1.jpg" className="aspect-square" />
            <PhotoSlot label="Family" photo="family-2.jpg" className="aspect-square" />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <Eyebrow>Core values</Eyebrow>
        <h2 className="text-5xl md:text-7xl">How we work.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((v) => (
            <div key={v.name} className="bg-white p-5">
              <h3 className="text-lg">{v.name}</h3>
              <p className="mt-2 text-sm text-muted">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="text-5xl md:text-7xl">Your turn.</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">If you are ready to step out of the Operator seat, let us talk.</p>
        <div className="mt-8">
          <Button href="/work-with-jesse">Work with Jesse</Button>
        </div>
      </Section>
    </>
  );
}
