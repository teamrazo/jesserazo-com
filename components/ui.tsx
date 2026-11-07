import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
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
      <Container>{children}</Container>
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
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-colors";
  const styles = {
    primary: "bg-purple text-white hover:bg-purple-deep",
    ghost: "border border-charcoal/25 text-charcoal hover:border-purple hover:text-purple",
    light: "border border-white/40 text-white hover:border-gold hover:text-gold",
  };
  const cls = `${base} ${styles[variant]}`;
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

// Shows /public/photos/<photo> when the file exists; otherwise a labelled placeholder.
// To add a photo: drop the file into public/photos with the name listed in README.
export function PhotoSlot({
  label,
  photo,
  className = "",
  dark = false,
  priority = false,
}: {
  label: string;
  photo?: string;
  className?: string;
  dark?: boolean;
  priority?: boolean;
}) {
  const src = photo && existsSync(join(process.cwd(), "public", "photos", photo)) ? `/photos/${photo}` : null;
  if (src) {
    return (
      <div className={`${className.includes("absolute") ? "" : "relative "}overflow-hidden ${className}`}>
        <Image src={src} alt={label} fill priority={priority} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
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

// Dark page header used on inner pages.
export function PageHero({ eyebrow, title, accent, body, children }: { eyebrow: string; title: string; accent?: string; body?: string; children?: ReactNode }) {
  return (
    <section className="bg-charcoal pb-20 pt-20 md:pb-28 md:pt-28">
      <Container>
        <Eyebrow className="text-white/60">{eyebrow}</Eyebrow>
        <h1 className="max-w-5xl text-5xl text-white md:text-8xl">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-purple">{accent}</span>
            </>
          )}
        </h1>
        {body && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">{body}</p>}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}
