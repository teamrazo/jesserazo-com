import Image from "next/image";
import Link from "next/link";
import { LINKS, SITE } from "@/lib/site";
import { NewsletterForm } from "./Forms";
import { Container } from "./ui";

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Explore",
    links: [
      ["/about", "My Story"],
      ["/work-with-jesse", "Work with Jesse"],
      ["/legacy", "Legacy"],
    ],
  },
  {
    title: "Programs",
    links: [
      [LINKS.proximity, "Proximity Challenge"],
      [LINKS.timeback, "TimeBACK Audit"],
      [LINKS.lever, "LEVER AI"],
      [LINKS.partner, "Partner Program"],
    ],
  },
  {
    title: "Company",
    links: [
      [LINKS.rsn, "RazoRSharp Networks"],
      [LINKS.legacyFund, "Legacy Fund"],
      ["https://support.razorsharpnetworks.com/knowledge-base", "Help Center"],
      [LINKS.facebook, "The Freedom Project"],
    ],
  },
];

const FOOT_LEGAL: [string, string][] = [
  ["https://www.razorsharpnetworks.com/master-service-agreement-2/", "Master Service Agreement"],
  ["https://www.razorsharpnetworks.com/accessibility-statement/", "Accessibility"],
  ["https://www.razorsharpnetworks.com/acceptable-use-policy/", "Acceptable Use"],
  ["https://www.razorsharpnetworks.com/privacy-policy/", "Privacy Policy"],
  ["https://www.razorsharpnetworks.com/cookie-policy/", "Cookie Policy"],
];

function FootLink({ href, children }: { href: string; children: string }) {
  const cls = "text-sm text-white/60 hover:text-white";
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl uppercase">The Freedom Letter</p>
            <p className="mt-1 text-sm text-purple">One short note a week on faith, family, freedom and systems.</p>
          </div>
          <NewsletterForm dark />
        </Container>
      </div>

      {/* Columns */}
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-sm font-semibold">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map(([href, label]) => (
                <li key={label}><FootLink href={href}>{label}</FootLink></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <Image src="/rsn-logo-purple.png" alt="RazoRSharp Networks" width={140} height={28} className="h-7 w-auto" />
          <p className="mt-4 text-sm text-white/60">{SITE.tagline}</p>
          <p className="mt-4 text-sm text-white/60">
            Built using{" "}
            <a href="https://pillar.razorsharpnetworks.com/webassetfx-smart-sites" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">WebAssetFX</a>
            {" "}&amp;{" "}
            <a href={LINKS.lever} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">LEVER AI</a>
          </p>
        </div>
      </Container>

      {/* Legal */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} &bull; {SITE.company} &bull; All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {FOOT_LEGAL.map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{label}</a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
