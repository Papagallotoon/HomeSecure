// Barème de l'évaluation Home-Secure : questions, pondérations, correctifs.
//
// Volontairement hors du moteur (app/quiz reste le tunnel générique de
// ReadyScore) : ce barème est propre à la niche sécurité domestique et évolue
// avec les articles. Les libellés de couche correspondent aux catégories
// éditoriales, ce qui permet de renvoyer le lecteur vers le bon hub.

export type LayerKey = "perimeter" | "detection" | "response" | "resilience";

export const LAYERS: Record<LayerKey, { name: string; color: string; median: number; weight: number }> = {
  perimeter: { name: "Perimeter", color: "#1F7E8C", median: 58, weight: 0.3 },
  detection: { name: "Detection", color: "#0E7C6E", median: 64, weight: 0.3 },
  response: { name: "Response", color: "#147F60", median: 41, weight: 0.22 },
  resilience: { name: "Resilience", color: "#2C6C8B", median: 33, weight: 0.18 },
};

export type Question = {
  layer: LayerKey;
  title: string;
  help: string;
  options: { label: string; value: number }[];
};

export const QUESTIONS: Question[] = [
  {
    layer: "perimeter",
    title: "How are your exterior door frames fixed?",
    help: "The frame fails before the lock does. This one answer moves your index more than any other.",
    options: [
      { label: "Reinforced jamb, or 3-inch screws into the stud behind it", value: 1 },
      { label: "Solid deadbolt, but factory screws and plate", value: 0.35 },
      { label: "Spring latch only, or a door I already know is soft", value: 0 },
      { label: "No idea what is behind the plate", value: 0.18 },
    ],
  },
  {
    layer: "perimeter",
    title: "Your ground-floor windows and patio slider",
    help: "Roughly a third of forced entries in our sample came through a window or slider, not a door.",
    options: [
      { label: "Locked, plus film or a secondary bar on the slider", value: 1 },
      { label: "Locked, nothing beyond the factory catch", value: 0.5 },
      { label: "Some get left on the latch in warm weather", value: 0.12 },
    ],
  },
  {
    layer: "detection",
    title: "What covers the approach to your house?",
    help: "Coverage of the walk-up matters more than resolution at the door.",
    options: [
      { label: "Two or more cameras, recording locally as well as to cloud", value: 1 },
      { label: "One doorbell camera, cloud only", value: 0.45 },
      { label: "A dummy camera, or nothing", value: 0.05 },
    ],
  },
  {
    layer: "detection",
    title: "Entry sensors and interior motion",
    help: "Cameras tell you afterwards. Sensors are what wake a monitoring centre during.",
    options: [
      { label: "Every ground-floor opening, plus interior motion", value: 1 },
      { label: "Front and back door only", value: 0.5 },
      { label: "None fitted", value: 0 },
    ],
  },
  {
    layer: "response",
    title: "An alarm fires at 3 a.m. while you are away. Who acts?",
    help: "An unanswered siren stops a burglary about as often as a barking dog.",
    options: [
      { label: "Monitoring centre with verified police dispatch", value: 1 },
      { label: "A push notification to my phone, that is it", value: 0.4 },
      { label: "Nobody. The siren just sounds", value: 0.1 },
    ],
  },
  {
    layer: "response",
    title: "Do you have a first-90-seconds plan?",
    help: "Where you go, who you call, what you do not do. Written beats remembered.",
    options: [
      { label: "Yes, written, and everyone at home has read it", value: 1 },
      { label: "Roughly agreed, never written down", value: 0.4 },
      { label: "No plan", value: 0 },
    ],
  },
  {
    layer: "resilience",
    title: "A 12-hour power and internet cut. What survives?",
    help: "This is the failure mode most systems are never tested against.",
    options: [
      { label: "Keeps recording and alerting: battery plus cellular backup", value: 1 },
      { label: "Records locally, but no alerts get out", value: 0.5 },
      { label: "Everything goes dark", value: 0 },
    ],
  },
];

export type Fix = {
  gain: string;
  title: string;
  why: string;
  product: string;
  price: string;
  href: string;
  /** Article à lire pour ce correctif. */
  read?: { label: string; href: string };
};

export const FIXES: Record<LayerKey, Fix> = {
  perimeter: {
    gain: "+14 pts",
    title: "Reinforce the door frame, not the lock",
    why: "Three-inch screws and a full-length steel channel took our test door from 180 to 640 pounds of force to breach. It is ninety minutes of work and the cheapest structural gain available to you.",
    product: 'Bastion 48" jamb kit',
    price: "$54",
    href: "#",
    read: { label: "How to reinforce a sliding patio door", href: "/perimeter/reinforce-a-sliding-patio-door" },
  },
  detection: {
    gain: "+11 pts",
    title: "Add a camera that records without the cloud",
    why: "Cloud-only cameras stop being evidence the moment the router drops. A camera writing to its own card kept usable footage for 68 hours in our cut-power test.",
    product: "Redoubt SD",
    price: "$142",
    href: "#",
    read: {
      label: "The 7 cameras that survived the cut",
      href: "/detection/outdoor-cameras-that-record-offline",
    },
  },
  response: {
    gain: "+9 pts",
    title: "Put a human on the other end of the alarm",
    why: "A verified dispatch turns a noise into a police response. In our sample, monitored homes saw intruders leave a median of four minutes earlier.",
    product: "Monitoring, no-contract plan",
    price: "$19/mo",
    href: "#",
    read: {
      label: "Six apps, ranked by offline behaviour",
      href: "/response/security-apps-when-you-lose-signal",
    },
  },
  resilience: {
    gain: "+8 pts",
    title: "Give the system its own power and path out",
    why: "A battery bridge with a cellular fallback is the difference between a system that logs an outage and one that keeps working through it.",
    product: "Keystone cell + battery bridge",
    price: "$96",
    href: "#",
    read: { label: "Where burglars actually enter", href: "/resilience/where-burglars-actually-enter" },
  },
};

/** Distribution des index observés, par tranches de 10. */
export const DISTRIBUTION = [3, 6, 11, 17, 19, 16, 12, 9, 5, 2];

export const SAMPLE_SIZE = "41,200";

export function bandFor(score: number) {
  if (score >= 85)
    return {
      title: "Hardened",
      summary:
        "Very few homes score here. Your remaining risk is maintenance and habit, not hardware — keep the checklist current and re-run this every spring.",
    };
  if (score >= 70)
    return {
      title: "Solid, with one soft edge",
      summary:
        "The structure is sound and an opportunist will move on. One layer below is doing less work than the others, and that is where to spend next.",
    };
  if (score >= 50)
    return {
      title: "Exposed in places",
      summary:
        "You have real deterrence in some layers and none in others, which is the pattern intruders read fastest. The gaps below are the ones worth closing this month.",
    };
  return {
    title: "Soft target",
    summary:
      "As it stands, entry needs no tools and no skill. The good news is that the first two fixes below cost under $150 together and move you out of this band.",
  };
}

export function verdictFor(delta: number) {
  if (delta >= 12) return "Well above the median — this layer is carrying the others.";
  if (delta >= 0) return "At or just above the median. Adequate, not strong.";
  if (delta >= -20) return "Below the median. A weak point an intruder can read from the pavement.";
  return "Far below the median. This is your entry point.";
}
