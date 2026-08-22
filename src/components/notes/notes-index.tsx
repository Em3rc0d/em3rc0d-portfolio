"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { NoteRecord, NoteState } from "@/lib/content/types";

const FILTERS: readonly ("ALL" | NoteState)[] = ["ALL", "BUILT_VERIFIED", "EXPLORING"];

function stateLabel(state: NoteState) {
  return state === "BUILT_VERIFIED" ? "BUILT / VERIFIED" : "EXPLORING";
}

export function NotesIndex({ notes }: { notes: readonly NoteRecord[] }) {
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
          <p className="public-kicker">PUBLIC ENGINEERING NOTEBOOK</p>
          <h1>Small records of how I think while building.</h1>
          <p>
            Shorter than a case study. More focused than a project update. Each note keeps
            one engineering idea, boundary, or question inspectable.
          </p>
        </div>

        <div className="notes-index-dashboard">
          <div><strong>{String(builtCount).padStart(2, "0")}</strong><span>BUILT / VERIFIED</span></div>
          <div><strong>{String(exploringCount).padStart(2, "0")}</strong><span>EXPLORING</span></div>
        </div>

        <div className="notes-index-contract notes-index-contract-v2">
          <span><b>BUILT / VERIFIED</b><small>Grounded in current system or evidence work.</small></span>
          <span><b>EXPLORING</b><small>A question or boundary that is still being worked through.</small></span>
        </div>
      </header>

      <div className="notes-filter notes-filter-v2" aria-label="Filter notebook records by state">
        {FILTERS.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
          >
            {option === "ALL" ? `ALL / ${visibleNotes.length}` : stateLabel(option)}
          </button>
        ))}
      </div>

      <div className="notes-grid-v2">
        {visibleNotes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.slug}`}
            className={note.state === "EXPLORING" ? "note-card-v2 is-exploring" : "note-card-v2"}
          >
            <header>
              <span>{note.id}</span>
              <span>{note.territory}</span>
              <strong>{stateLabel(note.state)}</strong>
            </header>
            <div>
              <h2>{note.title}</h2>
              <p>{note.thesis}</p>
            </div>
            <footer>
              <span>{note.systemName ?? "FIELD NOTE"}</span>
              <b aria-hidden="true">Inspect note ↗</b>
            </footer>
          </Link>
        ))}
      </div>
    </section>
  );
}
