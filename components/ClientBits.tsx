"use client";

import { useEffect, useState } from "react";

// First-touch and last-touch attribution, matching the RSN standard for every form.
const FIRST = "jr_first_touch";
const LAST = "jr_last_touch";

type Touch = { url: string; referrer: string; utm: Record<string, string>; at: string };

function currentTouch(): Touch {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  params.forEach((v, k) => {
    if (k.startsWith("utm_") || k === "ref" || k === "gclid" || k === "fbclid") utm[k] = v;
  });
  return { url: window.location.href, referrer: document.referrer, utm, at: new Date().toISOString() };
}

export function readAttribution(): { first: Touch | null; last: Touch | null } {
  try {
    return {
      first: JSON.parse(localStorage.getItem(FIRST) || "null"),
      last: JSON.parse(localStorage.getItem(LAST) || "null"),
    };
  } catch {
    return { first: null, last: null };
  }
}

export function Attribution() {
  useEffect(() => {
    try {
      const t = currentTouch();
      const external = t.referrer && !t.referrer.includes(window.location.host);
      if (!localStorage.getItem(FIRST)) localStorage.setItem(FIRST, JSON.stringify(t));
      if (external || Object.keys(t.utm).length || !localStorage.getItem(LAST)) {
        localStorage.setItem(LAST, JSON.stringify(t));
      }
    } catch {
      /* storage unavailable: forms still submit without attribution */
    }
  }, []);
  return null;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-purple text-white shadow-lg transition-opacity hover:bg-purple-deep ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
