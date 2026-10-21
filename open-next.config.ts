import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";
import type { IncrementalCache } from "@opennextjs/aws/types/overrides.js";

/**
 * The KV cache, re-badged so `opennextjs-cloudflare deploy` skips its
 * pre-deploy "populate cache" step (it only populates caches whose name it
 * recognises). Two reasons:
 *
 * - That step runs *before* `wrangler deploy`, which is what provisions the
 *   KV namespace (wrangler.jsonc has no id) — so on a fresh Worker it fails
 *   with "No KV namespace ID found".
 * - The pages it would seed were prerendered at build time, where the
 *   Masjidal key isn't available. Starting empty means the first visit to
 *   each page renders with live prayer times and caches *that* for 30 min.
 *
 * Reads and writes go straight through to the real KV cache.
 */
const liveKvCache: IncrementalCache = {
  name: "kv-incremental-cache-live",
  get: kvIncrementalCache.get.bind(kvIncrementalCache),
  set: kvIncrementalCache.set.bind(kvIncrementalCache),
  delete: kvIncrementalCache.delete.bind(kvIncrementalCache),
};

/**
 * Cloudflare Workers build (OpenNext).
 *
 * The site leans on time-based ISR — prayer times and pages refresh every
 * 30 minutes — which needs a persistent incremental cache: KV, above. The
 * in-memory queue is enough for revalidation at this site's traffic.
 * Nothing uses revalidateTag, so no tag cache.
 */
const config = {
  ...defineCloudflareConfig({
    incrementalCache: liveKvCache,
    queue: memoryQueue,
  }),
  // `npm run build` delegates to OpenNext on Cloudflare (scripts/build.mjs),
  // so OpenNext must call Next directly rather than back into that script.
  buildCommand: "npx next build",
};

export default config;
