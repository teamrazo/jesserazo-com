import { ogCard, ogSize } from "@/lib/og";

export const alt = "Jesse Razo: Faith first. Freedom by design.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Faith. Family. Freedom. Legacy.", line1: "Faith first.", line2: "Freedom by design.", photo: "hero.jpg" });
}
