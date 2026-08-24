import Link from "next/link";
import type { NoteRecord } from "@/lib/content/types";
import {
  localizedHref,
  noteStateLabel,
  noteTerritoryLabel,
  type Locale,
} from "@/lib/i18n";

const copy = {
  en: {
    back: "← ENGINEERING NOTEBOOK",
    state: "STATE",
    territory: "TERRITORY",
    system: "SYSTEM",
    fieldNote: "FIELD NOTE",
    currentQuestion: "CURRENT QUESTION / LIMIT",
    claimCeiling: "CLAIM CEILING",
    relatedSystem: "RELATED SYSTEM",
    relatedEvidence: "RELATED EVIDENCE",
    portfolioRecord: "Portfolio system record",
    allNotes: "All notes →",
  },
  es: {
    back: "← CUADERNO DE INGENIERÍA",
    state: "ESTADO",
    territory: "TERRITORIO",
    system: "SISTEMA",
    fieldNote: "NOTA DE CAMPO",
    currentQuestion: "PREGUNTA ACTUAL / LÍMITE",
    claimCeiling: "LÍMITE DE LA AFIRMACIÓN",
    relatedSystem: "SISTEMA RELACIONADO",
    relatedEvidence: "EVIDENCIA RELACIONADA",
    portfolioRecord: "Registro del sistema en el portfolio",
    allNotes: "Todas las notas →",
  },
} as const;

export function NoteRecordView({ note, locale }: { note: NoteRecord; locale: Locale }) {
  const text = copy[locale];
  const state = noteStateLabel(note.state, locale);
  const territory = noteTerritoryLabel(note.territory, locale);

  return (
    <main className={note.state === "EXPLORING" ? "note-page is-exploring" : "note-page"}>
      <header className="note-topbar">
        <Link href={localizedHref("/notes", locale)}>{text.back}</Link>
        <span>{note.id} / {territory}</span>
      </header>

      <article className="note-sheet">
        <header className="note-heading">
          <div>
            <p>{note.id} / {state}</p>
            <h1>{note.title}</h1>
            <span>{note.thesis}</span>
          </div>
          <dl>
            <div><dt>{text.state}</dt><dd>{state}</dd></div>
            <div><dt>{text.territory}</dt><dd>{territory}</dd></div>
            <div><dt>{text.system}</dt><dd>{note.systemName ?? text.fieldNote}</dd></div>
          </dl>
        </header>

        <div className="note-sections">
          {note.sections.map((section, index) => (
            <section key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{section.heading}</h2><p>{section.body}</p></div>
            </section>
          ))}
        </div>

        {note.currentBoundary ? (
          <section className="note-boundary">
            <p>{note.state === "EXPLORING" ? text.currentQuestion : text.claimCeiling}</p>
            <h2>{note.currentBoundary}</h2>
          </section>
        ) : null}

        <footer className="note-relations">
          <div>
            <p>{text.relatedSystem}</p>
            {note.systemHref ? <Link href={note.systemHref}>{note.systemName} →</Link> : <span>—</span>}
          </div>
          <div>
            <p>{text.relatedEvidence}</p>
            <div>
              {note.relatedEvidenceIds.length ? note.relatedEvidenceIds.map((id) => (
                <Link key={id} href={localizedHref(`/evidence/${id.toLowerCase()}`, locale)}>{id}</Link>
              )) : <span>{text.portfolioRecord}</span>}
            </div>
          </div>
          <Link className="note-next-link" href={localizedHref("/notes", locale)}>{text.allNotes}</Link>
        </footer>
      </article>
    </main>
  );
}
