import type { QuizQuestion } from "@/lib/types";

// NOTE: keep all copy focused on gardening / self-sufficiency / growing at
// home. Do not make medical or healing claims, even though a recommended
// product may have "medicinal" in its name.
function opts(dimension: string) {
  return [
    { id: "none", label: "Not really", scoreImpact: { score: 0, [dimension]: 0 } },
    { id: "basic", label: "A little", scoreImpact: { score: 1, [dimension]: 1 } },
    { id: "good", label: "Fairly good", scoreImpact: { score: 2, [dimension]: 2 } },
    { id: "excellent", label: "Very good", scoreImpact: { score: 3, [dimension]: 3 } },
  ];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "sunlight",
    order: 1,
    type: "single",
    icon: "sun",
    prompt: "How much direct sunlight does your growing space get?",
    options: opts("sunlight"),
  },
  {
    id: "space",
    order: 2,
    type: "single",
    icon: "house",
    prompt: "How much space do you have available (balcony, yard, windowsill)?",
    options: opts("space"),
  },
  {
    id: "time",
    order: 3,
    type: "single",
    icon: "clock",
    prompt: "How much time can you realistically spend tending plants each week?",
    options: opts("time"),
  },
  {
    id: "experience",
    order: 4,
    type: "single",
    icon: "seed",
    prompt: "How would you rate your gardening experience?",
    options: opts("experience"),
  },
  {
    id: "watering",
    order: 5,
    type: "single",
    icon: "droplet",
    prompt: "How consistent can you be with watering?",
    options: opts("watering"),
  },
  {
    id: "goal",
    order: 6,
    type: "single",
    icon: "leaf",
    prompt: "How interested are you in growing your own herbs and plants regularly?",
    options: opts("goal"),
  },
  {
    id: "budget",
    order: 7,
    type: "single",
    icon: "wallet",
    prompt: "How much are you willing to invest in getting set up properly?",
    options: opts("budget"),
  },
];
