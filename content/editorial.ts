// Contenu de la home éditoriale Home-Secure.
//
// Séparé de config/niches/<niche>/site.ts pour une raison : site.ts est validé
// par lib/validateNiche.ts contre le type SiteConfig, partagé par toutes les
// niches. Le volet éditorial n'existe que pour Home-Secure ; quand une seconde
// niche éditoriale arrivera, ce fichier deviendra content/<niche>.ts et
// app/page.tsx choisira via ACTIVE_NICHE.
//
// Étape suivante prévue : remplacer ces tableaux par la lecture d'un dossier
// content/articles/*.mdx (300+ articles versionnés dans le repo). La forme des
// objets ci-dessous est déjà celle du frontmatter visé — les composants
// n'auront pas à changer.

export type Category = {
  slug: string;
  label: string;
  /** Nuance turquoise propre à la catégorie, sur fond clair. */
  color: string;
};

export const CATEGORIES: Record<string, Category> = {
  perimeter: { slug: "perimeter", label: "Perimeter", color: "#1F7E8C" },
  detection: { slug: "detection", label: "Detection", color: "#0E7C6E" },
  response: { slug: "response", label: "Response", color: "#147F60" },
  resilience: { slug: "resilience", label: "Resilience", color: "#2C6C8B" },
};

export type Article = {
  href: string;
  kicker: string;
  category: keyof typeof CATEGORIES;
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  /** true pour les prises très sombres, qui demandent un filtre plus fort. */
  imageDark?: boolean;
  meta?: string;
  date?: string;
  number?: number;
};

export const LEAD: Article = {
  href: "#",
  kicker: "Tested",
  category: "detection",
  title: "The 7 outdoor cameras that still recorded when the Wi-Fi dropped",
  excerpt:
    "We cut power and internet to eighteen cameras. Eleven went blind. Here is what the survivors have in common — and the two that cost under $90.",
  image: "/images/01-lead-camera.png",
  imageAlt: "Bullet camera mounted on a house corner at dusk",
  meta: "Cameras · Updated Aug 12",
};

export const SECONDARY: Article[] = [
  {
    href: "#",
    kicker: "Locks",
    category: "perimeter",
    title: "Smart locks are only as strong as the door they sit in",
    excerpt: "A $40 strike plate beats a $300 deadbolt. Test data inside.",
    image: "/images/02-smart-lock.png",
    imageAlt: "Keypad deadbolt on a dark door",
  },
  {
    href: "#",
    kicker: "Apps",
    category: "response",
    title: "Six security apps, ranked by what they do when you lose signal",
    excerpt: "Push alerts are worthless offline. Two apps handle it properly.",
    image: "/images/03-alarm-app.png",
    imageAlt: "Phone showing an armed alarm app",
  },
  {
    href: "#",
    kicker: "Sensors",
    category: "resilience",
    title: "Where burglars actually enter — 4,412 police reports, mapped",
    excerpt: "Not the front door. Not the second floor. Cover these three first.",
    image: "/images/04-window-sensor.png",
    imageAlt: "Magnetic contact sensor on a window frame",
  },
];

export type Hub = {
  href: string;
  index: string;
  category: keyof typeof CATEGORIES;
  title: string;
  description: string;
};

export const HUBS: Hub[] = [
  {
    href: "#",
    index: "01",
    category: "perimeter",
    title: "Perimeter",
    description: "Doors, windows, garage, fencing. 34 articles.",
  },
  {
    href: "#",
    index: "02",
    category: "detection",
    title: "Detection",
    description: "Cameras, sensors, alarms, monitoring. 51 articles.",
  },
  {
    href: "#",
    index: "03",
    category: "response",
    title: "Response",
    description: "What to do in the first 90 seconds. 19 articles.",
  },
  {
    href: "#",
    index: "04",
    category: "resilience",
    title: "Resilience",
    description: "Power, water, comms when services stop. 28 articles.",
  },
];

export const LATEST: Article[] = [
  {
    href: "#",
    number: 312,
    kicker: "Comparison",
    category: "detection",
    title: "Best video doorbells without a subscription",
    meta: "Comparison · 9 tested",
    date: "Aug 11",
  },
  {
    href: "#",
    number: 311,
    kicker: "Guide",
    category: "perimeter",
    title: "How to reinforce a sliding patio door in 20 minutes",
    meta: "Guide · 6 min read",
    date: "Aug 09",
  },
  {
    href: "#",
    number: 310,
    kicker: "Head to head",
    category: "detection",
    title: "Ring vs. Arlo: which one keeps working offline",
    meta: "Head to head",
    date: "Aug 07",
  },
  {
    href: "#",
    number: 309,
    kicker: "Checklist",
    category: "response",
    title: "The 12-point walkaround before you leave for a week",
    meta: "Checklist · Printable",
    date: "Aug 05",
  },
  {
    href: "#",
    number: 308,
    kicker: "Comparison",
    category: "detection",
    title: "Cheap motion sensors that don't trigger on the cat",
    meta: "Comparison · 11 tested",
    date: "Aug 02",
  },
];

export const NAV = [
  { label: "Cameras", href: "#" },
  { label: "Alarms", href: "#" },
  { label: "Locks", href: "#" },
  { label: "Apps", href: "#" },
  { label: "Guides", href: "#" },
];

export const EDITORIAL = {
  topbarNote: "Independent testing · No manufacturer sponsorship",
  hubsTitle: "Start here",
  hubsLabel: "Pillar hubs",
  latestTitle: "Latest",
  latestAllLabel: "All 312 articles →",
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
