"use client";

import Script from "next/script";
import { analyticsEnv } from "@/lib/analytics";
import { SITE } from "@/config/active";

/**
 * GA4 + PostHog. Chaque script ne se charge que si sa clé existe.
 *
 * L'ID GA vient d'abord de NEXT_PUBLIC_GA_ID (utile pour surcharger par
 * environnement : staging vs prod), sinon de la niche active. Ainsi une
 * niche transporte sa propre mesure d'audience sans configuration Vercel.
 */
const gaId = analyticsEnv.gaId || SITE.analytics?.gaMeasurementId;

export function AnalyticsScripts() {
  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
              window.gtag = gtag;
            `}
          </Script>
        </>
      )}

      {analyticsEnv.hasPostHog && (
        <Script
          src={`${analyticsEnv.posthogHost}/static/array.js`}
          strategy="afterInteractive"
          onLoad={() => {
            if (window.posthog) {
              window.posthog.init(analyticsEnv.posthogKey as string, {
                api_host: analyticsEnv.posthogHost,
              });
              window.posthog.__loaded = true;
            }
          }}
        />
      )}
    </>
  );
}
