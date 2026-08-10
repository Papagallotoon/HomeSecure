// Core types shared by every niche config. Edit config/niches/* to build a
// new site — these types should rarely need to change.

export type Currency = "EUR" | "USD" | "GBP";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  price: number;
  currency: Currency;
  /** Internal only. Never rendered to visitors. */
  netRevenuePerSale: number;
  /** Internal only. Never rendered to visitors. */
  commissionRate: number;
  /** Internal only. Never rendered to visitors. */
  checkoutConversion: number;
  /** Internal only. Never rendered to visitors. */
  refundRate: number;
  affiliateUrl: string;
  /** Optional Digistore24 campaign key, appended as a query param. */
  campaignKey?: string;
  /** Optional product video — YouTube/Vimeo URL or a direct .mp4/.webm file.
   *  Rendered under the product image when set; omitted entirely otherwise. */
  videoUrl?: string;
  /** Optional extra gallery images shown as thumbnails under the main
   *  `image`. Omit for a single-image card. */
  images?: string[];
  category: string;
  advantages: string[];
  disadvantages: string[];
  /** Result profile ids this product should be recommended for. */
  recommendedFor: string[];
  countryAvailability: string[];
  active: boolean;
}

export type QuestionType = "single" | "multiple" | "slider" | "number";

export interface AnswerOption {
  id: string;
  label: string;
  /** Dimension id -> points added when this option is selected. */
  scoreImpact?: Record<string, number>;
}

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  /** Dimension id -> points per unit of slider value. */
  scoreImpactPerUnit?: Record<string, number>;
}

export interface NumberConfig {
  min: number;
  max: number;
  placeholder?: string;
  /** Dimension id -> points per unit of the entered number. */
  scoreImpactPerUnit?: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  order: number;
  prompt: string;
  helpText?: string;
  /** Optional key into components/ui/Icon.tsx's icon set, shown as a badge
   *  above the prompt. Purely visual — the engine ships a small generic set
   *  (shield, droplet, heart, ...); niches just pick whichever fits. */
  icon?: string;
  type: QuestionType;
  options?: AnswerOption[];
  slider?: SliderConfig;
  number?: NumberConfig;
}

/** questionId -> selected answer (option id, option id[], or numeric value) */
export type Answers = Record<string, string | string[] | number>;

export interface ResultProfile {
  id: string;
  label: string;
  /** Inclusive score range on the normalized 0-100 scale. */
  minScore: number;
  maxScore: number;
  headline: string;
  description: string;
}

export interface DimensionMeta {
  id: string;
  label: string;
  /** Raw points at/above which this dimension counts as a "strength". */
  strengthThreshold: number;
}

export interface ScoringConfig {
  /** Highest raw score achievable by answering every question best-case. */
  maxRawScore: number;
  profiles: ResultProfile[];
  dimensions: DimensionMeta[];
}

export interface BrandPalette {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "950": string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

export interface SiteConfig {
  siteId: string;
  siteName: string;
  siteDescription: string;
  niche: string;
  locale: "en" | "fr" | "ja";
  domain: string;
  branding: {
    colors: BrandPalette;
    /** "sans-bold": heavy uppercase sans headlines — confident, tactical,
     *  masculine-leaning (e.g. security/finance/trading niches).
     *  "serif": softer editorial serif headlines (e.g. wellness/lifestyle
     *  niches). Applied to the hero title, score headline, and question
     *  prompts — the few places the engine renders a "display" heading. */
    headingFont: "sans-bold" | "serif";
  };
  hero: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    benefits: string[];
    /** Path or URL to a hero illustration/photo. Omit to show no visual. */
    image?: string;
    /** YouTube/Vimeo/Wistia URL or a direct video file. Takes priority over
     *  `image` when both are set. Omit until you have a real video. */
    videoUrl?: string;
  };
  /** Optional "how it works" steps on the landing page. Omit or leave empty
   *  to skip the section entirely. */
  howItWorks: HowItWorksStep[];
  quizIntro: {
    title: string;
  };
  resultCopy: {
    scoreLabel: string;
    strengthsTitle: string;
    gapsTitle: string;
    recommendationTitle: string;
    /** CTA label on the product card and sticky mobile bar. */
    productCtaLabel: string;
    /** Match explanation shown above the CTA. Use "{gaps}" as a placeholder
     *  for up to two of the visitor's actual gap labels. */
    matchReasonTemplate: string;
    /** Shown instead of matchReasonTemplate when the visitor has no gaps. */
    matchReasonFallback: string;
  };
}

export interface VideoAngle {
  hook: string;
  cta: string;
}

export interface ContentConfig {
  videoAngles: VideoAngle[];
}

export interface QuizResult {
  rawScore: number;
  score: number; // normalized 0-100
  profile: ResultProfile;
  dimensionScores: Record<string, number>;
  strengths: DimensionMeta[];
  gaps: DimensionMeta[];
  recommendations: Product[];
}
