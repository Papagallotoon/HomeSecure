import type { ScoringConfig } from "@/lib/types";

export const SCORING: ScoringConfig = {
  // 7 questions x 3 max points each.
  maxRawScore: 21,
  profiles: [
    {
      id: "low",
      label: "Low Preparedness",
      minScore: 0,
      maxScore: 40,
      headline: "Your home is not well prepared for a 72-hour emergency.",
      description:
        "You're missing several essentials most emergency-preparedness guides recommend. A few targeted additions would meaningfully change your odds in a real disruption.",
    },
    {
      id: "medium",
      label: "Medium Preparedness",
      minScore: 41,
      maxScore: 70,
      headline: "Your home is moderately prepared.",
      description:
        "You've covered some of the basics, but a few gaps could turn a manageable disruption into a stressful one. Closing them is straightforward.",
    },
    {
      id: "high",
      label: "High Preparedness",
      minScore: 71,
      maxScore: 100,
      headline: "Your home is well prepared for a 72-hour emergency.",
      description:
        "You've covered most of the essentials. A few upgrades would take you from well-prepared to fully self-sufficient for the first critical days.",
    },
  ],
  dimensions: [
    { id: "backup_power", label: "Backup power & lighting", strengthThreshold: 2 },
    { id: "first_aid", label: "First aid supplies", strengthThreshold: 2 },
    { id: "water_storage", label: "Water storage", strengthThreshold: 2 },
    { id: "food_supplies", label: "Food supplies", strengthThreshold: 2 },
    { id: "communication", label: "Communication plan", strengthThreshold: 2 },
    { id: "home_security", label: "Home security", strengthThreshold: 2 },
    { id: "emergency_plan", label: "Written emergency plan", strengthThreshold: 2 },
  ],
};
