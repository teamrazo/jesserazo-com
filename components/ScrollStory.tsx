"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { EASE } from "./Motion";
import { track } from "@/lib/track";

export type Chapter = { eyebrow: string; title: string; body: string; photo: string; alt: string };

// Pinned "Operator to Architect" sequence. Desktop: the section pins and each scroll step
// swaps the chapter and its photo with a clip-path reveal. Mobile: a simple stacked list.
export function ScrollStory({ chapters, ctaHref }: { chapters: Chapter[]; ctaHref: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(chapters.length - 1, Math.floor(v * chapters.length));
    if (i !== active) setActive(i);
    if (v > 0.95 && !done) {
      setDone(true);
      track("story_complete", { section: "operator_to_architect" });
    }
  });

  const c = chapters[active];

  return (
    <>
      {/* Desktop: pinned */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${chapters.length * 90 + 40}vh` }}>
        <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-20 px-10">
            <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden bg-[#dfe4ea]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={c.photo}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <Image src={`/photos/${c.photo}`} alt={c.alt} fill sizes="50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">My story</p>
              <h2 className="text-7xl lg:text-8xl">
                From Operator
                <br />
                to Architect.
              </h2>

              <div className="mt-10 flex gap-2" aria-hidden="true">
                {chapters.map((ch, i) => (
                  <span key={ch.title} className="h-1 flex-1 overflow-hidden bg-charcoal/10">
                    <motion.span
                      className="block h-full bg-purple"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </span>
                ))}
              </div>

              <div className="relative mt-8 min-h-[13rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <p className="text-xs font-semibold text-purple">
                      0{active + 1} &middot; {c.eyebrow}
                    </p>
                    <h3 className="mt-3 text-3xl">{c.title}</h3>
                    <p className="mt-4 max-w-lg leading-relaxed text-muted">{c.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={ctaHref}
                  data-track="cta_click:story"
                  className="inline-flex items-center justify-center rounded-full bg-purple px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-deep"
                >
                  Read my story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="px-6 py-20 md:hidden">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">My story</p>
        <h2 className="text-6xl">
          From Operator
          <br />
          to Architect.
        </h2>
        <ol className="mt-10 space-y-12">
          {chapters.map((ch, i) => (
            <li key={ch.title}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={`/photos/${ch.photo}`} alt={ch.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <p className="mt-5 text-xs font-semibold text-purple">
                0{i + 1} &middot; {ch.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl">{ch.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{ch.body}</p>
            </li>
          ))}
        </ol>
        <Link
          href={ctaHref}
          data-track="cta_click:story"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-purple px-7 py-3 text-sm font-semibold text-white"
        >
          Read my story
        </Link>
      </div>
    </>
  );
}

// TimeBACK stepper: steps light up in order as the section scrolls past (no pinning).
export function TimeBackStepper({ steps }: { steps: { step: string; body: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Steps stay lit once reached, so scrolling back up never "un-learns" the system.
    const i = Math.min(steps.length - 1, Math.floor(v * steps.length) - (v === 0 ? 1 : 0));
    if (i > active) setActive(i);
    if (v >= 1 && !done) {
      setDone(true);
      track("timeback_complete");
    }
  });

  return (
    <div className="mt-14">
      <div className="h-1 w-full bg-charcoal/10" aria-hidden="true">
        <motion.div className="h-full bg-purple" style={{ scaleX: scrollYProgress, originX: 0 }} />
      </div>
      <ol ref={ref} className="grid gap-px bg-charcoal/10 md:grid-cols-4">
        {steps.map((t, i) => {
          const on = i <= active;
          return (
            <motion.li
              key={t.step}
              className="bg-ivory p-8"
              animate={{ opacity: on ? 1 : 0.35, y: on ? 0 : 8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="text-xs font-semibold text-purple">0{i + 1}</p>
              <h3 className="mt-3 text-2xl">{t.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.body}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
