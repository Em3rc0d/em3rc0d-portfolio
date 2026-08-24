import type { Metadata } from "next";
import { SystemsIndex } from "@/components/systems/systems-index";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "../../visual-acceptance-v2.css";

export const metadata: Metadata = {
  title: "Sistemas",
  description:
    "Sistemas de software inspeccionables construidos por Eduardo Merino en trabajo personal, infraestructura profesional, entrega full stack e I+D actual.",
  alternates: bilingualAlternates("/systems", "es"),
};

export default function SpanishSystemsPage() {
  return <SystemsIndex locale="es" />;
}
