import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

// Branded share card: headline left, photo right. Built at deploy time.
export async function ogCard({ eyebrow, line1, line2, photo }: { eyebrow: string; line1: string; line2: string; photo: string }) {
  const [font, img] = await Promise.all([
    readFile(join(process.cwd(), "lib/anton.woff")),
    readFile(join(process.cwd(), "public/photos", photo)),
  ]);
  const src = `data:image/jpeg;base64,${img.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0a0f" }}>
        <div style={{ width: 700, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            {eyebrow}
          </div>
          <div style={{ fontFamily: "Anton", fontSize: 92, lineHeight: 1, color: "white", marginTop: 24, textTransform: "uppercase" }}>{line1}</div>
          <div style={{ fontFamily: "Anton", fontSize: 92, lineHeight: 1, color: "#a83ac4", textTransform: "uppercase" }}>{line2}</div>
          <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.8)", fontFamily: "sans-serif" }}>jesserazo.com</div>
        </div>
        <div style={{ width: 500, height: 630, display: "flex", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={500} height={630} style={{ objectFit: "cover", width: 500, height: 630 }} alt="" />
          <div style={{ position: "absolute", left: 0, top: 0, width: 140, height: 630, display: "flex", background: "linear-gradient(90deg, #0a0a0f, rgba(10,10,15,0))" }} />
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Anton", data: font, weight: 400, style: "normal" }] },
  );
}
