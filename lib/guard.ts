import { NextResponse } from "next/server";

// Light protection for public form endpoints:
// 1. Same-site origin only (blocks other sites posting into HighLevel).
// 2. Size cap on the request body.
// 3. Best-effort per-IP rate limit (per serverless instance).

const ALLOWED_HOSTS = ["www.jesserazo.com", "jesserazo.com", "localhost:3100", "localhost:3000"];
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const MAX_BYTES = 16 * 1024;
const hits = new Map<string, number[]>();

function originAllowed(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches from some browsers omit Origin; rate limit still applies
  try {
    const host = new URL(origin).host;
    return ALLOWED_HOSTS.includes(host) || host.endsWith("-getyour-timeback.vercel.app");
  } catch {
    return false;
  }
}

function rateLimited(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

/** Returns parsed JSON, or a NextResponse to send back when the request is rejected. */
export async function guardedJson(req: Request): Promise<Record<string, unknown> | NextResponse> {
  if (!originAllowed(req)) return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  if (rateLimited(req)) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  const text = await req.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "Request too large" }, { status: 413 });
  try {
    const data = JSON.parse(text);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("bad");
    return data as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
