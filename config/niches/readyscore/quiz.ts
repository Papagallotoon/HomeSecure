import type { QuizQuestion } from "@/lib/types";

// Each question maps to one preparedness dimension. Every option adds the
// same number of points to "score" (the global 0-100 dimension) and to the
// named dimension, so dimension totals double as strengths/gaps signals.
function opts(dimension: string) {
  return [
    { id: "none", label: "Not at all", scoreImpact: { score: 0, [dimension]: 0 } },
    { id: "basic", label: "A little", scoreImpact: { score: 1, [dimension]: 1 } },
    { id: "good", label: "Fairly well", scoreImpact: { score: 2, [dimension]: 2 } },
    { id: "excellent", label: "Completely covered", scoreImpact: { score: 3, [dimension]: 3 } },
  ];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "backup_power",
    order: 1,
    type: "single",
    icon: "power",
    prompt: "If the power went out tonight, how would your home handle it?",
    helpText: "Think flashlights, batteries, generators, power banks.",
    options: opts("backup_power"),
  },
  {
    id: "first_aid",
    order: 2,
    type: "single",
    icon: "heart",
    prompt: "Do you have a stocked first aid kit at home?",
    options: opts("first_aid"),
  },
  {
    id: "water_storage",
    order: 3,
    type: "single",
    icon: "droplet",
    prompt: "How much clean drinking water could your household access without a store?",
    options: opts("water_storage"),
  },
  {
    id: "food_supplies",
    order: 4,
    type: "single",
    icon: "basket",
    prompt: "How many days could you feed your household from what's already at home?",
    options: opts("food_supplies"),
  },
  {
    id: "communication",
    order: 5,
    type: "single",
    icon: "chat",
    prompt: "Could you stay informed or reach help if cell networks went down?",
    helpText: "Radios, backup chargers, a family communication plan.",
    options: opts("communication"),
  },
  {
    id: "home_security",
    order: 6,
    type: "single",
    icon: "shield",
    prompt: "How confident are you in your home's ability to stay secure during a disruption?",
    helpText: "Locks, lighting, visibility, deterrents.",
    options: opts("home_security"),
  },
  {
    id: "emergency_plan",
    order: 7,
    type: "single",
    icon: "clipboard",
    prompt: "Does your household have a written emergency plan everyone knows?",
    options: opts("emergency_plan"),
  },
];
