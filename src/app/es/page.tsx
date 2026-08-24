import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { bilingualAlternates } from "@/lib/i18n-metadata";

export const metadata: Metadata = {
  title: "Sistemas de Software e IA Aplicada",
  description:
    "Desarrollador de software que convierte problemas operativos complejos en sistemas funcionales, productos full stack e IA aplicada con evidencia inspeccionable.",
  alternates: bilingualAlternates("/", "es"),
};

export default function SpanishHome() {
  return <HomePage locale="es" />;
}
