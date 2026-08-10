import type { MetadataRoute } from "next";
import { SITE } from "@/config/active";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const routes = ["", "/quiz", "/privacy", "/terms", "/affiliate-disclosure"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
