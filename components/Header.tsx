import Link from "next/link";
import { NAV } from "@/lib/site";
import { Container } from "./ui";
import { Magnetic } from "./Motion";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl uppercase tracking-wide text-white">
          Jesse Razo
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.filter((n) => n.href !== "/work-with-jesse").map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/80 hover:text-white">
              {item.label}
            </Link>
          ))}
          <Magnetic>
            <Link
              href="/work-with-jesse"
              data-track="cta_click:header"
              className="inline-block rounded-full bg-purple px-5 py-2 text-sm font-semibold text-white hover:bg-purple-deep"
            >
              Work with Jesse
            </Link>
          </Magnetic>
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/30 px-4 py-2 text-sm text-white">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-charcoal p-2 shadow-lg">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/10">
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </Container>
    </header>
  );
}
