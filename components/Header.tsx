import Link from "next/link";
import { NAV } from "@/lib/site";
import { Container } from "./ui";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-ivory/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-xl font-semibold text-charcoal">
          Jesse Razo
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.slice(0, 1).concat(NAV.slice(2)).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink hover:text-purple">
              {item.label}
            </Link>
          ))}
          <Link
            href="/work-with-jesse"
            className="rounded-full bg-purple px-5 py-2 text-sm font-semibold text-white hover:bg-purple-deep"
          >
            Work with Jesse
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-charcoal/20 px-4 py-2 text-sm">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-charcoal/10 bg-white p-2 shadow-lg">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-sand">
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </Container>
    </header>
  );
}
