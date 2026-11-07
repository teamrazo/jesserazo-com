import { ogCard, ogSize } from "@/lib/og";

export const alt = "Jesse Razo: From Operator to Architect";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "My story", line1: "From Operator", line2: "to Architect.", photo: "about-hero.jpg" });
}
