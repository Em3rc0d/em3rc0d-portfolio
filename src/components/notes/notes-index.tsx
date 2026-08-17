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

  return (
    <section className="notes-index-body">
      <header className="notes-index-intro">
        <div>
          <p className="public-kicker">PUBLIC ENGINEERING NOTEBOOK</p>
          <h1>Small records of how I think while building.</h1>
        </div>
        <div className="notes-index-contract">
          <p>
            Notes are shorter than case studies. The standard is not lower: each record
            says whether it comes from built/verified work or from an open line of
            exploration.
          </p>
          <div>
            <span>BUILT / VERIFIED</span><small>grounded in current system/evidence work</small>
            <span>EXPLORING</span><small>question or boundary still being worked through</small>
          </div>
        </div>
      </header>

      <div className="notes-filter" aria-label="Filter notebook records by state">
        {FILTERS.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
          >
            {option === "ALL" ? "ALL" : stateLabel(option)}
          </button>
        ))}
      </div>

      <div className="notes-ledger">
        {visibleNotes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.slug}`}
            className={note.state === "EXPLORING" ? "note-row is-exploring" : "note-row"}
          >
            <span className="note-row-id">{note.id}</span>
            <div className="note-row-main">
              <p>{note.territory}</p>
              <h2>{note.title}</h2>
              <span>{note.thesis}</span>
            </div>
            <div className="note-row-state">
              <strong>{stateLabel(note.state)}</strong>
              <span>{note.systemName ?? "FIELD NOTE"}</span>
            </div>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
