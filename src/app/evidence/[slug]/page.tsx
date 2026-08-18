import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findEvidenceBySlug, publicEvidenceRecords } from "@/content/evidence-index";
import type { EvidenceState } from "@/lib/content/types";

interface EvidencePageProps {
  params: Promise<{ slug: string }>;
}

const stateExplanation: Record<EvidenceState, string> = {
  IMPLEMENTED:
    "The behavior exists in the implementation. This state does not automatically mean it has been independently or field verified.",
  SOURCE_VERIFIED:
    "The claim was checked against the cited source material. The exact reviewed revision is retained in technical provenance.",
  TEST_ARTIFACT:
    "A test artifact supports the claim. The limitation below defines how far that evidence can be generalized.",
  FIELD_VALIDATED:
    "The behavior has supporting evidence from a real-world or field validation context.",
  IN_TEST:
    "The behavior is currently being tested. It should not be read as a completed verification claim.",
  NOT_CLAIMED:
    "This record is contextual material and is not presented as proof of a completed engineering claim.",
};

export function generateStaticParams() {
  return publicEvidenceRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: EvidencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = findEvidenceBySlug(slug);
  if (!record) return {};
  return { title: `${record.id} — ${record.title}`, description: record.claim };
}

export default async function EvidenceRecordPage({ params }: EvidencePageProps) {
  const { slug } = await params;
  const record = findEvidenceBySlug(slug);
  if (!record) notFound();

  const systemHref = record.systemId === "02"
    ? "/systems/cv-engine#evidence"
    : "/systems/autopulse#evidence";

  const stateLabel = record.state.replaceAll("_", " ");

  return (
    <main className="evidence-inspector">
      <header className="evidence-inspector-topbar">
        <Link href="/evidence">← Evidence library</Link>
        <span>{record.systemName} / {record.id}</span>
      </header>

      <article className="evidence-inspector-sheet evidence-inspector-readable">
        <div className="evidence-inspector-register" aria-hidden="true">
          <span>+</span><span>+</span><span>+</span><span>+</span>
        </div>

        <header className="evidence-readable-heading">
          <div>
            <p className="evidence-kicker">EVIDENCE RECORD / {record.id}</p>
            <h1>{record.title}</h1>
            <p className="evidence-readable-intro">
              One inspectable record supporting a specific claim about {record.systemName}.
            </p>
          </div>

          <div className="evidence-readable-meta" aria-label="Evidence summary">
            <div><span>System</span><strong>{record.systemName}</strong></div>
            <div><span>Type</span><strong>{record.type}</strong></div>
            <div><span>Status</span><strong>{stateLabel}</strong></div>
          </div>
        </header>

        <section className="evidence-proof-summary" aria-labelledby="proof-heading">
          <p className="evidence-inspector-label">WHAT THIS PROVES</p>
          <h2 id="proof-heading">{record.claim}</h2>
          <details className="evidence-status-explainer">
            <summary>What does “{stateLabel}” mean?</summary>
            <p>{stateExplanation[record.state]}</p>
          </details>
        </section>

        <div className="evidence-readable-context">
          <section>
            <p className="evidence-inspector-label">WHY THIS RECORD EXISTS</p>
            <p>{record.context}</p>
          </section>
          <section className="evidence-limitations-readable">
            <p className="evidence-inspector-label">WHAT THIS DOES NOT PROVE</p>
            <p>{record.limitations}</p>
          </section>
        </div>

        <section className="evidence-sources evidence-sources-readable">
          <header>
            <div>
              <p className="evidence-inspector-label">SOURCES USED</p>
              <h2>Open the source if you want to inspect deeper.</h2>
            </div>
            <span>{record.sources.length} source{record.sources.length === 1 ? "" : "s"}</span>
          </header>

          <div className="evidence-source-list">
            {record.sources.map((source) => {
              const sourceHref = `https://github.com/${source.repository}/blob/${source.ref}/${source.path}`;
              return (
                <article className="evidence-source-card" key={`${source.path}-${source.label}`}>
                  <div className="evidence-source-card-main">
                    <span>{source.repository}</span>
                    <strong>{source.label}</strong>
                    <a href={sourceHref} target="_blank" rel="noreferrer">
                      Open source on GitHub <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <details className="evidence-provenance-detail">
                    <summary>Technical provenance</summary>
                    <dl>
                      <div>
                        <dt>Path</dt>
                        <dd><code>{source.path}</code></dd>
                      </div>
                      <div>
                        <dt>Reviewed ref</dt>
                        <dd><code>{source.ref}</code></dd>
                      </div>
                      <div>
                        <dt>Reviewed revision</dt>
                        <dd><code>{source.reviewedBlobSha ?? "Directory-level source"}</code></dd>
                      </div>
                    </dl>
                    <p>
                      The revision identifier exists so the evidence record can point to the exact
                      source version reviewed. It is provenance metadata, not something a casual
                      visitor needs in order to understand the claim.
                    </p>
                  </details>
                </article>
              );
            })}
          </div>
        </section>

        {(record.relatedDecisionIds.length > 0 || record.relatedArchitectureIds.length > 0) ? (
          <details className="evidence-related-detail">
            <summary>Related engineering references</summary>
            <div>
              <section>
                <p className="evidence-inspector-label">DECISIONS</p>
                <strong>{record.relatedDecisionIds.length ? record.relatedDecisionIds.join(" · ") : "None mapped"}</strong>
              </section>
              <section>
                <p className="evidence-inspector-label">ARCHITECTURE</p>
                <strong>{record.relatedArchitectureIds.length ? record.relatedArchitectureIds.join(" · ") : "None mapped"}</strong>
              </section>
            </div>
          </details>
        ) : null}

        <footer className="evidence-readable-footer">
          <Link href={systemHref}>Return to {record.systemName} →</Link>
          <Link href="/evidence">Browse all evidence</Link>
        </footer>
      </article>
    </main>
  );
}
