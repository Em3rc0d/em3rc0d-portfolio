import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteRecordView } from "@/components/notes/note-record";
import { findLocalizedNoteBySlug, getLocalizedNotes } from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getLocalizedNotes("en").map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = findLocalizedNoteBySlug(slug, "en");
  if (!note) return {};
  return {
    title: note.title,
    description: note.thesis,
    alternates: bilingualAlternates(`/notes/${note.slug}`, "en"),
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = findLocalizedNoteBySlug(slug, "en");
  if (!note) notFound();
  return <NoteRecordView note={note} locale="en" />;
}
