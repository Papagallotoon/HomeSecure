import Link from "next/link";
import { SITE } from "@/config/active";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.09] py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="max-w-xl text-[13px] leading-relaxed text-brand-500">
          Some links on this website are affiliate links. We may earn a
          commission if you make a purchase, at no additional cost to you.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-ops text-brand-500">
          <Link href="/privacy" className="hover:text-brand-600">Privacy</Link>
          <Link href="/terms" className="hover:text-brand-600">Terms</Link>
          <Link href="/affiliate-disclosure" className="hover:text-brand-600">Affiliate disclosure</Link>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-ops text-brand-400">
          © {new Date().getFullYear()} {SITE.siteName} — not a medical or financial service.
        </p>
      </div>
    </footer>
  );
}
