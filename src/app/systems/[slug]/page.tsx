import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutoPulseCase } from "@/components/systems/autopulse/autopulse-case";
import { CvEngineCase } from "@/components/systems/cv-engine/cv-engine-case";
import { SupportingCase } from "@/components/systems/supporting-case";
import { findSupportingCase } from "@/content/supporting-cases";
import { systems } from "@/content/systems";
import { absoluteSiteUrl } from "@/lib/site-config";

interface SystemPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return systems
    .filter((system) => system.href && system.publicability !== "PRIVATE")
    .map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: SystemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = systems.find(
    (candidate) => candidate.slug === slug && candidate.publicability !== "PRIVATE",
  );

  if (!system) return {};

  const title = `${system.name} — ${system.label}`;
  const routePath = `/systems/${system.slug}`;
  const canonicalUrl = absoluteSiteUrl(routePath);
  const socialImage = absoluteSiteUrl("/opengraph-image");
  const imageAlt = `${system.name} — Eduardo Merino software system case study`;

  return {
    title,
    description: system.summary,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      type: "article",
      siteName: "THE BUILD ROOM",
      title,
      description: system.summary,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(socialImage
        ? {
            images: [
              {
                url: socialImage,
                width: 1200,
                height: 630,
                alt: imageAlt,
              },
            ],
          }
        : {}),
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
  const system = systems.find(
    (candidate) => candidate.slug === slug && candidate.publicability !== "PRIVATE",
  );

  if (!system || !system.href) {
    notFound();
  }

  if (system.slug === "autopulse") {
    return <AutoPulseCase />;
  }

  if (system.slug === "cv-engine") {
    return <CvEngineCase />;
  }

  const supportingCase = findSupportingCase(system.slug);
  if (supportingCase) {
    return <SupportingCase system={system} record={supportingCase} />;
  }

  notFound();
}
