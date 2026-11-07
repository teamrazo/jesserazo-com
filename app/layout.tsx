import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Attribution, BackToTop } from "@/components/ClientBits";
import { EngagementTracker, MotionProvider } from "@/components/Motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/site";
import { jsonLd, pageMeta, personLd, websiteLd } from "@/lib/seo";

// Self-hosted, Latin-only, preloaded, with size-matched fallbacks (no layout shift).
const anton = localFont({
  src: "./fonts/anton-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-anton",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s | Jesse Razo" },
  applicationName: "Jesse Razo",
  authors: [{ name: "Jesse Razo", url: SITE.url }],
  creator: "Jesse Razo",
  publisher: SITE.company,
  keywords: [
    "Jesse Razo",
    "faith-driven founders",
    "Operator to Architect",
    "TimeBACK System",
    "LEVER AI",
    "RazoRSharp Networks",
    "AI automation for business owners",
    "Proximity Challenge",
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
  ...pageMeta({ description: SITE.description, path: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
        <BackToTop />
        <Attribution />
        <EngagementTracker />
        <Analytics />
        <SpeedInsights />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ "@graph": [personLd, websiteLd] })} />
      </body>
    </html>
  );
}
