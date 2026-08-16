import type { Metadata } from "next";
import { Assessment } from "@/components/assessment/Assessment";

export const metadata: Metadata = {
  title: "Home security index — Home-Secure",
  description:
    "Seven questions, a 0–100 index scored against 41,200 homes, and the three fixes that move it most per dollar.",
};

export default function AssessmentPage() {
  return <Assessment />;
}
