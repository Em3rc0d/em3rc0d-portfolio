import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { NoteRecordView } from "@/components/notes/note-record";
import { findLocalizedNoteBySlug, getLocalizedNotes } from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getLocalizedNotes("es").map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = findLocalizedNoteBySlug(slug, "es");
  if (!note) return {};
  return {
    title: note.title,
    description: note.thesis,
    alternates: bilingualAlternates(`/notes/${note.slug}`, "es"),
  };
}

export default async function SpanishNotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = findLocalizedNoteBySlug(slug, "es");
  if (!note) notFound();
  const pathname = `/es/notes/${note.slug}`;

  return (
    <>
      <LanguageToggle locale="es" pathname={pathname} className="dossier-language-switch" />
      <NoteRecordView note={note} locale="es" />
    </>
  );
}
