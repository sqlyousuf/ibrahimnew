# Masjid Ibrahim Website

Website for Masjid Ibrahim (Spring, Texas) — built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. Deploys to Vercel.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

- `src/app/` — pages (App Router): home, about, prayer-times, institute, events, donate, gallery, contact
- `src/components/` — shared UI (Header, Footer, PageHero, ProgramCard)
- `src/lib/site.ts` — all site content in one place: contact info, nav links, leadership bios, Institute programs, events, gallery images. **Edit this file to update most of the site's text.**
- `public/brand/` — logo files (JPEG, navy background and white background versions)
- `brand-source/` — original `.ai` vector source file for the logo (not served on the site)

## Content notes

- **Prayer times**: computed locally from `src/lib/prayerTimes.ts` / `salahTimes.ts` / `iqamah.ts` — no external widget.
- **This Week (`/events`)**: the `weeklyEvents` array in `src/lib/site.ts` — see the doc comment directly above it for the exact entry shape (title, date, time, location, description, optional flier image, optional `eventDate` for auto-expiry). Empty array shows a "check back soon" state.
- **Donations**: online payment link and Zelle address live in `site.donate` in `src/lib/site.ts`.
- **Images**: stock photography from Unsplash (free to use, no attribution required) via `images.unsplash.com`, referenced directly by URL — no local copies needed. Swap any `src/lib/site.ts` image URL, or an inline `<Image src=... >` in a page file, for a real photo of the masjid once available. To use a real photo, drop it in `public/` and point the `src` at `/your-file.jpg`.

### Flier intake

Fliers can be added to "This Week" by emailing them to **masjidfliers@gmail.com**
with the event's title, date, time, location, and description in the body
(any format — plain English is fine) and the flier image attached.

A scheduled Claude Code cloud routine checks that inbox once an hour. For
each new email from a trusted sender (currently: `sqlyousuf@gmail.com`,
`admin@kleinislamiccenter.org`, `imam@masjidibrahimspring.org`), it:

1. Saves the flier image to `public/fliers/`.
2. Adds an entry to `weeklyEvents` in `src/lib/site.ts` following the
   contract documented there.
3. Runs `npm run lint` and `npm run build` as a safety check.
4. Commits and pushes to `main`, which Vercel auto-deploys.

Emails from anyone not on the trusted list are left untouched. To change who's
trusted, or the check frequency, update the routine at
[claude.ai/code/routines](https://claude.ai/code/routines).

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Import the repo in [Vercel](https://vercel.com/new) — it auto-detects Next.js, no config needed.
3. Set the production domain to `masjidibrahimspring.org` in the Vercel project's Domains settings.

No environment variables are required for the current feature set.
