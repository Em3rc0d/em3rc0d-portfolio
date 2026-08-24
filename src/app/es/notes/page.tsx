import type { Metadata } from "next";
import { NotesIndex } from "@/components/notes/notes-index";
import { SiteHeader } from "@/components/shell/site-header";
import { getLocalizedNotes } from "@/content/localized";
import { bilingualAlternates } from "@/lib/i18n-metadata";
import "../../visual-acceptance-v2d.css";

export const metadata: Metadata = {
  title: "Cuaderno de Ingeniería",
  description:
    "Registros públicos breves de ingeniería de Eduardo Merino: pensamiento de sistemas, recuperación, evidencia, IA aplicada y límites de exploración actuales.",
  alternates: bilingualAlternates("/notes", "es"),
};

export default function SpanishNotesPage() {
  return (
    <main className="notes-page">
      <div className="public-carbon-header"><SiteHeader /></div>
      <NotesIndex notes={getLocalizedNotes("es")} />
    </main>
  );
}
