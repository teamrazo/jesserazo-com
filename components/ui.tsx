import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { HeadlineLines, Magnetic, Reveal } from "./Motion";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>;
}

export function Section({
  children,
  id,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "light" | "sand" | "dark";
  className?: string;
}) {
  const tones = {
    light: "bg-ivory",
    sand: "bg-sand",
    dark: "bg-charcoal text-white/75 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white",
  };
  return (
    <section id={id} className={`py-20 md:py-28 ${tones[tone]} ${className}`}>
      <Container>
        <Reveal>{children}</Reveal>
      </Container>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted ${className}`}>{children}</p>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  track,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  /** Engagement label, e.g. "hero". Primary buttons always report cta_click. */
  track?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors";
  const styles = {
    primary: "bg-purple text-white hover:bg-purple-deep",
    ghost: "border border-charcoal/25 text-charcoal hover:border-purple hover:text-purple",
    light: "border border-white/40 text-white hover:border-gold hover:text-gold",
  };
  const cls = `${base} ${styles[variant]}`;
  const dataTrack = track || variant === "primary" ? `cta_click:${track || String(children)}` : undefined;
  const el = href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-track={dataTrack}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls} data-track={dataTrack}>
      {children}
    </Link>
  );
  return variant === "primary" ? <Magnetic>{el}</Magnetic> : el;
}

// Shows /public/photos/<photo> when the file exists; otherwise a labelled placeholder.
// To add a photo: drop the file into public/photos with the name listed in README.
export function PhotoSlot({
  label,
  photo,
  className = "",
  dark = false,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  fit = "cover",
  position = "center",
}: {
  label: string;
  photo?: string;
  className?: string;
  dark?: boolean;
  priority?: boolean;
  /** Use "1px" for the breakpoint where this copy is hidden so it never downloads at full size. */
  sizes?: string;
  /** "contain" shows the whole photo (e.g. a square portrait on black) instead of cropping it. */
  fit?: "cover" | "contain";
  position?: "center" | "bottom" | "right-bottom";
}) {
  const src = photo && existsSync(join(process.cwd(), "public", "photos", photo)) ? `/photos/${photo}` : null;
  if (src) {
    return (
      <div className={`${className.includes("absolute") ? "" : "relative "}overflow-hidden ${className}`}>
        <Image src={src} alt={label} fill priority={priority} sizes={sizes} className={`${fit === "contain" ? "object-contain" : "object-cover"} ${{ center: "object-center", bottom: "object-bottom", "right-bottom": "object-right-bottom" }[position]} ${fit === "contain" ? "" : "transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"}`} />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-end p-5 ${
        dark ? "bg-gradient-to-br from-[#1d1d26] to-[#2a2033]" : "bg-[#dfe4ea]"
      } ${className}`}
    >
      <span className={`rounded-full px-3 py-1 text-xs font-medium ${dark ? "bg-white/10 text-white/60" : "bg-white/80 text-muted"}`}>
        Photo: {label}
      </span>
    </div>
  );
}

// Dark page header used on inner pages. With a photo it matches the home hero.
export function PageHero({
  eyebrow,
  title,
  accent,
  body,
  photo,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  body?: string;
  photo?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {photo && (
        <>
          <PhotoSlot label="Jesse Razo" photo={photo} priority sizes="(min-width: 768px) 50vw, 1px" dark className="absolute inset-y-0 right-0 hidden w-1/2 md:flex" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-charcoal from-50% to-transparent to-75% md:block" aria-hidden="true" />
        </>
      )}
      <Container className="relative pb-20 pt-20 md:pb-28 md:pt-28">
        <Eyebrow className="text-white/60">{eyebrow}</Eyebrow>
        <HeadlineLines
          className={`text-5xl text-white md:text-8xl ${photo ? "max-w-2xl" : "max-w-5xl"}`}
          lines={[{ text: title }, ...(accent ? [{ text: accent, accent: true }] : [])]}
        />
        {body && <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">{body}</p>}
        {children && <div className="mt-10">{children}</div>}
        {photo && <PhotoSlot label="Jesse Razo" photo={photo} priority sizes="(min-width: 768px) 1px, 100vw" dark className="mt-12 aspect-[4/5] w-full md:hidden" />}
      </Container>
    </section>
  );
}
