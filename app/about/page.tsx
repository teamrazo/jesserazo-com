import type { Metadata } from "next";
import { PERSON_ID, jsonLd, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { Button, Eyebrow, PageHero, PhotoSlot, Section } from "@/components/ui";
import { VALUES } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "My Story: Diver, Navy Veteran, Father, Founder",
  description:
    "Jesse Razo's story: commercial diver, U.S. Navy aircrewman on the P-3 Orion, single father of three, Christian first, and founder of RazoRSharp Networks. From Operator to Architect.",
  path: "/about",
});

// Story arc follows FIDA: what it felt like, who it made him, what he wants, what he did about it.
const CHAPTERS = [
  {
    eyebrow: "The deep end",
    photo: "about-dive.jpg",
    aspect: "aspect-[4/5]",
    title: "Systems keep you alive.",
    body: [
      "Right out of high school I moved to Seattle to train as a commercial diver at the Divers Institute of Technology. Cold water, heavy gear and no room for shortcuts.",
      "Dive school taught me the first rule I still build on. You do not rise to the occasion. You fall to the level of your training and your systems. Checklists, procedures and a team you trust are what bring everyone home.",
      "After graduating I worked in the diving industry before answering a different call.",
    ],
  },
  {
    eyebrow: "Service",
    photo: "about-navy.jpg",
    aspect: "aspect-[4/3]",
    title: "Mission first. Crew always.",
    body: [
      "I joined the U.S. Navy as an Aviation Warfare Systems Operator (AW), flying aboard the P-3 Orion out of NAS Jacksonville, Florida. The P-3 was the Navy's long-range submarine hunter and maritime patrol aircraft for more than half a century.",
      "Every flight ran on preparation, discipline and a crew that knew its role. Long missions taught me what a well-built system can do, and what happens when one person tries to carry it all.",
    ],
  },
  {
    eyebrow: "The Operator",
    photo: "about-operator.jpg",
    aspect: "aspect-[4/3]",
    title: "Everything ran through me.",
    body: [
      "After my discharge I started my entrepreneurial journey. MLMs, startups and side projects. I learned sales, marketing and how businesses really run, mostly by doing it the hard way.",
      "I also learned the cost of being the Operator. When every decision and every fire runs through you, the business grows and takes your time with it. Time with family. Margin. Peace.",
    ],
  },
  {
    eyebrow: "The turning point",
    photo: "about-turning-point.jpg",
    aspect: "aspect-[4/3]",
    title: "Order before speed.",
    body: [
      "As a single father of three girls, I could not afford a business that stole my time. I had to get honest about what came first.",
      "I am a Christian first. Then a father. Then a business owner. Once that order was right, the work changed. I stopped asking how to do more and started asking what should not need me at all.",
    ],
  },
  {
    eyebrow: "The Architect",
    photo: "about-architect.jpg",
    aspect: "aspect-[4/3]",
    title: "Building on purpose.",
    body: [
      "Today I run RazoRSharp Networks. I design systems instead of carrying them. AI and automation handle the repeatable work, so people can do the meaningful work.",
      "I wake up every day looking for ways to build a lifestyle business: one that creates freedom instead of stealing time. That is what I help other founders build too.",
    ],
  },
];

const WHAT_MATTERS = [
  { name: "Faith", body: "Christ first, in life and in business." },
  { name: "Family", body: "Being a strong, present father to my girls." },
  { name: "Health", body: "Energy and discipline to lead for the long haul." },
  { name: "Wealth and business", body: "A company that runs on systems and builds real value." },
  { name: "Freedom", body: "Time and margin to spend on what matters most." },
];

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({ "@type": "ProfilePage", url: `${SITE.url}/about`, mainEntity: { "@id": PERSON_ID } })}
      />
      <PageHero
        eyebrow="My story"
        photo="about-hero.jpg"
        title="From Operator"
        accent="to Architect."
        body="Commercial diver. Navy veteran. Single father of three girls. Christian first. I build businesses that create freedom instead of stealing time, and I help faith-driven founders do the same."
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
            <PhotoSlot label={c.eyebrow} photo={c.photo} className={`${c.aspect} w-full`} />
          </div>
        </Section>
      ))}

      <Section tone="dark">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-purple">Faith</p>
          <h2 className="text-5xl md:text-7xl">The foundation under everything.</h2>
          <p className="mt-6 text-lg leading-relaxed">
            I am a Christian first, and I run a Christ-centered business. I believe God gave us our time, our families and
            our gifts to steward well. Build with integrity. Serve people first. Leave things better than I found them.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Family</Eyebrow>
            <h2 className="text-5xl md:text-7xl">The reason I build.</h2>
            <p className="mt-4 leading-relaxed text-muted">
              I am the proud father of three beautiful girls, and I have raised them as a single dad. They are the measure of
              whether the business is working. If it costs them, it is not success.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PhotoSlot label="Family" photo="family-1.jpg" className="aspect-square" />
            <PhotoSlot label="Family" photo="family-2.jpg" className="aspect-square" />
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <Eyebrow className="text-white/60">What I build for</Eyebrow>
        <h2 className="text-5xl md:text-7xl">
          Freedom for
          <br />
          <span className="text-purple">what matters most.</span>
        </h2>
        <ol className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {WHAT_MATTERS.map((w, i) => (
            <li key={w.name} className="bg-charcoal p-6">
              <p className="text-xs font-semibold text-purple">0{i + 1}</p>
              <h3 className="mt-3 text-xl">{w.name}</h3>
              <p className="mt-2 text-sm text-white/65">{w.body}</p>
            </li>
          ))}
        </ol>
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
