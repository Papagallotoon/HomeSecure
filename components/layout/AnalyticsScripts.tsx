"use client";

import Script from "next/script";
import { analyticsEnv } from "@/lib/analytics";

/** Loads GA4/PostHog only if the corresponding env key is set. No-op otherwise. */
export function AnalyticsScripts() {
  return (
    <>
      {analyticsEnv.hasGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsEnv.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsEnv.gaId}');
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
