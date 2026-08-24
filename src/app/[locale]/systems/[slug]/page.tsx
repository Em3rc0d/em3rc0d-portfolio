import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {AutoPulseCase} from "@/components/systems/autopulse/autopulse-case";
import {CvEngineCase} from "@/components/systems/cv-engine/cv-engine-case";
import {SupportingCase} from "@/components/systems/supporting-case";
import {
  getLocalizedAutoPulseCase,
  getLocalizedCvEngineCase,
  getLocalizedEvidenceRecords,
  getLocalizedPublicSystems,
  getLocalizedSupportingCase,
  getLocalizedSystemBySlug,
} from "@/content/localized";
import {getPathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";
import {absoluteSiteUrl} from "@/lib/site-config";
import "../../../visual-acceptance-v2b.css";
import "../../../visual-acceptance-v2c.css";
import "../../../visual-acceptance-v2e.css";

interface SystemPageProps {
  params: Promise<{locale: string; slug: string}>;
}

export function generateStaticParams({params}: {params: {locale: string}}) {
  if (!hasLocale(routing.locales, params.locale)) return [];
  return getLocalizedPublicSystems(params.locale).map((system) => ({slug: system.slug}));
}

export async function generateMetadata({params}: SystemPageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const system = getLocalizedSystemBySlug(slug, locale);
  if (!system) return {};

  const title = `${system.name} — ${system.label}`;
  const routePath = `/systems/${system.slug}`;
  const publicPath = getPathname({locale, href: routePath});
  const canonicalUrl = absoluteSiteUrl(publicPath);
  const socialImage = absoluteSiteUrl("/opengraph-image");
  const imageAlt = locale === "es"
    ? `${system.name} — caso de sistema de software de Eduardo Merino`
    : `${system.name} — Eduardo Merino software system case study`;

  return {
    title,
    description: system.summary,
    alternates: bilingualAlternates(routePath, locale),
    openGraph: {
      type: "article",
      siteName: "THE BUILD ROOM",
      title,
      description: system.summary,
      ...(canonicalUrl ? {url: canonicalUrl} : {}),
      ...(socialImage ? {images: [{url: socialImage, width: 1200, height: 630, alt: imageAlt}]} : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: system.summary,
      ...(socialImage ? {images: [socialImage]} : {}),
    },
  };
}

export default async function SystemPage({params}: SystemPageProps) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const system = getLocalizedSystemBySlug(slug, locale);
  if (!system || !system.href) notFound();

  if (system.slug === "autopulse") {
    return <AutoPulseCase locale={locale} autopulseCase={getLocalizedAutoPulseCase(locale)} />;
  }
  if (system.slug === "cv-engine") {
    return <CvEngineCase locale={locale} cvEngineCase={getLocalizedCvEngineCase(locale)} />;
  }

  const supportingCase = getLocalizedSupportingCase(system.slug, locale);
  if (supportingCase) {
    const evidenceRecords = getLocalizedEvidenceRecords(locale);
    const evidence = supportingCase.evidenceIds
      .map((id) => evidenceRecords.find((candidate) => candidate.id === id))
      .filter((candidate) => candidate !== undefined);
    return <SupportingCase system={system} record={supportingCase} locale={locale} evidence={evidence} />;
  }

  notFound();
}
