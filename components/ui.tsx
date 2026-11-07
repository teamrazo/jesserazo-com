import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
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
    dark: "bg-charcoal text-white/80 [&_h2]:text-white [&_h3]:text-white",
  };
  return (
    <section id={id} className={`py-20 md:py-28 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple">{children}</p>
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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors";
  const styles = {
    primary: "bg-purple text-white hover:bg-purple-deep",
    ghost: "border border-charcoal/20 text-charcoal hover:border-purple hover:text-purple",
    light: "border border-white/30 text-white hover:border-gold hover:text-gold",
  };
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles[variant]}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  );
}

// Placeholder until real photos arrive. Labelled so nobody mistakes it for final art.
export function PhotoSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-end rounded-2xl bg-gradient-to-br from-sand via-[#e3d9ea] to-[#d8c7e3] p-5 ${className}`}
    >
      <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-muted">Photo: {label}</span>
    </div>
  );
}
