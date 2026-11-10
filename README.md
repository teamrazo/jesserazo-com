# jesserazo.com

Personal brand site for Jesse Razo. Next.js 16 (App Router), Tailwind v4, deployed on Vercel from GitHub.

Copyright holder: Legacy Media LLC.

## Pages
- `/` Home
- `/about` My Story (Operator to Architect)
- `/work-with-jesse` Application, then call
- `/legacy` Legacy vision and Legacy Fund

## Content
Copy and links live in `lib/site.ts` and in each page file. Items marked `DRAFT` are waiting on Jesse.

## Inputs needed (DRAFT items)
- Stat bar numbers (`STATS` in `lib/site.ts`, currently TBD)
- Story beats for `/about` chapters
- Faith statement (`/about`) and legacy vision (`/legacy`) in Jesse's words
- Proximity Challenge URL (`LINKS.proximity`)
- Freedom Project video link (currently Facebook page)
- HighLevel tag names for applications and newsletter (tags need Jesse's OK)
- Calendar URL for post-application booking

## Photos
Drop files into `public/photos/` with these names. Each slot shows a placeholder until its file exists.

| File | Where it shows | Shape |
| --- | --- | --- |
| hero-portrait.jpg | Home hero, right side top to bottom on pure black (shown whole) | Square portrait on black |
| story.jpg | Home "From Operator to Architect" | Portrait 4:5 |
| legacy.jpg | Home Legacy section | Portrait 4:5 |
| about-operator.jpg | My Story chapter 1 | Landscape 4:3 |
| about-turning-point.jpg | My Story chapter 2 | Landscape 4:3 |
| about-architect.jpg | My Story chapter 3 | Landscape 4:3 |
| family-1.jpg, family-2.jpg | My Story family (no names) | Square |
| legacy-fund.jpg | Legacy page | Landscape 4:3 |

Use JPGs about 2000px on the long side. Next.js resizes and compresses them on delivery.

## Forms and HighLevel
Both forms post to this site's own endpoint, `app/api/forms/route.ts`, built on `lib/rsn-forms.ts`
(the gitlever-home smart-form standard ported to TypeScript).
- FREEDOM Project signup: tags `action - email - subscribe`, `action - lever ai project update - subscribed`, `notify:new-lead`; confirmation email from jrazo@razorsharpnetworks.com.
- Work with Jesse application: tag `notify:new-lead`; answers saved as a contact note and posted to Slack.
- Existing contacts keep their name and email; first/last-touch attribution fields are set; Slack is the fallback.
- The visitor sees success only if HighLevel or Slack stored the lead. Otherwise the form shows an error.

Environment variables (Vercel, Production and Preview):
- `GHL_PRIVATE_TOKEN`, `GHL_LOCATION_ID` (required, same values as the other RSN projects)
- `GHL_VERSION` (optional, default 2021-07-28)
- Slack backup (recommended): `SLACK_BOT_TOKEN` (+ optional `SLACK_NOTIFICATION_CHANNEL`, default C05Q3RKUQGL), or `SLACK_NOTIFICATION_WEBHOOK`
- Setup check: `GET /api/forms` returns whether HighLevel and Slack are configured (true/false only)
- `NEXT_PUBLIC_APPLY_CALENDAR_URL` (optional, calendar shown after an application)

## Shared RSN standards
- Footer matches portal.gitlever.ai
- Partner bar removed at Jesse's request (2026-11-07)
- Back-to-top button
- Support/Recommend drawers: not yet ported

## Deploy
Push or merge to `main`. Vercel builds automatically. Do not deploy from Vercel directly.

## Engagement (motion and tracking)
- Motion: `components/Motion.tsx` (reveals, magnetic CTA, hero line reveal) and `components/ScrollStory.tsx` (pinned Operator to Architect story, TimeBACK stepper). All animation is transform and opacity only, and honours the visitor's reduce-motion setting.
- Events (Vercel Web Analytics custom events + `window.dataLayer`):
  - `cta_click` (label: hero, header, story, section name, or path name)
  - `application_start`, `application_submit` (revenue band), `application_error`
  - `freedom_signup`
  - `story_complete`, `timeback_complete`
  - `scroll_depth` (50, 90)
- Vercel Web Analytics and Speed Insights must be enabled on the project for events to show in the dashboard.

## Background photos (public domain)
- `bg-dive.jpg`: U.S. Navy diver entering the water during training, Naval Diving and Salvage Training Center, 2014 (photo 140218-N-IC111-156). Wikimedia Commons, public domain (U.S. Navy work).
- `bg-p3.jpg`: three P-3C Orion aircraft of VP-45 over Jacksonville, Florida. Official U.S. Navy photo, Wikimedia Commons, public domain.
Both converted to black and white. Credited on the page as "Photo: U.S. Navy".
