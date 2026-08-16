import type { MetadataRoute } from "next";
import { publicEvidenceRecords } from "@/content/evidence-index";
import { publicNotes } from "@/content/notes";
import { systems } from "@/content/systems";
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

  // CI / local builds are allowed to omit the public origin. We do not publish
  // invented canonical URLs. The public launch gate requires this to be configured.
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

  return [...staticRoutes, ...systemRoutes, ...evidenceRoutes, ...noteRoutes].map(
    (route) => ({ url: new URL(route, origin).toString() }),
  );
}
