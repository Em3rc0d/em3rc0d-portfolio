import type { MetadataRoute } from "next";
import { publicEvidenceRecords } from "@/content/evidence-index";
import { publicNotes } from "@/content/notes";
import { systemCases } from "@/content/systems";
import { getSiteOrigin } from "@/lib/site-config";
import { languageAlternates, localePath, locales } from "@/i18n/config";

const staticRoutes = ["/", "/systems", "/evidence", "/notes", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];

  const systemRoutes = systemCases
    .filter((system) => system.publicability !== "PRIVATE")
    .map((system) => `/systems/${system.slug}`);
  const evidenceRoutes = publicEvidenceRecords.map((record) => `/evidence/${record.slug}`);
  const noteRoutes = publicNotes.map((note) => `/notes/${note.slug}`);
  const canonicalRoutes = [...staticRoutes, ...systemRoutes, ...evidenceRoutes, ...noteRoutes];

  return canonicalRoutes.flatMap((route) => {
    const alternatePaths = languageAlternates(route);
    const languages = Object.fromEntries(
      Object.entries(alternatePaths).map(([key, path]) => [key, new URL(path, origin).toString()]),
    );
    return locales.map((locale) => ({
      url: new URL(localePath(locale, route), origin).toString(),
      alternates: { languages },
    }));
  });
}
