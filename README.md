# Masjid Ibrahim Website

Website for Masjid Ibrahim (Spring, Texas) — built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. Runs on Cloudflare Workers, entirely within the **Workers Free plan**.

## Getting started

```bash
npm install
npm run build      # once, so wrangler has an out/ folder to serve
npm run dev:api    # terminal 1 — the Worker (API) on :8787
npm run dev        # terminal 2 — Next dev server on :3000
```

Visit `http://localhost:3000`. `next dev` forwards `/api/*` and `/media/*` to the Worker. The Worker reads its secrets from a git-ignored `.dev.vars` file (same names as the production secrets below).

To run exactly what production runs (static site + Worker together): `npm run preview`.

## Project structure

- `src/app/` — pages (App Router): home, about, prayer-times, institute, events, donate, gallery, contact, admin — exported as static HTML
- `worker/index.ts` — the only server code: prayer-times API, This Week entries, flier images, admin API
- `src/components/` — shared UI (Header, Footer, PageHero, ProgramCard)
- `src/lib/site.ts` — all site content in one place: contact info, nav links, leadership bios, Institute programs, events, gallery images. **Edit this file to update most of the site's text.**
- `public/brand/` — logo files (JPEG, navy background and white background versions)
- `brand-source/` — original `.ai` vector source file for the logo (not served on the site)

## Content notes

- **Prayer times**: live from Masjidal's public feed — the same keyless endpoint Masjidal's own widgets use, for masjid ID `site.masjidal.masjidId` in `src/lib/site.ts`. The browser calls it directly (`src/lib/masjidal.ts`, shaped by `src/lib/prayerTimes.ts`); no key, and nothing of ours in between.
- **This Week (`/events`)**: a 7-day calendar built by `getWeekCalendar()` in `src/lib/calendar.ts`, which merges two sources — the Institute's three recurring programs (their `calendar: { daysOfWeek, time }` field in `src/lib/site.ts`) and the entries managed at `/admin` (stored in Workers KV) for everything else (one-off events via `recurrence: "once"` + an ISO `date`, or other recurring items via `recurrence: "weekly"` + `daysOfWeek`). See the `CalendarEvent` type in `src/lib/site.ts` for the full entry shape, including the optional flier image. A day with nothing scheduled just shows "Nothing scheduled" — there's no separate empty state for the page as a whole, since the recurring programs mean it's never really empty.
- **Donations**: online payment link and Zelle address live in `site.donate` in `src/lib/site.ts`.
- **Images**: stock photography from Unsplash (free to use, no attribution required) via `images.unsplash.com`, referenced directly by URL — no local copies needed. Swap any `src/lib/site.ts` image URL, or an inline `<Image src=... >` in a page file, for a real photo of the masjid once available. To use a real photo, drop it in `public/` and point the `src` at `/your-file.jpg`.

## How it runs (and why it's free)

The Next.js app is a **static export** (`output: "export"` → `out/`), served by Cloudflare Workers static assets. Static asset requests are free and unlimited, and never run any code.

Everything that needs a server lives in one small Worker (`worker/index.ts`): the This Week entries, flier images, and the admin API. It only runs for `/api/*` and `/media/*`, and every route there waits on KV rather than computing, so it stays inside the Free plan's 10ms-CPU-per-request limit. That's also why the admin password is checked with an HMAC comparison, not bcrypt.

Storage is one KV namespace (`SITE_KV`, free tier, no card needed): This Week entries and uploaded flier images. Wrangler creates it on the first deploy.

## Deploying to Cloudflare

Connected to GitHub through Cloudflare Workers Builds: every push to `main` builds (`npm run build`) and deploys (`npx wrangler deploy`).

Secrets — set in the Worker's **Settings → Variables and Secrets**:

| Name | What it's for |
| --- | --- |
| `ADMIN_USERNAME` | `/admin` sign-in username |
| `ADMIN_PASSWORD` | `/admin` sign-in password (plain text; stored encrypted by Cloudflare) |
| `ADMIN_SESSION_SECRET` | Long random string used to sign admin sessions |

**Lock file gotcha:** npm on Windows drops some optional `@emnapi/*` entries from `package-lock.json`, and Cloudflare's `npm ci` then refuses to install. After any `npm install` on Windows, run `npx npm@10.9.2 install --package-lock-only` before committing.
