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
- Photos to replace `PhotoSlot` placeholders
- God's OS Challenge URL (`LINKS.godsOS`)
- Freedom Project video link (currently Facebook page)
- HighLevel tag names for applications and newsletter (tags need Jesse's OK)
- Calendar URL for post-application booking

## Environment (Vercel)
See `.env.example`.
- `GHL_PRIVATE_TOKEN`, `GHL_LOCATION_ID`: same values as other RSN projects. Without them, forms return `mode: "no-ghl"` and nothing reaches HighLevel.
- `GHL_APPLY_TAGS`, `GHL_SUBSCRIBE_TAGS`: optional, comma separated.
- `NEXT_PUBLIC_APPLY_CALENDAR_URL`: calendar shown after an application is submitted.

Every form sends first-touch and last-touch attribution as a HighLevel note.

## Shared RSN standards
- Footer matches portal.gitlever.ai
- Partner bar loads from partner.razorsharpnetworks.com/embed/partner-bar.js
- Back-to-top button
- Support/Recommend drawers: not yet ported

## Deploy
Push or merge to `main`. Vercel builds automatically. Do not deploy from Vercel directly.
