"use client";

/**
 * Site-wide next/image loader — no image-optimization service at all.
 *
 * Next's built-in optimizer is billed per image on Vercel and needs the
 * paid Images binding on Cloudflare Workers. Every photo on the site comes
 * from Unsplash, whose CDN resizes and re-encodes for free from URL
 * params, so srcset widths are delegated there. Everything else (the brand
 * files in /public and admin-uploaded fliers) is already sized for the
 * web and is served as-is.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    if (!url.searchParams.has("fit")) url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
