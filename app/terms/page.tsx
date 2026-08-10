import type { Metadata } from "next";
import { SITE } from "@/config/active";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-brand-800">
      <h1 className="text-2xl font-bold text-brand-950">Terms of Service</h1>
      <p className="mt-4 text-brand-700/60">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <p className="mt-6">
        By using {SITE.siteName}, you agree to these terms. If you don't
        agree, please don't use this site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">What this site is</h2>
      <p className="mt-2">
        {SITE.siteName} is a free self-assessment tool. It provides a
        personalized informational result based on your answers, along with
        product recommendations. It is not medical, legal, or financial
        advice, and using it does not create any professional relationship.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">No guarantees</h2>
      <p className="mt-2">
        Results and recommendations are informational only. We make no
        guarantees about outcomes from following them or from purchasing any
        recommended product.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Affiliate links</h2>
      <p className="mt-2">
        This site contains affiliate links. See our{" "}
        <a href="/affiliate-disclosure" className="underline">Affiliate Disclosure</a>{" "}
        for details.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Liability</h2>
      <p className="mt-2">
        This site is provided "as is" without warranties of any kind. We are
        not liable for decisions made based on your quiz result or for
        products purchased from third-party merchants.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Changes</h2>
      <p className="mt-2">
        We may update these terms from time to time. Continued use of the
        site means you accept the current version.
      </p>
    </div>
  );
}
