import type { SiteConfig } from "@/lib/types";

export const SITE: SiteConfig = {
  siteId: "readyscore",
  siteName: "ReadyScore",
  siteDescription:
    "Get a hard readiness score on your home for a 72-hour disruption — in 60 seconds.",
  niche: "home preparedness",
  locale: "en",
  domain: "readyscore.example.com",
  // Direction "Tactical" : charbon + bronze cuivré.
  //
  // La rampe est VOLONTAIREMENT inversée par rapport aux niches claires :
  // 50 = le plus sombre (fond de page), 950 = le plus clair (texte fort),
  // 600 = l'accent bronze. Les composants utilisent bg-brand-50 pour les
  // surfaces et text-brand-950 pour le texte fort — ces classes gardent donc
  // exactement le même sens, sans aucune modification.
  branding: {
    headingFont: "sans-bold",
    colors: {
      "50": "#0a0b0a",  // fond de page
      "100": "#1a1d1a", // filets, séparateurs, surfaces plates
      "200": "#22261f", // bordures visibles
      "300": "#3a3e36", // bordures au survol
      "400": "#5f5a50", // texte désactivé
      "500": "#8c8778", // texte secondaire faible
      "600": "#c08a4e", // ACCENT — CTA, jauge, sélection
      "700": "#a9a294", // texte secondaire
      "800": "#d8d3c7", // texte courant
      "900": "#efeae0", // titres
      "950": "#f2eee5", // texte le plus fort
    },
  },
  hero: {
    title: "72 Hours With No Power, No Stores, No Help",
    subtitle:
      "Seven questions. Sixty seconds. A hard readiness score on your home — and the exact gaps to close first.",
    ctaLabel: "Run the Assessment",
    benefits: ["7 questions", "60 seconds", "No signup"],
  },
  howItWorks: [
    {
      title: "Report your position",
      description:
        "Honest answers on power, water, food, comms, medical and security.",
    },
    {
      title: "Receive your index",
      description:
        "A 0–100 readiness score with confirmed capabilities and critical gaps.",
    },
    {
      title: "Close the gaps",
      description:
        "One matched kit, ranked against the weaknesses you actually have.",
    },
  ],
  quizIntro: {
    title: "Home Readiness Assessment",
  },
  resultCopy: {
    scoreLabel: "Readiness Index",
    strengthsTitle: "Confirmed capabilities",
    gapsTitle: "Critical gaps",
    recommendationTitle: "Matched equipment — Dossier 01",
    productCtaLabel: "Deploy My Kit",
    matchReasonTemplate: "Matched because your weakest positions are {gaps}.",
    matchReasonFallback:
      "You already cover the essentials — this rounds out your setup.",
  },
};
