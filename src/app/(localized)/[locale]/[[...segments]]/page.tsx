import { notFound } from "next/navigation";
import { publicEvidenceRecords } from "@/content/evidence-index";
import { pageMetadata } from "@/lib/metadata";
import { prefixedLocales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedNotes, findLocalizedNote } from "@/i18n/notes";
import { localizedSystemCases, findLocalizedSystem } from "@/i18n/systems";
import { LocalizedHome } from "@/i18n/pages/home";
import { LocalizedSystems, LocalizedSystem } from "@/i18n/pages/systems";
import { LocalizedNotes, LocalizedNote } from "@/i18n/pages/notes";
import { LocalizedEvidence, LocalizedEvidenceRecord } from "@/i18n/pages/evidence";
import { LocalizedAbout, LocalizedContact } from "@/i18n/pages/about-contact";
import { LocalizedResume } from "@/i18n/pages/resume";

type PrefixedLocale = (typeof prefixedLocales)[number];
type Props = { params: Promise<{ locale: string; segments?: string[] }> };

function validLocale(value: string): PrefixedLocale | null {
  return value === "es" || value === "pt" ? value : null;
}

export function generateStaticParams() {
  const routeSegments: string[][] = [
    [], ["systems"], ["notes"], ["about"], ["contact"], ["resume"], ["evidence"],
    ...localizedSystemCases("en").filter((system) => system.publicability !== "PRIVATE").map((system) => ["systems", system.slug]),
    ...localizedNotes("en").map((note) => ["notes", note.slug]),
    ...publicEvidenceRecords.map((record) => ["evidence", record.slug]),
  ];
  return prefixedLocales.flatMap((locale) => routeSegments.map((segments) => ({ locale, segments })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale: rawLocale, segments = [] } = await params;
  const locale = validLocale(rawLocale);
  if (!locale) return {};
  const t = getMessages(locale);
  const [section, slug, ...rest] = segments;
  if (rest.length) return {};

  if (!section) return pageMetadata("Eduardo Merino — Full Stack Developer & Applied AI", t.home.proposition, "/", "/opengraph-image", locale);
  if (section === "systems" && !slug) return pageMetadata(t.systems.title, t.systems.lead, "/systems", "/opengraph-image", locale);
  if (section === "systems" && slug) { const system = findLocalizedSystem(locale, slug); return system ? pageMetadata(system.name, system.summary, `/systems/${slug}`, `/systems/${slug}/opengraph-image`, locale) : {}; }
  if (section === "notes" && !slug) return pageMetadata(t.notes.eyebrow, t.notes.lead, "/notes", "/opengraph-image", locale);
  if (section === "notes" && slug) { const note = findLocalizedNote(locale, slug); return note ? pageMetadata(note.title, note.thesis, `/notes/${slug}`, "/opengraph-image", locale) : {}; }
  if (section === "evidence" && !slug) return pageMetadata(t.evidence.eyebrow, t.evidence.lead, "/evidence", "/opengraph-image", locale);
  if (section === "evidence" && slug) { const record = publicEvidenceRecords.find((item) => item.slug === slug); return record ? pageMetadata(record.id, record.claim, `/evidence/${slug}`, "/opengraph-image", locale) : {}; }
  if (section === "about" && !slug) return pageMetadata("Sobre Eduardo Merino", t.about.personal, "/about", "/opengraph-image", locale);
  if (section === "contact" && !slug) return pageMetadata(locale === "es" ? "Contacto" : "Contato", t.contact.opening, "/contact", "/opengraph-image", locale);
  if (section === "resume" && !slug) return pageMetadata(locale === "es" ? "Eduardo Merino — CV" : "Eduardo Merino — CV", "Software Engineer · Full Stack · Applied AI · Systems", "/resume", "/opengraph-image", locale);
  return {};
}

export default async function LocalizedRoute({ params }: Props) {
  const { locale: rawLocale, segments = [] } = await params;
  const locale = validLocale(rawLocale);
  if (!locale) notFound();
  const [section, slug, ...rest] = segments;
  if (rest.length) notFound();
  const localizedLocale: Locale = locale;

  if (!section) return <LocalizedHome locale={localizedLocale} />;
  if (section === "systems" && !slug) return <LocalizedSystems locale={localizedLocale} />;
  if (section === "systems" && slug) return <LocalizedSystem locale={localizedLocale} slug={slug} />;
  if (section === "notes" && !slug) return <LocalizedNotes locale={localizedLocale} />;
  if (section === "notes" && slug) return <LocalizedNote locale={localizedLocale} slug={slug} />;
  if (section === "evidence" && !slug) return <LocalizedEvidence locale={localizedLocale} />;
  if (section === "evidence" && slug) return <LocalizedEvidenceRecord locale={localizedLocale} slug={slug} />;
  if (section === "about" && !slug) return <LocalizedAbout locale={localizedLocale} />;
  if (section === "contact" && !slug) return <LocalizedContact locale={localizedLocale} />;
  if (section === "resume" && !slug) return <LocalizedResume locale={localizedLocale} />;
  notFound();
}
