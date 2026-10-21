/**
 * `npm run build` for every host.
 *
 * Cloudflare Workers Builds (which sets WORKERS_CI) needs the OpenNext
 * bundle in .open-next/ for its `wrangler deploy` step; everywhere else
 * (Vercel, local) a plain `next build` is what's wanted. OpenNext itself
 * runs `next build` directly (buildCommand in open-next.config.ts), so this
 * never recurses.
 */
import { spawnSync } from "node:child_process";

const onCloudflare = Boolean(process.env.WORKERS_CI);
const command = onCloudflare ? "npx opennextjs-cloudflare build" : "npx next build";

console.log(`> ${command}${onCloudflare ? " (Cloudflare Workers Builds)" : ""}`);
const { status } = spawnSync(command, { stdio: "inherit", shell: true });
process.exit(status ?? 1);
