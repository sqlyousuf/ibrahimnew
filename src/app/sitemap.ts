import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

// Generated once at build time — the site is a static export.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({
    url: `${site.url}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
  }));
}
