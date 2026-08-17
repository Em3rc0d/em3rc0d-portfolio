import { NotesIndex } from "@/components/notes/notes-index";
import { SiteHeader } from "@/components/shell/site-header";
import { publicNotes } from "@/content/notes";

export const metadata = {
  title: "Engineering Notebook",
  description:
    "Short public engineering records from Eduardo Merino: systems thinking, recovery, evidence, applied AI, and current exploration boundaries.",
};

export default function NotesPage() {
  return (
    <main className="notes-page">
      <div className="public-carbon-header">
        <SiteHeader />
      </div>
      <NotesIndex notes={publicNotes} />
    </main>
  );
}
