import Link from "next/link";
import { SITE } from "@/config/active";

export function Header() {
  return (
    <header className="relative z-10 border-b border-brand-600/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="clip-bevel-sm flex h-6 w-6 items-center justify-center bg-brand-600 font-condensed text-[17px] font-extrabold leading-none text-brand-50">
            {SITE.branding.logoLetter ?? SITE.siteName.charAt(0)}
          </span>
          <span className="font-condensed text-xl font-extrabold uppercase tracking-wide text-brand-900">
            {SITE.siteName}
          </span>
          {SITE.headerTagline && (
            <span className="hidden border-l border-white/10 pl-3 font-mono text-[10px] uppercase tracking-ops text-brand-500 sm:inline">
              {SITE.headerTagline}
            </span>
          )}
        </Link>
        {SITE.headerStatus && (
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-ops text-brand-500 sm:flex">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#7fb069]" />
            {SITE.headerStatus}
          </div>
        )}
      </div>
    </header>
  );
}
