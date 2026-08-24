import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutoPulseCase } from "@/components/systems/autopulse/autopulse-case";
import { CvEngineCase } from "@/components/systems/cv-engine/cv-engine-case";
import { SupportingCase } from "@/components/systems/supporting-case";
import {
  getLocalizedPublicSystems,
  getLocalizedSupportingCase,
  getLocalizedSystemBySlug,
} from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import { absoluteSiteUrl } from "@/lib/site-config";
import "../../visual-acceptance-v2b.css";
import "../../visual-acceptance-v2c.css";
import "../../visual-acceptance-v2e.css";

interface SystemPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getLocalizedPublicSystems("en").map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getLocalizedSystemBySlug(slug, "en");
  if (!system) return {};

  const title = `${system.name} — ${system.label}`;
  const routePath = `/systems/${system.slug}`;
  const canonicalUrl = absoluteSiteUrl(routePath);
  const socialImage = absoluteSiteUrl("/opengraph-image");
  const imageAlt = `${system.name} — Eduardo Merino software system case study`;

  return {
    title,
    description: system.summary,
    alternates: bilingualAlternates(routePath, "en"),
    openGraph: {
      type: "article",
      siteName: "THE BUILD ROOM",
      title,
      description: system.summary,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(socialImage ? { images: [{ url: socialImage, width: 1200, height: 630, alt: imageAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: system.summary,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export default async function SystemPage({ params }: SystemPageProps) {
  const { slug } = await params;
  const system = getLocalizedSystemBySlug(slug, "en");
  if (!system || !system.href) notFound();

  if (system.slug === "autopulse") return <AutoPulseCase />;
  if (system.slug === "cv-engine") return <CvEngineCase />;

  const supportingCase = getLocalizedSupportingCase(system.slug, "en");
  if (supportingCase) return <SupportingCase system={system} record={supportingCase} />;

  notFound();
}
