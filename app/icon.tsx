import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(join(process.cwd(), "lib/anton.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0f", color: "white", fontFamily: "Anton", fontSize: 33, letterSpacing: 1 }}>
        J<span style={{ color: "#a83ac4" }}>R</span>
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: font, weight: 400, style: "normal" }] },
  );
}
