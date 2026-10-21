import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

/**
 * Cloudflare Workers build (OpenNext).
 *
 * The site leans on time-based ISR — prayer times and pages refresh every
 * 30 minutes — which needs a persistent incremental cache. KV holds it
 * (wrangler provisions the namespace on first deploy, see wrangler.jsonc);
 * the in-memory queue is enough for revalidation at this site's traffic.
 * Nothing uses revalidateTag, so no tag cache.
 */
const config = {
  ...defineCloudflareConfig({
    incrementalCache: kvIncrementalCache,
    queue: memoryQueue,
  }),
  // `npm run build` delegates to OpenNext on Cloudflare (scripts/build.mjs),
  // so OpenNext must call Next directly rather than back into that script.
  buildCommand: "npx next build",
};

export default config;
