import type { Metadata } from "next";
import { SITE } from "@/config/active";

export const metadata: Metadata = { title: "Affiliate Disclosure" };

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-brand-800">
      <h1 className="text-2xl font-bold text-brand-950">Affiliate Disclosure</h1>

      <p className="mt-6">
        Some links on this website are affiliate links. We may earn a
        commission if you make a purchase, at no additional cost to you.
      </p>

      <p className="mt-4">
        {SITE.siteName} participates in affiliate programs, currently
        including offers fulfilled through Digistore24. When you click a
        recommended product and make a purchase, we may receive a commission
        from the merchant. This does not affect the price you pay.
      </p>

      <p className="mt-4">
        Our quiz result and recommendations are generated from the answers
        you provide. We do not accept payment in exchange for a specific
        recommendation, and we do not publish fake reviews, fake
        testimonials, fake stock counters, or fake discounts.
      </p>

      <p className="mt-4">
        This site does not provide medical or financial advice. Product
        recommendations are informational and should not be treated as a
        guarantee of any outcome, health benefit, or financial return.
      </p>
    </div>
  );
}
