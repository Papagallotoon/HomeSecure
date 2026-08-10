import type { Metadata } from "next";
import { SITE } from "@/config/active";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-brand-800">
      <h1 className="text-2xl font-bold text-brand-950">Privacy Policy</h1>
      <p className="mt-4 text-brand-700/60">Last updated: {new Date().toISOString().slice(0, 10)}</p>

      <p className="mt-6">
        {SITE.siteName} ("we", "us") operates this website. This policy explains
        what information we collect when you use it and how it's used.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Information we collect</h2>
      <p className="mt-2">
        We collect the answers you give in our quiz, standard analytics data
        (pages viewed, approximate location from IP, device/browser type),
        and marketing attribution data (UTM parameters) if you arrived via a
        campaign link. We do not require you to create an account or provide
        your name, email, or payment details to use this site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">How we use it</h2>
      <p className="mt-2">
        To generate your personalized quiz result, to understand which
        content and offers are useful to visitors, and to improve this site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Third parties</h2>
      <p className="mt-2">
        We may use analytics providers (such as Google Analytics and/or
        PostHog) to understand site usage. When you click through to a
        recommended product, you leave this site and are subject to that
        merchant's own privacy policy — currently offers are fulfilled via
        Digistore24 and its merchants.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Your choices</h2>
      <p className="mt-2">
        You can use this site without providing any personally identifying
        information. If your browser blocks analytics scripts, the site
        continues to function normally.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Contact</h2>
      <p className="mt-2">
        Questions about this policy can be sent to the contact address listed
        wherever this site is published.
      </p>
    </div>
  );
}
