import type { Product } from "@/lib/types";

// Internal benchmark stats are for OUR analysis only — never render them to
// visitors. Replace affiliateUrl with the real Digistore24 link before
// sending traffic. Avoid any medical/healing claims for this product.
export const PRODUCTS: Product[] = [
  {
    id: "medicinal-garden-kit",
    slug: "medicinal-garden-kit",
    name: "Medicinal Garden Kit",
    shortDescription:
      "A complete starter kit for growing a variety of plants at home, no experience required.",
    image: "/products/medicinal-garden-kit.svg",
    price: 63.32,
    currency: "EUR",
    netRevenuePerSale: 39.06,
    commissionRate: 0.72,
    checkoutConversion: 0.18,
    refundRate: 0.0207,
    affiliateUrl: "AFFILIATE_URL_PLACEHOLDER",
    campaignKey: "growready-tiktok-a",
    category: "gardening",
    advantages: [
      "Everything needed to get started in one box",
      "Works for small spaces: balconies, windowsills, patios",
      "Beginner-friendly, no gardening experience required",
    ],
    disadvantages: [
      "Results depend on sunlight and consistent care",
      "Not all plants suit every climate",
    ],
    recommendedFor: ["low", "medium", "high"],
    countryAvailability: ["US", "CA", "EU", "UK", "AU"],
    active: true,
  },
];
