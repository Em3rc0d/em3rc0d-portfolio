"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { NoteRecord, NoteState } from "@/lib/content/types";
import {
  localeFromPathname,
  localizedHref,
  noteStateLabel,
  noteTerritoryLabel,
} from "@/lib/i18n";

const FILTERS: readonly ("ALL" | NoteState)[] = ["ALL", "BUILT_VERIFIED", "EXPLORING"];

const ui = {
  en: {
    kicker: "PUBLIC ENGINEERING NOTEBOOK",
    title: "Small records of how I think while building.",
    intro: "Shorter than a case study. More focused than a project update. Each note keeps one engineering idea, boundary, or question inspectable.",
    builtBody: "Grounded in current system or evidence work.",
    exploringBody: "A question or boundary that is still being worked through.",
    filterAria: "Filter notebook records by state",
    all: "ALL",
    fieldNote: "FIELD NOTE",
  },
  es: {
    kicker: "CUADERNO PÚBLICO DE INGENIERÍA",
    title: "Pequeños registros de cómo pienso mientras construyo.",
    intro: "Más cortos que un caso de estudio. Más enfocados que una actualización de proyecto. Cada nota mantiene inspeccionable una idea, un límite o una pregunta de ingeniería.",
    builtBody: "Basado en trabajo actual del sistema o su evidencia.",
    exploringBody: "Una pregunta o límite que todavía se está trabajando.",
    filterAria: "Filtrar registros del cuaderno por estado",
    all: "TODAS",
    fieldNote: "NOTA DE CAMPO",
  },
} as const;

export function NotesIndex({ notes }: { notes: readonly NoteRecord[] }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const text = ui[locale];
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const visibleNotes = useMemo(
    () => (filter === "ALL" ? notes : notes.filter((note) => note.state === filter)),
    [filter, notes],
  );

  const builtCount = notes.filter((note) => note.state === "BUILT_VERIFIED").length;
  const exploringCount = notes.filter((note) => note.state === "EXPLORING").length;

  return (
    <section className="notes-index-body notes-index-body-v2">
      <header className="notes-index-intro notes-index-intro-v2">
        <div className="notes-index-titleblock">
          <p className="public-kicker">{text.kicker}</p>
          <h1>{text.title}</h1>
          <p>{text.intro}</p>
        </div>

        <div className="notes-index-dashboard">
          <div><strong>{String(builtCount).padStart(2, "0")}</strong><span>{noteStateLabel("BUILT_VERIFIED", locale)}</span></div>
          <div><strong>{String(exploringCount).padStart(2, "0")}</strong><span>{noteStateLabel("EXPLORING", locale)}</span></div>
        </div>

        <div className="notes-index-contract notes-index-contract-v2">
          <span><b>{noteStateLabel("BUILT_VERIFIED", locale)}</b><small>{text.builtBody}</small></span>
          <span><b>{noteStateLabel("EXPLORING", locale)}</b><small>{text.exploringBody}</small></span>
        </div>
      </header>

      <div className="notes-filter notes-filter-v2" aria-label={text.filterAria}>
        {FILTERS.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
          >
            {option === "ALL" ? `${text.all} / ${visibleNotes.length}` : noteStateLabel(option, locale)}
          </button>
        ))}
      </div>

      <div className="notes-grid-v2">
        {visibleNotes.map((note) => (
          <Link
            key={note.id}
            href={localizedHref(`/notes/${note.slug}`, locale)}
            className={note.state === "EXPLORING" ? "note-card-v2 is-exploring" : "note-card-v2"}
          >
            <header>
              <span>{note.id}</span>
              <span>{noteTerritoryLabel(note.territory, locale)}</span>
              <strong>{noteStateLabel(note.state, locale)}</strong>
            </header>
            <div><h2>{note.title}</h2><p>{note.thesis}</p></div>
            <footer><span>{note.systemName ?? text.fieldNote}</span></footer>
          </Link>
        ))}
      </div>
    </section>
  );
}
