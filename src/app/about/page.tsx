import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "./visual-acceptance.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Eduardo Merino — Software Developer working across systems, full stack products, and applied AI with an evidence-first engineering process.",
  alternates: bilingualAlternates("/about", "en"),
};

export default function AboutPage() {
  return <AboutPageView locale="en" />;
}
