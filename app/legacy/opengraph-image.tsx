import { ogCard, ogSize } from "@/lib/og";

export const alt = "Jesse Razo: Build what outlasts you";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Legacy", line1: "Build what", line2: "outlasts you.", photo: "legacy-hero.jpg" });
}
