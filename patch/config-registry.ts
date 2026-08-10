// Table des niches disponibles. AJOUTER UNE NICHE = AJOUTER UNE LIGNE ICI.
//
// C'est le seul fichier à toucher pour déclarer une nouvelle niche. La bascule
// entre niches se fait ensuite par la variable d'environnement
// NEXT_PUBLIC_NICHE (voir config/active.ts et .env.example) — aucun composant,
// aucune page, aucun fichier de lib/ ne change jamais.

import type {
  ContentConfig,
  Product,
  QuizQuestion,
  ScoringConfig,
  SiteConfig,
} from "@/lib/types";

import { SITE as readyscoreSite } from "./niches/readyscore/site";
import { QUESTIONS as readyscoreQuestions } from "./niches/readyscore/quiz";
import { PRODUCTS as readyscoreProducts } from "./niches/readyscore/products";
import { SCORING as readyscoreScoring } from "./niches/readyscore/scoring";
import { CONTENT as readyscoreContent } from "./niches/readyscore/content";

import { SITE as growreadySite } from "./niches/growready/site";
import { QUESTIONS as growreadyQuestions } from "./niches/growready/quiz";
import { PRODUCTS as growreadyProducts } from "./niches/growready/products";
import { SCORING as growreadyScoring } from "./niches/growready/scoring";
import { CONTENT as growreadyContent } from "./niches/growready/content";

/** Tout ce qu'une niche doit fournir pour que le moteur tourne. */
export interface NicheConfig {
  SITE: SiteConfig;
  QUESTIONS: QuizQuestion[];
  PRODUCTS: Product[];
  SCORING: ScoringConfig;
  CONTENT: ContentConfig;
}

export const NICHES: Record<string, NicheConfig> = {
  readyscore: {
    SITE: readyscoreSite,
    QUESTIONS: readyscoreQuestions,
    PRODUCTS: readyscoreProducts,
    SCORING: readyscoreScoring,
    CONTENT: readyscoreContent,
  },
  growready: {
    SITE: growreadySite,
    QUESTIONS: growreadyQuestions,
    PRODUCTS: growreadyProducts,
    SCORING: growreadyScoring,
    CONTENT: growreadyContent,
  },
};

/** Niche servie quand NEXT_PUBLIC_NICHE est absente ou inconnue. */
export const DEFAULT_NICHE = "readyscore";

export const NICHE_SLUGS = Object.keys(NICHES);
