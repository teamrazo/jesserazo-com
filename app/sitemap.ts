import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PAGES: { path: string; priority: number; image: string }[] = [
  { path: "", priority: 1, image: "hero-portrait.jpg" },
  { path: "/work-with-jesse", priority: 0.9, image: "work-hero-portrait.jpg" },
  { path: "/about", priority: 0.8, image: "about-hero-portrait.jpg" },
  { path: "/legacy", priority: 0.7, image: "legacy-hero-portrait.jpg" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p.priority,
    images: [`${SITE.url}/photos/${p.image}`],
  }));
}
