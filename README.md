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
- **This Week (`/events`)**: a 7-day calendar built by `getWeekCalendar()` in `src/lib/calendar.ts`, which merges two sources — the Institute's three recurring programs (their `calendar: { daysOfWeek, time }` field in `src/lib/site.ts`) and the `calendarEvents` array in the same file for everything else (one-off events via `recurrence: "once"` + an ISO `date`, or other recurring items via `recurrence: "weekly"` + `daysOfWeek`). See the doc comment above `calendarEvents` for the full entry shape, including the optional flier image. A day with nothing scheduled just shows "Nothing scheduled" — there's no separate empty state for the page as a whole, since the recurring programs mean it's never really empty.
- **Donations**: online payment link and Zelle address live in `site.donate` in `src/lib/site.ts`.
- **Images**: stock photography from Unsplash (free to use, no attribution required) via `images.unsplash.com`, referenced directly by URL — no local copies needed. Swap any `src/lib/site.ts` image URL, or an inline `<Image src=... >` in a page file, for a real photo of the masjid once available. To use a real photo, drop it in `public/` and point the `src` at `/your-file.jpg`.

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Import the repo in [Vercel](https://vercel.com/new) — it auto-detects Next.js, no config needed.
3. Set the production domain to `masjidibrahimspring.org` in the Vercel project's Domains settings.

No environment variables are required for the current feature set.
