"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { track } from "@/lib/track";

// Premium "snap" easing. Animations only use transform and opacity (GPU friendly).
export const EASE = [0.16, 1, 0.3, 1] as const;

// Wraps the app: honours the visitor's "reduce motion" setting everywhere.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Section-level reveal as it enters the viewport.
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

// Staggered group: children wrapped in <RevealItem> spring in one after another.
export function RevealGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 36, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Hero headline: each line slides up. Text stays painted (opacity 1) so it never delays first paint.
export function HeadlineLines({ lines, className = "" }: { lines: { text: string; accent?: boolean }[]; className?: string }) {
  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
    >
      {lines.map((l) => (
        <span key={l.text} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${l.accent ? "text-purple" : ""}`}
            variants={{ hidden: { y: "60%" }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
          >
            {l.text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

// Magnetic wrapper for the primary CTA. Desktop pointers only; inert on touch and reduced motion.
export function Magnetic({ children, strength = 0.35, radius = 60 }: { children: ReactNode; strength?: number; radius?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const near = Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;
      x.set(near ? dx * strength : 0);
      y.set(near ? dy * strength : 0);
    };
    const reset = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", reset);
    };
  }, [reduce, radius, strength, x, y]);

  return (
    <motion.span ref={ref} style={{ x, y }} className="inline-block will-change-transform">
      {children}
    </motion.span>
  );
}

// One listener for the whole site: any element with data-track="event:label" reports a click.
// Also reports scroll depth at 50% and 90%.
export function EngagementTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const [event, label] = (el.dataset.track || "").split(":");
      if (event === "cta_click" || event === "path_click") track(event, { label: label || el.textContent?.trim() || "" });
    };
    const marks = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const m of [50, 90]) {
        if (pct >= m && !marks.has(m)) {
          marks.add(m);
          track("scroll_depth", { percent: m });
        }
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
  return null;
}
