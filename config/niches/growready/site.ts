import type { SiteConfig } from "@/lib/types";

// Niche PRÊTE MAIS NON ACTIVE. Pour la servir : NEXT_PUBLIC_NICHE=growready.
// Thème clair et titres serif, à l'opposé de readyscore — c'est ce contraste
// qui prouve que les composants ne présupposent aucun thème.
export const SITE: SiteConfig = {
  siteId: "growready",
  siteName: "GrowReady",
  siteDescription:
    "Find out what you should grow at home based on your space, light, and time.",
  niche: "home gardening",
  locale: "en",
  domain: "growready.example.com",
  branding: {
    headingFont: "serif",
    colors: {
      "50": "#f3f9ec",
      "100": "#e4f2d3",
      "200": "#c8e6a8",
      "300": "#a3d474",
      "400": "#7ebd47",
      "500": "#5fa02e",
      "600": "#4a8024",
      "700": "#3c661f",
      "800": "#33521d",
      "900": "#2c451c",
      "950": "#16260b",
    },
  },
  headerTagline: "Home Growing Index",
  headerStatus: "Test online",
  hero: {
    eyebrow: "Free assessment / your space, your light",
    title: "What Should You Grow at Home?",
    subtitle:
      "Answer 7 quick questions and get a personalized starter plan for your space.",
    ctaLabel: "Take the Free Test",
    benefits: ["7 questions", "60 seconds", "No signup required"],
  },
  howItWorksTitle: "How it works",
  howItWorks: [
    {
      title: "Answer a few questions",
      description: "Quick, honest answers about your space and habits.",
    },
    {
      title: "Get your score",
      description: "A personalized breakdown of what's working and what's not.",
    },
    {
      title: "See what fits",
      description: "Get matched with a starter plan that suits your setup.",
    },
  ],
  quizIntro: {
    title: "Home Growing Match",
  },
  quizStepLabel: "Question",
  resultCopy: {
    scoreLabel: "Your Growing Readiness Score",
    classificationLabel: "Your profile",
    strengthsTitle: "What's working in your favor",
    strengthsEmpty: "Nothing confirmed yet — the map below shows where to start.",
    gapsTitle: "What could hold you back",
    gapsEmpty: "Nothing significant is holding you back.",
    mapTitle: "Your growing conditions",
    mapAllClear: "Every condition is in decent shape — your setup is balanced.",
    mapWeakestTemplate:
      "Your tightest constraint is {dimension}. Work with it rather than against it — it decides what will actually thrive.",
    recommendationTitle: "Recommended for your setup",
    productCtaLabel: "Get My Recommended Kit",
    rerunLabel: "Retake the test",
    matchReasonTemplate: "Chosen because your setup is limited on {gaps}.",
    matchReasonFallback:
      "Your setup is already solid — this helps you grow more.",
  },
  legal: {
    affiliateDisclosure:
      "Some links on this website are affiliate links. We may earn a commission if you make a purchase, at no additional cost to you.",
    footerNote: "Not medical advice. No health claims are made about any plant.",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
    ],
  },
};
