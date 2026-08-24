import type { MetadataRoute } from "next";
import { publicEvidenceRecords } from "@/content/evidence-index";
import { publicNotes } from "@/content/notes";
import { systems } from "@/content/systems";
import { localizedHref } from "@/lib/i18n";
import { getSiteOrigin } from "@/lib/site-config";

const staticRoutes = [
  "/",
  "/systems",
  "/evidence",
  "/notes",
  "/about",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin) return [];

  const systemRoutes = systems
    .filter(
      (system) =>
        Boolean(system.href) &&
        system.publicability !== "PRIVATE" &&
        system.role !== "RESERVED",
    )
    .map((system) => system.href as string);

  const evidenceRoutes = publicEvidenceRecords.map(
    (record) => `/evidence/${record.slug}`,
  );

  const noteRoutes = publicNotes.map((note) => `/notes/${note.slug}`);
  const englishRoutes = [...staticRoutes, ...systemRoutes, ...evidenceRoutes, ...noteRoutes];
  const spanishRoutes = englishRoutes.map((route) => localizedHref(route, "es"));

  return [...englishRoutes, ...spanishRoutes].map((route) => ({
    url: new URL(route, origin).toString(),
  }));
}
