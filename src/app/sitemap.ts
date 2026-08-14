import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return navLinks.map((link) => ({
    url: `${site.url}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
  }));
}
