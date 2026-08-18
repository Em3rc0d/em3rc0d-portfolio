"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EvidenceRecord, EvidenceType } from "@/lib/content/types";

const FILTERS: readonly ("ALL" | EvidenceType)[] = [
  "ALL",
  "ARCHITECTURE",
  "IMPLEMENTATION",
  "RECOVERY",
  "MODEL",
  "PRODUCT",
  "TEST",
];

const filterLabel = (filter: (typeof FILTERS)[number]) =>
  filter === "ALL"
    ? "All evidence"
    : filter.charAt(0) + filter.slice(1).toLowerCase();

interface EvidenceLibraryProps {
  records: readonly EvidenceRecord[];
}

export function EvidenceLibrary({ records }: EvidenceLibraryProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const visibleRecords = useMemo(
    () =>
      activeFilter === "ALL"
        ? records
        : records.filter((record) => record.type === activeFilter),
    [activeFilter, records],
  );

  return (
    <section className="evidence-library-body" aria-labelledby="evidence-library-heading">
      <header className="evidence-library-intro">
        <div>
          <p className="evidence-kicker">PROOF LIBRARY / PUBLIC</p>
          <h1 id="evidence-library-heading">See what backs the work.</h1>
        </div>
        <div className="evidence-library-intro-copy">
          <p>
            Each record answers one practical question: what claim is being made,
            what supports it, and where the proof stops.
          </p>
          <details className="evidence-library-guide">
            <summary>How to read an evidence record</summary>
            <ol>
              <li><strong>What this proves</strong><span>The exact engineering claim.</span></li>
              <li><strong>What supports it</strong><span>Source, test, product or field material.</span></li>
              <li><strong>What it does not prove</strong><span>The limit that keeps the claim honest.</span></li>
            </ol>
          </details>
        </div>
      </header>

      <div className="evidence-filters" aria-label="Filter evidence by type">
        {FILTERS.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filterLabel(filter)}
          </button>
        ))}
      </div>

      <div className="evidence-library-count" aria-live="polite">
        <span>{String(visibleRecords.length).padStart(2, "0")}</span>
        <p>records shown</p>
      </div>

      <div className="evidence-record-list">
        {visibleRecords.map((record) => (
          <Link
            key={record.id}
            href={`/evidence/${record.slug}`}
            className="evidence-record-row"
          >
            <span className="evidence-record-id">{record.id}</span>
            <div className="evidence-record-main">
              <p>{record.systemName} · {record.type.toLowerCase()}</p>
              <h2>{record.title}</h2>
              <span>{record.claim}</span>
            </div>
            <div className="evidence-record-state">
              <span>Status</span>
              <strong>{record.state.replaceAll("_", " ")}</strong>
              <small>{record.publicability.toLowerCase()}</small>
            </div>
            <span className="evidence-record-open" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
