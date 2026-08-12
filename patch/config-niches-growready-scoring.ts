import type { ScoringConfig } from "@/lib/types";

export const SCORING: ScoringConfig = {
  maxRawScore: 21,
  profiles: [
    {
      id: "low",
      label: "Just Starting Out",
      minScore: 0,
      maxScore: 40,
      headline: "You're early in your growing journey — and that's a great place to start.",
      description: "A simple, well-matched starter setup will make the biggest difference for you.",
    },
    {
      id: "medium",
      label: "Ready to Grow",
      minScore: 41,
      maxScore: 70,
      headline: "You've got a solid foundation to build on.",
      description: "A few upgrades to your setup will noticeably improve your results.",
    },
    {
      id: "high",
      label: "Well Set Up",
      minScore: 71,
      maxScore: 100,
      headline: "Your space and habits are well suited to growing at home.",
      description: "You're in a great position to expand what you grow and go deeper.",
    },
  ],
  dimensions: [
    { id: "sunlight", label: "Sunlight", shortLabel: "Light", strengthThreshold: 2 },
    { id: "space", label: "Growing space", shortLabel: "Space", strengthThreshold: 2 },
    { id: "time", label: "Time available", shortLabel: "Time", strengthThreshold: 2 },
    { id: "experience", label: "Experience", shortLabel: "Skill", strengthThreshold: 2 },
    { id: "watering", label: "Watering consistency", shortLabel: "Water", strengthThreshold: 2 },
    { id: "goal", label: "Motivation", shortLabel: "Drive", strengthThreshold: 2 },
    { id: "budget", label: "Budget", shortLabel: "Budget", strengthThreshold: 2 },
  ],
};
