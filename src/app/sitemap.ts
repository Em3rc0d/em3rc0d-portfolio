import type {MetadataRoute} from "next";
import {publicEvidenceRecords} from "@/content/evidence-index";
import {publicNotes} from "@/content/notes";
import {systems} from "@/content/systems";
import {getPathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {getSiteOrigin} from "@/lib/site-config";

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
  const routes = [...staticRoutes, ...systemRoutes, ...evidenceRoutes, ...noteRoutes];

  return routing.locales.flatMap((locale) =>
    routes.map((href) => ({
      url: new URL(getPathname({locale, href}), origin).toString(),
    })),
  );
}
