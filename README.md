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
| hero.jpg | Home hero, right half | Tall portrait, subject on the right |
| story.jpg | Home "From Operator to Architect" | Portrait 4:5 |
| legacy.jpg | Home Legacy section | Portrait 4:5 |
| about-operator.jpg | My Story chapter 1 | Landscape 4:3 |
| about-turning-point.jpg | My Story chapter 2 | Landscape 4:3 |
| about-architect.jpg | My Story chapter 3 | Landscape 4:3 |
| family-1.jpg, family-2.jpg | My Story family (no names) | Square |
| legacy-fund.jpg | Legacy page | Landscape 4:3 |

Use JPGs about 2000px on the long side. Next.js resizes and compresses them on delivery.

## Environment (Vercel)
See `.env.example`.
- `GHL_PRIVATE_TOKEN`, `GHL_LOCATION_ID`: same values as other RSN projects. Without them, forms return `mode: "no-ghl"` and nothing reaches HighLevel.
- `GHL_APPLY_TAGS`: optional, comma separated. FREEDOM Project signups use the same tags as the gitlever.ai pop-up and send the same confirmation email.
- `NEXT_PUBLIC_APPLY_CALENDAR_URL`: calendar shown after an application is submitted.

Every form sends first-touch and last-touch attribution as a HighLevel note.

## Shared RSN standards
- Footer matches portal.gitlever.ai
- Partner bar removed at Jesse's request (2026-11-07)
- Back-to-top button
- Support/Recommend drawers: not yet ported

## Deploy
Push or merge to `main`. Vercel builds automatically. Do not deploy from Vercel directly.
