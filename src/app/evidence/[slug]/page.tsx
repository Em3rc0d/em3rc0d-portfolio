import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findEvidenceBySlug, publicEvidenceRecords } from "@/content/evidence-index";

interface EvidencePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publicEvidenceRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: EvidencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = findEvidenceBySlug(slug);
  if (!record) return {};
  return { title: record.id, description: record.claim };
}

export default async function EvidenceRecordPage({ params }: EvidencePageProps) {
  const { slug } = await params;
  const record = findEvidenceBySlug(slug);
  if (!record) notFound();

  const systemHref = record.systemId === "02"
    ? "/systems/cv-engine#evidence"
    : "/systems/autopulse#evidence";

  return (
    <main className="evidence-inspector">
      <header className="evidence-inspector-topbar">
        <Link href="/evidence">← EVIDENCE LIBRARY</Link>
        <span>{record.systemName} / {record.id}</span>
      </header>

      <section className="evidence-inspector-sheet">
        <div className="evidence-inspector-register" aria-hidden="true">
          <span>+</span><span>+</span><span>+</span><span>+</span>
        </div>

        <header className="evidence-inspector-heading">
          <div>
            <p>{record.type} / {record.state.replaceAll("_", " ")}</p>
            <h1>{record.id}</h1>
          </div>
          <div>
            <span>SYSTEM</span>
            <strong>{record.systemName}</strong>
            <span>PUBLICABILITY</span>
            <strong>{record.publicability}</strong>
          </div>
        </header>

        <section className="evidence-inspector-claim">
          <p>CLAIM SUPPORTED</p>
          <h2>{record.claim}</h2>
        </section>

        <div className="evidence-inspector-grid">
          <section>
            <p className="evidence-inspector-label">CONTEXT</p>
            <p>{record.context}</p>
          </section>
          <section className="evidence-limitations">
            <p className="evidence-inspector-label">LIMITATIONS / CLAIM CEILING</p>
            <p>{record.limitations}</p>
          </section>
        </div>

        <section className="evidence-sources">
          <header>
            <p className="evidence-inspector-label">SOURCE PROVENANCE</p>
            <span>{String(record.sources.length).padStart(2, "0")} SOURCE{record.sources.length === 1 ? "" : "S"}</span>
          </header>
          {record.sources.map((source) => {
            const sourceHref = `https://github.com/${source.repository}/blob/${source.ref}/${source.path}`;
            return (
              <a key={`${source.path}-${source.label}`} href={sourceHref} target="_blank" rel="noreferrer">
                <div>
                  <span>{source.repository}</span>
                  <strong>{source.label}</strong>
                </div>
                <div>
                  <span>PATH</span>
                  <code>{source.path}</code>
                </div>
                <div>
                  <span>REVIEWED BLOB SHA</span>
                  <code>{source.reviewedBlobSha ?? "DIRECTORY SOURCE"}</code>
                </div>
                <b aria-hidden="true">↗</b>
              </a>
            );
          })}
        </section>

        <section className="evidence-relations">
          <div>
            <p className="evidence-inspector-label">RELATED DECISIONS</p>
            <strong>{record.relatedDecisionIds.length ? record.relatedDecisionIds.join(" · ") : "NONE MAPPED"}</strong>
          </div>
          <div>
            <p className="evidence-inspector-label">ARCHITECTURE REFERENCES</p>
            <strong>{record.relatedArchitectureIds.length ? record.relatedArchitectureIds.join(" · ") : "NONE MAPPED"}</strong>
          </div>
          <Link href={systemHref}>RETURN TO {record.systemName.toUpperCase()} →</Link>
        </section>
      </section>
    </main>
  );
}