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
    <main className={`build-room-shell supporting-case-shell supporting-case-${system.slug}`}>
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

        <div
          className="supporting-path"
          data-count={system.path.length}
          aria-label={`${system.name} system path`}
        >
          {system.path.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-operating" aria-labelledby="supporting-operating-title">
        <div className="supporting-operating-copy">
          <p className="technical-label">OPERATING REALITY / MODEL</p>
          <h2 id="supporting-operating-title">Understand the system before showing the implementation.</h2>
          <p>{record.context}</p>
          <p>{record.problem}</p>
          <div className="supporting-responsibility-note">
            <span>RESPONSIBILITY</span>
            <strong>{record.responsibility}</strong>
          </div>
        </div>

        <div className="supporting-model-board" data-count={record.architecture.length}>
          {record.architecture.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="supporting-frame supporting-build-proof carbon-stage" aria-labelledby="supporting-build-title">
        <div className="supporting-build-column">
          <header>
            <p className="technical-label">IMPLEMENTATION</p>
            <h2 id="supporting-build-title">What was actually built or contributed.</h2>
          </header>
          <div className="supporting-implementation-list supporting-implementation-list-v2">
            {record.implementation.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
              </article>
            ))}
          </div>
        </div>

        <div className="supporting-proof-column">
          <header>
            <p className="technical-label">EVIDENCE / INSPECT</p>
            <h2>Claims stay connected to proof.</h2>
          </header>
          <div className="supporting-evidence-grid supporting-evidence-grid-v2">
            {evidence.map((item) => (
              <Link key={item.id} href={`/evidence/${item.slug}`}>
                <span>{item.id} · {item.state.replaceAll("_", " ")}</span>
                <strong>{item.title}</strong>
                <em>Inspect evidence ↗</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="supporting-frame supporting-limit supporting-limit-v2" aria-labelledby="supporting-limit-title">
        <div className="supporting-limit-copy">
          <p className="technical-label">CONSTRAINTS / CLAIM CEILING</p>
          <h2 id="supporting-limit-title">What this case proves — and what it does not.</h2>
          <p>{record.limitation}</p>
        </div>

        <ol className="supporting-constraint-ledger">
          {record.constraints.map((constraint, index) => (
            <li key={constraint}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{constraint}</p>
            </li>
          ))}
        </ol>

        <div className="supporting-next-actions supporting-next-actions-v2">
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
