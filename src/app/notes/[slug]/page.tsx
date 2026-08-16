import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findNoteBySlug, publicNotes } from "@/content/notes";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

function stateLabel(state: "BUILT_VERIFIED" | "EXPLORING") {
  return state === "BUILT_VERIFIED" ? "BUILT / VERIFIED" : "EXPLORING";
}

export function generateStaticParams() {
  return publicNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = findNoteBySlug(slug);
  if (!note) return {};
  return { title: note.title, description: note.thesis };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = findNoteBySlug(slug);
  if (!note) notFound();

  return (
    <main className={note.state === "EXPLORING" ? "note-page is-exploring" : "note-page"}>
      <header className="note-topbar">
        <Link href="/notes">← ENGINEERING NOTEBOOK</Link>
        <span>{note.id} / {note.territory}</span>
      </header>

      <article className="note-sheet">
        <header className="note-heading">
          <div>
            <p>{note.id} / {stateLabel(note.state)}</p>
            <h1>{note.title}</h1>
            <span>{note.thesis}</span>
          </div>
          <dl>
            <div><dt>STATE</dt><dd>{stateLabel(note.state)}</dd></div>
            <div><dt>TERRITORY</dt><dd>{note.territory}</dd></div>
            <div><dt>SYSTEM</dt><dd>{note.systemName ?? "FIELD NOTE"}</dd></div>
          </dl>
        </header>

        <div className="note-sections">
          {note.sections.map((section, index) => (
            <section key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </div>

        {note.currentBoundary ? (
          <section className="note-boundary">
            <p>{note.state === "EXPLORING" ? "CURRENT QUESTION / LIMIT" : "CLAIM CEILING"}</p>
            <h2>{note.currentBoundary}</h2>
          </section>
        ) : null}

        <footer className="note-relations">
          <div>
            <p>RELATED SYSTEM</p>
            {note.systemHref ? <Link href={note.systemHref}>{note.systemName} →</Link> : <span>—</span>}
          </div>
          <div>
            <p>RELATED EVIDENCE</p>
            <div>
              {note.relatedEvidenceIds.length ? note.relatedEvidenceIds.map((id) => (
                <Link key={id} href={`/evidence/${id.toLowerCase()}`}>{id}</Link>
              )) : <span>Portfolio system record</span>}
            </div>
          </div>
          <Link className="note-next-link" href="/notes">All notes →</Link>
        </footer>
      </article>
    </main>
  );
}
