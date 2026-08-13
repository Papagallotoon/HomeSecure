import type { SiteConfig } from "@/lib/types";

export const SITE: SiteConfig = {
  siteId: "readyscore",
  siteName: "ReadyScore",
  siteDescription:
    "Get a hard readiness score on your home for a 72-hour disruption — in 60 seconds.",
  niche: "home preparedness",
  locale: "en",
  domain: "readyscore.example.com",
  analytics: { gaMeasurementId: "G-6WW78QXRLW" },
  // Direction "Tactical" : charbon + turquoise.
  //
  // Rampe kaki clair : 50 = fond de page (le plus clair), 950 = texte le plus
  // sombre. Sens des classes inchangé (bg-brand-50 = surface, text-brand-950 =
  // texte fort), seule la valeur bascule du sombre vers le clair.
  // 50 = fond de page, 950 = texte fort,
  // 600 = l'accent turquoise. Les composants utilisent bg-brand-50 pour les
  // surfaces et text-brand-950 pour le texte fort — ces classes gardent donc
  // exactement le même sens, sans aucune modification.
  branding: {
    headingFont: "sans-bold",
    colors: {
      "50": "#e6e1d1",  // fond de page — kaki clair
      "100": "#f1ede1", // cartes, surfaces surélevées
      "200": "#dcd6c3", // bordures visibles
      "300": "#c9c2ad", // bordures au survol
      "400": "#8a8f93", // texte désactivé
      "500": "#6b7074", // texte secondaire faible
      "600": "#0E7C6E", // ACCENT turquoise — CTA, jauge, sélection
      "700": "#5c6266", // texte secondaire
      "800": "#33383c", // texte courant
      "900": "#23272a", // titres
      "950": "#1b1e21", // texte le plus fort
    },
  },
  headerTagline: "Home Defense Index",
  headerStatus: "Assessment online",
  hero: {
    eyebrow: "Field assessment / 72-hour window",
    title: "72 Hours With No Power, No Stores, No Help",
    subtitle:
      "Seven questions. Sixty seconds. A hard readiness score on your home — and the exact gaps to close first.",
    ctaLabel: "Run the Assessment",
    benefits: ["7 questions", "60 seconds", "No signup"],
  },
  howItWorksTitle: "Operational sequence",
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
  quizStepLabel: "Phase",
  resultCopy: {
    scoreLabel: "Readiness Index",
    classificationLabel: "Classification",
    strengthsTitle: "Confirmed capabilities",
    strengthsEmpty: "None confirmed yet — start with the two lowest axes below.",
    gapsTitle: "Critical gaps",
    gapsEmpty: "No critical gaps detected.",
    mapTitle: "Threat surface — dimension map",
    mapAllClear:
      "No axis falls into critical range — your coverage is even across every dimension.",
    mapWeakestTemplate:
      "Your weakest link is {dimension}. In a 72-hour disruption that gap fails first — close it before anything else on this map.",
    recommendationTitle: "Matched equipment — Dossier 01",
    productCtaLabel: "Deploy My Kit",
    rerunLabel: "Rerun assessment",
    matchReasonTemplate: "Matched because your weakest positions are {gaps}.",
    matchReasonFallback:
      "You already cover the essentials — this rounds out your setup.",
  },
  furtherTests: {
    eyebrow: "Further assessments",
    title: "Run our other anonymous security tests",
    subtitle:
      "No email, no account, nothing stored on our side. Each test takes about a minute and adds a dimension to your profile.",
    tests: [
      {
        label: "Test 02 — 60 sec",
        title: "Digital exposure",
        description: "How much of your household is reachable online.",
        href: "#",
      },
      {
        label: "Test 03 — 45 sec",
        title: "Vehicle readiness",
        description: "Whether your car could get you 300 miles out.",
        href: "#",
      },
      {
        label: "Test 04 — 90 sec",
        title: "Family comms drill",
        description: "If networks drop, who reaches whom, and where.",
        href: "#",
      },
    ],
  },
  legal: {
    affiliateDisclosure:
      "Some links on this website are affiliate links. We may earn a commission if you make a purchase, at no additional cost to you.",
    footerNote: "Not a medical or financial service.",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
    ],
  },
};
