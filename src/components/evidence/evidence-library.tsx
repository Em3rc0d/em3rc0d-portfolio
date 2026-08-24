"use client";

import {useLocale} from "next-intl";
import {useMemo, useState} from "react";
import {Link} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";
import type {EvidenceRecord, EvidenceType} from "@/lib/content/types";
import {
  evidenceStateLabel,
  evidenceTypeLabel,
  publicabilityLabel,
} from "@/lib/i18n";

const FILTERS: readonly ("ALL" | EvidenceType)[] = [
  "ALL",
  "ARCHITECTURE",
  "IMPLEMENTATION",
  "RECOVERY",
  "MODEL",
  "PRODUCT",
  "TEST",
];

interface EvidenceLibraryProps {
  records: readonly EvidenceRecord[];
}

const ui = {
  en: {
    all: "All evidence",
    kicker: "PROOF LIBRARY / PUBLIC",
    title: "See what backs the work.",
    thesis: "The case explains the system. The evidence record shows what makes a specific claim defensible — and where that proof stops.",
    publicRecords: "public evidence records",
    bySystem: "Evidence records by system",
    reading: "How to read an evidence record",
    claim: "CLAIM",
    claimBody: "What this record says the system does.",
    proof: "PROOF",
    proofBody: "Source, test, product, or professional material.",
    limit: "LIMIT",
    limitBody: "What the available evidence does not authorize.",
    filterAria: "Filter evidence by type",
    shown: "records shown",
    records: "records",
  },
  es: {
    all: "Toda la evidencia",
    kicker: "BIBLIOTECA DE EVIDENCIA / PÚBLICA",
    title: "Mira qué respalda el trabajo.",
    thesis: "El caso explica el sistema. El registro de evidencia muestra qué hace defendible una afirmación específica — y dónde termina esa evidencia.",
    publicRecords: "registros públicos de evidencia",
    bySystem: "Registros de evidencia por sistema",
    reading: "Cómo leer un registro de evidencia",
    claim: "AFIRMACIÓN",
    claimBody: "Lo que este registro afirma que hace el sistema.",
    proof: "EVIDENCIA",
    proofBody: "Fuente, prueba, producto o material profesional.",
    limit: "LÍMITE",
    limitBody: "Lo que la evidencia disponible no autoriza a afirmar.",
    filterAria: "Filtrar evidencia por tipo",
    shown: "registros mostrados",
    records: "registros",
  },
} as const;

export function EvidenceLibrary({records}: EvidenceLibraryProps) {
  const locale = useLocale() as AppLocale;
  const text = ui[locale];
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("ALL");

  const filterLabel = (filter: (typeof FILTERS)[number]) =>
    filter === "ALL" ? text.all : evidenceTypeLabel(filter, locale);

  const visibleRecords = useMemo(
    () => activeFilter === "ALL" ? records : records.filter((record) => record.type === activeFilter),
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
          <p className="evidence-kicker">{text.kicker}</p>
          <h1 id="evidence-library-heading">{text.title}</h1>
          <p className="evidence-library-thesis">{text.thesis}</p>
        </div>

        <div className="evidence-library-dashboard">
          <div className="evidence-library-total">
            <strong>{String(records.length).padStart(2, "0")}</strong>
            <span>{text.publicRecords}</span>
          </div>
          <div className="evidence-library-system-counts" aria-label={text.bySystem}>
            {allGroups.map(([systemName, systemRecords], index) => (
              <div key={systemName}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{systemName}</strong>
                <em>{String(systemRecords.length).padStart(2, "0")}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="evidence-reading-contract" aria-label={text.reading}>
          <span><b>01</b><strong>{text.claim}</strong><em>{text.claimBody}</em></span>
          <span><b>02</b><strong>{text.proof}</strong><em>{text.proofBody}</em></span>
          <span><b>03</b><strong>{text.limit}</strong><em>{text.limitBody}</em></span>
        </div>
      </header>

      <div className="evidence-library-controls">
        <div className="evidence-filters" aria-label={text.filterAria}>
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
          <p>{activeFilter === "ALL" ? text.shown : `${filterLabel(activeFilter)} · ${text.records}`}</p>
        </div>
      </div>

      <div className="evidence-system-groups">
        {visibleGroups.map(([systemName, systemRecords], groupIndex) => (
          <section className="evidence-system-group" key={systemName} aria-labelledby={`evidence-system-${groupIndex}`}>
            <header>
              <span>{String(groupIndex + 1).padStart(2, "0")}</span>
              <h2 id={`evidence-system-${groupIndex}`}>{systemName}</h2>
              <strong>{String(systemRecords.length).padStart(2, "0")} {text.records}</strong>
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
                    <p>{evidenceTypeLabel(record.type, locale).toLowerCase()}</p>
                    <h3>{record.title}</h3>
                    <span>{record.claim}</span>
                  </div>
                  <div className="evidence-record-state">
                    <strong>{evidenceStateLabel(record.state, locale)}</strong>
                    <small>{publicabilityLabel(record.publicability, locale).toLowerCase()}</small>
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
