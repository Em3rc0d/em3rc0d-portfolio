import Link from "next/link";
import { SiteHeader } from "@/components/shell/site-header";
import { publicEvidenceRecords } from "@/content/evidence-index";
import type { SupportingCaseRecord } from "@/content/supporting-cases";
import type { SystemRecord } from "@/lib/content/types";

interface SupportingCaseProps {
  system: SystemRecord;
  record: SupportingCaseRecord;
}

export function SupportingCase({ system, record }: SupportingCaseProps) {
  const evidence = record.evidenceIds
    .map((id) => publicEvidenceRecords.find((candidate) => candidate.id === id))
    .filter((candidate) => candidate !== undefined);

  return (
    <main className="build-room-shell supporting-case-shell">
      <section className="supporting-cover supporting-frame carbon-stage" aria-labelledby="supporting-title">
        <SiteHeader />
        <div className="supporting-cover-grid">
          <div className="supporting-cover-copy">
            <p className="technical-label">{record.reputationLabel} / SYSTEM {system.id}</p>
            <h1 id="supporting-title">{system.name}</h1>
            <p className="supporting-lede">{system.summary}</p>
          </div>

          <dl className="supporting-meta" aria-label={`${system.name} case summary`}>
            <div><dt>CONTEXT</dt><dd>{record.reputationLabel}</dd></div>
            <div><dt>ROLE</dt><dd>{system.ownership}</dd></div>
            <div><dt>STATE</dt><dd>{system.state.replaceAll("_", " ")}</dd></div>
            <div><dt>PUBLICABILITY</dt><dd>{system.publicability}</dd></div>
          </dl>
        </div>

        <div className="supporting-path" aria-label={`${system.name} system path`}>
          {system.path.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-context" aria-labelledby="supporting-problem">
        <div>
          <p className="technical-label">CONTEXT / PROBLEM</p>
          <h2 id="supporting-problem">The engineering starts with the operating reality.</h2>
        </div>
        <div className="supporting-reading-column">
          <p>{record.context}</p>
          <p>{record.problem}</p>
        </div>
      </section>

      <section className="supporting-frame supporting-model carbon-stage" aria-labelledby="supporting-model">
        <header>
          <p className="technical-label">ARCHITECTURE / MODEL</p>
          <h2 id="supporting-model">Keep the responsibilities visible.</h2>
        </header>
        <div className="supporting-card-grid">
          {record.architecture.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-build" aria-labelledby="supporting-build">
        <div className="supporting-responsibility">
          <p className="technical-label">RESPONSIBILITY / IMPLEMENTATION</p>
          <h2 id="supporting-build">What Eduardo actually owned or contributed.</h2>
          <p>{record.responsibility}</p>
        </div>
        <div className="supporting-implementation-list">
          {record.implementation.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-constraints carbon-stage" aria-labelledby="supporting-constraints">
        <header>
          <p className="technical-label">CONSTRAINTS / CLAIM CEILING</p>
          <h2 id="supporting-constraints">The constraints are part of the proof.</h2>
        </header>
        <ol>
          {record.constraints.map((constraint, index) => (
            <li key={constraint}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{constraint}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="supporting-frame supporting-evidence" aria-labelledby="supporting-evidence">
        <header>
          <p className="technical-label">EVIDENCE / INSPECT</p>
          <h2 id="supporting-evidence">Claims stay connected to evidence.</h2>
          <p>
            The evidence level follows the publication boundary: public source when it is safe,
            abstracted provenance when professional confidentiality is the harder constraint.
          </p>
        </header>
        <div className="supporting-evidence-grid">
          {evidence.map((item) => (
            <Link key={item.id} href={`/evidence/${item.slug}`}>
              <span>{item.id} · {item.state.replaceAll("_", " ")}</span>
              <strong>{item.title}</strong>
              <p>{item.claim}</p>
              <em>Inspect evidence ↗</em>
            </Link>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-limit carbon-stage" aria-labelledby="supporting-limit">
        <div>
          <p className="technical-label">LIMITATION / 01</p>
          <h2 id="supporting-limit">What this case does not claim.</h2>
          <p>{record.limitation}</p>
        </div>
        <div className="supporting-next-actions">
          {record.sourceLink ? (
            <a href={record.sourceLink.href} target="_blank" rel="noreferrer">
              {record.sourceLink.label} ↗
            </a>
          ) : null}
          <Link href="/systems">Browse systems →</Link>
          <Link href="/contact">Start a conversation →</Link>
        </div>
      </section>
    </main>
  );
}
