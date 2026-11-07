import { ImageResponse } from "next/og";

export const alt = "Jesse Razo | Faith, Family, Freedom, Legacy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#1a1a1f", color: "white" }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#c9a45c", textTransform: "uppercase" }}>Faith. Family. Freedom. Legacy.</div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24 }}>Jesse Razo</div>
        <div style={{ fontSize: 40, marginTop: 16, color: "rgba(255,255,255,0.75)" }}>From Operator to Architect.</div>
        <div style={{ width: 160, height: 8, background: "#a83ac4", marginTop: 48, borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}
