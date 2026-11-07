import { ogCard, ogSize } from "@/lib/og";

export const alt = "Work with Jesse Razo: build the business on purpose";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Work with Jesse", line1: "Build the business", line2: "on purpose.", photo: "work-hero.jpg" });
}
