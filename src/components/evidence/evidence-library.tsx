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

  const allGroups = useMemo(() => {
    const groups = new Map<string, EvidenceRecord[]>();
    for (const record of records) {
      const current = groups.get(record.systemName) ?? [];
      current.push(record);
      groups.set(record.systemName, current);
    }
    return Array.from(groups.entries());
  }, [records]);

  const visibleGroups = useMemo(() => {
    const groups = new Map<string, EvidenceRecord[]>();
    for (const record of visibleRecords) {
      const current = groups.get(record.systemName) ?? [];
      current.push(record);
      groups.set(record.systemName, current);
    }
    return Array.from(groups.entries());
  }, [visibleRecords]);

  return (
    <section className="evidence-library-body" aria-labelledby="evidence-library-heading">
      <header className="evidence-library-intro evidence-library-intro-v2">
        <div className="evidence-library-titleblock">
          <p className="evidence-kicker">PROOF LIBRARY / PUBLIC</p>
          <h1 id="evidence-library-heading">See what backs the work.</h1>
          <p className="evidence-library-thesis">
            The case explains the system. The evidence record shows what makes a specific
            claim defensible — and where that proof stops.
          </p>
        </div>

        <div className="evidence-library-dashboard">
          <div className="evidence-library-total">
            <strong>{String(records.length).padStart(2, "0")}</strong>
            <span>public evidence records</span>
          </div>
          <div className="evidence-library-system-counts" aria-label="Evidence records by system">
            {allGroups.map(([systemName, systemRecords], index) => (
              <div key={systemName}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{systemName}</strong>
                <em>{String(systemRecords.length).padStart(2, "0")}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="evidence-reading-contract" aria-label="How to read an evidence record">
          <span><b>01</b><strong>CLAIM</strong><em>What this record says the system does.</em></span>
          <span><b>02</b><strong>PROOF</strong><em>Source, test, product, or professional material.</em></span>
          <span><b>03</b><strong>LIMIT</strong><em>What the available evidence does not authorize.</em></span>
        </div>
      </header>

      <div className="evidence-library-controls">
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
          <p>{activeFilter === "ALL" ? "records shown" : `${filterLabel(activeFilter)} records`}</p>
        </div>
      </div>

      <div className="evidence-system-groups">
        {visibleGroups.map(([systemName, systemRecords], groupIndex) => (
          <section className="evidence-system-group" key={systemName} aria-labelledby={`evidence-system-${groupIndex}`}>
            <header>
              <span>{String(groupIndex + 1).padStart(2, "0")}</span>
              <h2 id={`evidence-system-${groupIndex}`}>{systemName}</h2>
              <strong>{String(systemRecords.length).padStart(2, "0")} records</strong>
            </header>

            <div className="evidence-record-list evidence-record-list-v2">
              {systemRecords.map((record) => (
                <Link
                  key={record.id}
                  href={`/evidence/${record.slug}`}
                  className="evidence-record-row evidence-record-row-v2"
                >
                  <span className="evidence-record-id">{record.id}</span>
                  <div className="evidence-record-main">
                    <p>{record.type.toLowerCase()}</p>
                    <h3>{record.title}</h3>
                    <span>{record.claim}</span>
                  </div>
                  <div className="evidence-record-state">
                    <strong>{record.state.replaceAll("_", " ")}</strong>
                    <small>{record.publicability.toLowerCase()}</small>
                  </div>
                  <span className="evidence-record-open" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
