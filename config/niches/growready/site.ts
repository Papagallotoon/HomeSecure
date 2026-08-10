import type { SiteConfig } from "@/lib/types";

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
  hero: {
    title: "What Should You Grow at Home?",
    subtitle:
      "Answer 7 quick questions and get a personalized starter plan for your space.",
    ctaLabel: "Take the Free Test",
    benefits: ["7 questions", "60 seconds", "No signup required"],
  },
  howItWorks: [
    { title: "Answer a few questions", description: "Quick, honest answers about your space and habits." },
    { title: "Get your score", description: "A personalized breakdown of what's working and what's not." },
    { title: "See what fits", description: "Get matched with a starter plan that suits your setup." },
  ],
  quizIntro: {
    title: "Home Growing Match",
  },
  resultCopy: {
    scoreLabel: "Your Growing Readiness Score",
    strengthsTitle: "What's working in your favor",
    gapsTitle: "What could hold you back",
    recommendationTitle: "Recommended for your setup",
    productCtaLabel: "Get My Recommended Kit",
    matchReasonTemplate: "Chosen because your setup is limited on {gaps}.",
    matchReasonFallback:
      "Your setup is already solid — this helps you grow more.",
  },
};
