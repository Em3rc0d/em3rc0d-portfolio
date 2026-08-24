import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/contact-page";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import { absoluteSiteUrl } from "@/lib/site-config";
import "../../visual-acceptance-v2b.css";

const description =
  "Inicia una conversación con Eduardo Merino sobre construir software a medida, recuperar un producto existente, mejorar un flujo o añadir IA aplicada.";
const canonicalUrl = absoluteSiteUrl("/es/contact");
const socialImage = absoluteSiteUrl("/opengraph-image");

export const metadata: Metadata = {
  title: "Contacto — Construir, Recuperar o Mejorar Software",
  description,
  alternates: bilingualAlternates("/contact", "es"),
  openGraph: {
    type: "website",
    siteName: "THE BUILD ROOM",
    locale: "es_PE",
    title: "Inicia una conversación de software con Eduardo Merino",
    description,
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
    ...(socialImage ? { images: [{ url: socialImage, width: 1200, height: 630, alt: "Eduardo Merino — THE BUILD ROOM" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Inicia una conversación de software con Eduardo Merino",
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export default function SpanishContactPage() {
  return <ContactPageView locale="es" />;
}
