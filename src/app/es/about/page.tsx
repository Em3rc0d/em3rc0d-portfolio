import type { Metadata } from "next";
import { AboutPageView } from "@/components/about/about-page";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "../../about/visual-acceptance.css";

export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "Acerca de Eduardo Merino — Desarrollador de Software que trabaja en sistemas, productos full stack e IA aplicada con un proceso de ingeniería basado en evidencia.",
  alternates: bilingualAlternates("/about", "es"),
};

export default function SpanishAboutPage() {
  return <AboutPageView locale="es" />;
}
