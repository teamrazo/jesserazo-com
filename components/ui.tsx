import Link from "next/link";
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

// Placeholder until real photos arrive. Labelled so nobody mistakes it for final art.
export function PhotoSlot({ label, className = "", dark = false }: { label: string; className?: string; dark?: boolean }) {
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
