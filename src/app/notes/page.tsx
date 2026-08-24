import type { Metadata } from "next";
import { NotesIndex } from "@/components/notes/notes-index";
import { SiteHeader } from "@/components/shell/site-header";
import { getLocalizedNotes } from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "../visual-acceptance-v2d.css";

export const metadata: Metadata = {
  title: "Engineering Notebook",
  description:
    "Short public engineering records from Eduardo Merino: systems thinking, recovery, evidence, applied AI, and current exploration boundaries.",
  alternates: bilingualAlternates("/notes", "en"),
};

export default function NotesPage() {
  return (
    <main className="notes-page">
      <div className="public-carbon-header"><SiteHeader /></div>
      <NotesIndex notes={getLocalizedNotes("en")} />
    </main>
  );
}
