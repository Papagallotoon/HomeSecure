import type { SiteConfig } from "./types";

/** Tailwind classes for the active niche's display heading style. */
export function headingClass(site: Pick<SiteConfig, "branding">): string {
  return site.branding.headingFont === "sans-bold"
    ? "font-sans font-black uppercase tracking-tight"
    : "font-serif font-semibold";
}
