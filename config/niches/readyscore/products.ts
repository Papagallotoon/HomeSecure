import type { Product } from "@/lib/types";

// Internal benchmark stats (price, netRevenuePerSale, commissionRate,
// checkoutConversion, refundRate) are for OUR analysis only — never render
// them to visitors. Replace affiliateUrl with your real Digistore24
// promotion link before sending traffic.
//
// `image` and `images` hotlink the vendor's own product photography from
// theantilooterkit.com/dgs-affiliates/ — their official affiliate media
// kit, explicitly provided for affiliates to use in promotion. If a URL
// ever breaks, grab a fresh one from that page (or ask the vendor for an
// updated kit) and either hotlink it again or drop a file in
// public/products/ and point at that instead. `videoUrl` is the vendor's
// own Wistia demo video from the same page, embedded as-is via
// lib/video.ts.
export const PRODUCTS: Product[] = [
  {
    id: "anti-looter-kit",
    slug: "anti-looter-kit",
    name: "Anti-Looter Kit",
    shortDescription:
      "A DIY home-security system — motion sensors, a perimeter tripwire, window alarms, and a blackout-proof floodlight — built to make your home a harder target during a disruption.",
    image:
      "https://lh3.googleusercontent.com/CRJMqVx-XZWVSTp6rkrXe5foidYl0TESyrC4tKKj8j3uuaBJLzWSMH0iRRqQFu2QOpwezs6IA8uozbGYSl_LhzVqLwrqfM_amg=s0",
    videoUrl: "https://fast.wistia.net/embed/iframe/buhhnebdmm?seo=false&videoFoam=false",
    images: [
      "https://lh3.googleusercontent.com/YxJPsZBJ7JfIzj619gwdL8Nvp2_E29C4XQ25taxBNJbrv-2NPLUggdKsPPn8bCMg_Q0VvnAX0quV40jVH1SlntyDKBKOjgmN2Lc=w800",
      "https://lh3.googleusercontent.com/fgHcswGk4rXkIO5cdGgQjw6BwqjKwGtJZB7LvDKHERhQ0dKxh-8mQqT8eEJo8ilwefouEHOVwgEl85I8hxdpNI_nsRVT4iS68g=w800",
      "https://lh3.googleusercontent.com/7_rPepSl09LVfcrrZH5Yhf0WeTPgoGgyd4oBsAvh19QwiKtmLblr6O0K8DPxsH-BSM-dae6wcjIefrEDpH0i4JZJvAr2IFRTdw=w800",
      "https://lh3.googleusercontent.com/BL4ky-cGC5B0s_1br7z9yfftxtavrCyrD9E0JcdGPLMHQ1VPat5y_GRHShMN44il-vVHatsVTDTuvyvvXos2tfd4AaLOn-SvPZg=w800",
    ],
    price: 172.03,
    currency: "EUR",
    netRevenuePerSale: 45.31,
    commissionRate: 0.33,
    checkoutConversion: 0.18,
    refundRate: 0.0355,
    // This vendor tracks affiliate ID + campaign via a URL fragment, not a
    // query param — paste your FULL link from the Digistore24/affiliate
    // dashboard exactly as given, e.g.:
    // "https://www.theantilooterkit.com/main/#aff=YOUR_ID&cam=readyscore-launch-a"
    // lib/utm.ts detects that format and updates the "cam" value from
    // campaignKey below automatically; it never touches "aff".
    affiliateUrl: "https://www.theantilooterkit.com/main/#aff=papagallotoon",
    campaignKey: "readyscore-launch-a",
    category: "home-security",
    advantages: [
      "No tools or wiring — motion sensors, tripwire, and window alarms set up in minutes",
      "Blackout-proof floodlight needs no power cable or batteries",
      "Waterproof, shock-resistant case with 2 remotes to share with your household",
    ],
    disadvantages: [
      "Higher upfront cost than piecemeal DIY solutions",
      "Not a substitute for a full monitored home security system",
    ],
    recommendedFor: ["low", "medium", "high"],
    countryAvailability: ["US", "CA", "EU", "UK", "AU"],
    active: true,
  },
];
