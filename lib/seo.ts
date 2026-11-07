import type { Metadata } from "next";
import { LINKS, SITE } from "./site";

// One helper so every page gets a unique title, description, canonical URL and share card.
export function pageMeta({
  title,
  description,
  path,
  ogTitle,
}: {
  title?: string;
  description: string;
  path: string;
  ogTitle?: string;
}): Metadata {
  const shareTitle = ogTitle || (title ? `${title} | Jesse Razo` : SITE.title);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: path === "/" ? "website" : "profile",
      url: path,
      siteName: SITE.name,
      locale: "en_US",
      title: shareTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export const PERSON_ID = `${SITE.url}/#jesse-razo`;

export const personLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Jesse Razo",
  url: SITE.url,
  image: `${SITE.url}/photos/hero.jpg`,
  jobTitle: "Founder, RazoRSharp Networks",
  description:
    "Jesse Razo helps faith-driven founders move from Operator to Architect with AI, automation and the TimeBACK System, so they get time back for faith, family and legacy.",
  worksFor: {
    "@type": "Organization",
    name: "RazoRSharp Networks",
    legalName: SITE.company,
    url: LINKS.rsn,
  },
  knowsAbout: [
    "AI automation for small business",
    "Business systems architecture",
    "TimeBACK System",
    "LEVER AI",
    "Faith-driven entrepreneurship",
    "Founder time freedom",
  ],
  sameAs: [LINKS.rsn, LINKS.lever, LINKS.facebook],
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: "Jesse Razo",
  description: SITE.description,
  publisher: { "@id": PERSON_ID },
  inLanguage: "en-US",
};

export function jsonLd(data: object) {
  return { __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") };
}
