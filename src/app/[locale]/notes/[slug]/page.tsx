import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {LanguageToggle} from "@/components/i18n/language-toggle";
import {NoteRecordView} from "@/components/notes/note-record";
import {findLocalizedNoteBySlug, getLocalizedNotes} from "@/content/localized";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";

interface NotePageProps {
  params: Promise<{locale: string; slug: string}>;
}

export function generateStaticParams({params}: {params: {locale: string}}) {
  if (!hasLocale(routing.locales, params.locale)) return [];
  return getLocalizedNotes(params.locale).map((note) => ({slug: note.slug}));
}

export async function generateMetadata({params}: NotePageProps): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const note = findLocalizedNoteBySlug(slug, locale);
  if (!note) return {};
  return {
    title: note.title,
    description: note.thesis,
    alternates: bilingualAlternates(`/notes/${note.slug}`, locale),
  };
}

export default async function NotePage({params}: NotePageProps) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const note = findLocalizedNoteBySlug(slug, locale);
  if (!note) notFound();
  const pathname = `/notes/${note.slug}`;

  return (
    <>
      <LanguageToggle locale={locale} pathname={pathname} className="dossier-language-switch" />
      <NoteRecordView note={note} locale={locale} />
    </>
  );
}
