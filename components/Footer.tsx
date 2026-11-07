import Image from "next/image";
import { LINKS, SITE } from "@/lib/site";

// Matches the shared RSN footer on portal.gitlever.ai (lever-portal/js/shell.js).
const FOOT_LINKS = [
  [LINKS.rsn, "RazoRSharp Networks"],
  [LINKS.lever, "LEVER AI"],
  [LINKS.partner, "Partner Program"],
  ["https://support.razorsharpnetworks.com/knowledge-base", "Help Center"],
];

const FOOT_LEGAL = [
  ["https://www.razorsharpnetworks.com/master-service-agreement-2/", "Master Service Agreement"],
  ["https://www.razorsharpnetworks.com/accessibility-statement/", "Accessibility"],
  ["https://www.razorsharpnetworks.com/acceptable-use-policy/", "Acceptable Use"],
  ["https://www.razorsharpnetworks.com/privacy-policy/", "Privacy Policy"],
  ["https://www.razorsharpnetworks.com/cookie-policy/", "Cookie Policy"],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-purple/15 bg-charcoal py-10 text-center">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6">
        <p className="font-serif text-lg text-white">{SITE.tagline}</p>
        <Image src="/rsn-logo-purple.png" alt="RazoRSharp Networks" width={140} height={28} className="h-7 w-auto" />
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {FOOT_LINKS.map(([href, label]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-purple">
              {label}
            </a>
          ))}
        </div>
        <div className="text-sm text-white/60">
          Built using{" "}
          <a href="https://pillar.razorsharpnetworks.com/webassetfx-smart-sites" target="_blank" rel="noopener noreferrer" className="text-[#D48AE8] hover:underline">
            WebAssetFX
          </a>{" "}
          &amp;{" "}
          <a href={LINKS.lever} target="_blank" rel="noopener noreferrer" className="text-[#D48AE8] hover:underline">
            LEVER AI
          </a>
        </div>
        <p className="text-xs text-white/40">
          &copy; {year} &bull; {SITE.company} &bull; All Rights Reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
          {FOOT_LEGAL.map(([href, label]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-purple">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
