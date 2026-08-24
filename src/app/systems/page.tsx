import type { Metadata } from "next";
import { SystemsIndex } from "@/components/systems/systems-index";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "../visual-acceptance-v2.css";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Inspectable software systems built by Eduardo Merino across personal building, professional infrastructure work, full-stack delivery, and current R&D.",
  alternates: bilingualAlternates("/systems", "en"),
};

export default function SystemsPage() {
  return <SystemsIndex locale="en" />;
}
