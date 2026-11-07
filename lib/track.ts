"use client";

import { track as vercelTrack } from "@vercel/analytics";

// Engagement events. Sent to Vercel Web Analytics and pushed to window.dataLayer
// (same pattern as gitlever.ai) so GTM or HighLevel can pick them up later.
export type EngagementEvent =
  | "cta_click"
  | "path_click"
  | "application_start"
  | "application_submit"
  | "application_error"
  | "freedom_signup"
  | "story_complete"
  | "timeback_complete"
  | "scroll_depth";

type Props = Record<string, string | number | boolean | null>;

export function track(event: EngagementEvent, props: Props = {}) {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics unavailable */
  }
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, page: window.location.pathname, ...props });
  } catch {
    /* ignore */
  }
}
