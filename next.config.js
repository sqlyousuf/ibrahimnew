/**
 * The site is a static export (`out/`) served by Cloudflare Workers static
 * assets — free and unmetered on the Workers Free plan. The only server
 * code is the Worker in worker/index.ts, which owns `/api/*` and `/media/*`.
 *
 * In `next dev` there is no export; those two paths are forwarded to a
 * local `wrangler dev` instead (run `npm run dev:api` alongside).
 */
const isDev = process.env.NODE_ENV === "development";
const WORKER_DEV_ORIGIN = process.env.WORKER_DEV_ORIGIN ?? "http://localhost:8787";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isDev ? undefined : "export",
  images: {
    // Static export has no image optimizer; resizing is delegated to
    // Unsplash's CDN instead (see the loader).
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  ...(isDev && {
    async rewrites() {
      return [
        { source: "/api/:path*", destination: `${WORKER_DEV_ORIGIN}/api/:path*` },
        { source: "/media/:path*", destination: `${WORKER_DEV_ORIGIN}/media/:path*` },
      ];
    },
  }),
};

module.exports = nextConfig;
