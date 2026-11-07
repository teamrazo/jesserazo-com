import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Attribution, BackToTop } from "@/components/ClientBits";
import { LINKS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s | Jesse Razo" },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
};

export const viewport: Viewport = { themeColor: "#1a1a1f" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jesse Razo",
  url: SITE.url,
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", name: SITE.company, url: LINKS.rsn },
  sameAs: [LINKS.rsn, LINKS.lever, LINKS.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
        <Attribution />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
        {/* Shared RSN Partner Program bar ("Give $100, Get $100") */}
        <Script src="https://partner.razorsharpnetworks.com/embed/partner-bar.js" data-site="jesserazo.com" strategy="lazyOnload" />
      </body>
    </html>
  );
}
