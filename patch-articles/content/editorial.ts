// Mise en scène de la home Home-Secure. Le contenu vit dans content/articles.ts ;
// ce fichier ne fait que choisir quoi mettre en une et dans quel ordre.

import { ARTICLES, CATEGORIES, CATEGORY_ORDER, articleHref, getArticle } from "./articles";

export { CATEGORIES };
export type { Category } from "./articles";

/** Forme attendue par app/page.tsx. Conservée telle quelle. */
export type Article = {
  href: string;
  kicker: string;
  category: string;
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  imageDark?: boolean;
  meta?: string;
  date?: string;
  number?: number;
};

function toCard(slug: string): Article {
  const a = getArticle(slug);
  if (!a) throw new Error(`Article introuvable dans le registre : ${slug}`);
  return {
    href: articleHref(a),
    kicker: a.kicker,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    image: a.image,
    imageAlt: a.imageAlt,
    imageDark: a.imageDark,
    meta: a.meta,
    date: a.date,
    number: a.number,
  };
}

export const LEAD: Article = toCard("outdoor-cameras-that-record-offline");

export const SECONDARY: Article[] = [
  toCard("reinforce-a-sliding-patio-door"),
  toCard("security-apps-when-you-lose-signal"),
  toCard("where-burglars-actually-enter"),
];

export type Hub = {
  href: string;
  index: string;
  category: string;
  title: string;
  description: string;
};

export const HUBS: Hub[] = CATEGORY_ORDER.map((key, i) => ({
  href: `/${key}`,
  index: String(i + 1).padStart(2, "0"),
  category: key,
  title: CATEGORIES[key].label,
  description: CATEGORIES[key].blurb,
}));

export const LATEST: Article[] = [...ARTICLES]
  .sort((a, b) => b.number - a.number)
  .map((a) => toCard(a.slug));

export const NAV = CATEGORY_ORDER.map((key) => ({
  label: CATEGORIES[key].label,
  href: `/${key}`,
}));

export const EDITORIAL = {
  topbarNote: "Independent testing · No manufacturer sponsorship",
  hubsTitle: "Start here",
  hubsLabel: "Pillar hubs",
  latestTitle: "Latest",
  latestAllLabel: "All articles →",
  latestAllHref: "/library",
  quizCard: {
    eyebrow: "Free assessment",
    title: "Score your home in 60 seconds",
    body: "Seven questions, one 0–100 index, and the exact gaps to close first.",
    cta: "Run the assessment",
    note: "No signup · 41,200 homes scored",
  },
  /** Emplacement display : laissé vide tant qu'aucune régie n'est branchée. */
  showAdSlots: false,
};
