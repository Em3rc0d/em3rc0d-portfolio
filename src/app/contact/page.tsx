import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/contact-page";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import { absoluteSiteUrl } from "@/lib/site-config";
import "../visual-acceptance-v2b.css";

const description =
  "Start a conversation with Eduardo Merino about building custom software, recovering an existing product, improving a workflow, or adding applied AI.";
const canonicalUrl = absoluteSiteUrl("/contact");
const socialImage = absoluteSiteUrl("/opengraph-image");

export const metadata: Metadata = {
  title: "Contact — Build, Recover or Improve Software",
  description,
  alternates: bilingualAlternates("/contact", "en"),
  openGraph: {
    type: "website",
    siteName: "THE BUILD ROOM",
    title: "Start a software conversation with Eduardo Merino",
    description,
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
    ...(socialImage ? { images: [{ url: socialImage, width: 1200, height: 630, alt: "Eduardo Merino — THE BUILD ROOM" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a software conversation with Eduardo Merino",
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export default function ContactPage() {
  return <ContactPageView locale="en" />;
}
