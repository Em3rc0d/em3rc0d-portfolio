import Link from "next/link";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/content/catalog";
import { publicEvidenceRecords, findEvidenceBySlug } from "@/content/evidence-index";
import type { EvidenceState } from "@/lib/content/types";
import { localePath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getReputationPolish } from "@/i18n/polish";
import { localizedSystemCases } from "@/i18n/systems";
import { Lines } from "./shared";

const evidenceStateCopy: Record<Locale, Record<EvidenceState, string>> = {
  en: {
    IMPLEMENTED: "The behavior is represented in implementation. This does not establish independent execution or field validation.",
    SOURCE_VERIFIED: "The claim was checked against the cited source. This is source inspection, not a fresh runtime or field test.",
    TEST_ARTIFACT: "A test artifact or published test receipt supports this claim within its recorded revision and scope. This portfolio does not imply a new test execution.",
    FIELD_VALIDATED: "The record identifies a bounded field observation. It does not establish universal compatibility.",
    IN_TEST: "Validation remains in progress. Unknown outcomes are not passes.",
    NOT_CLAIMED: "This behavior is not claimed as complete.",
  },
  es: {
    IMPLEMENTED: "El comportamiento está representado en la implementación. Esto no establece ejecución independiente ni validación de campo.",
    SOURCE_VERIFIED: "La afirmación fue contrastada con la fuente citada. Es inspección de fuente, no una nueva prueba de runtime o campo.",
    TEST_ARTIFACT: "Un artefacto de prueba o receipt publicado respalda esta afirmación dentro de su revisión y alcance registrados. Este portfolio no implica una nueva ejecución del test.",
    FIELD_VALIDATED: "El registro identifica una observación de campo acotada. No establece compatibilidad universal.",
    IN_TEST: "La validación continúa. Los resultados desconocidos no cuentan como aprobados.",
    NOT_CLAIMED: "Este comportamiento no se afirma como completo.",
  },
  pt: {
    IMPLEMENTED: "O comportamento está representado na implementação. Isso não estabelece execução independente nem validação em campo.",
    SOURCE_VERIFIED: "O claim foi verificado contra a fonte citada. Isso é inspeção de fonte, não um novo teste de runtime ou campo.",
    TEST_ARTIFACT: "Um artefato de teste ou receipt publicado sustenta este claim dentro da revisão e escopo registrados. Este portfolio não implica uma nova execução do teste.",
    FIELD_VALIDATED: "O registro identifica uma observação de campo delimitada. Não estabelece compatibilidade universal.",
    IN_TEST: "A validação continua em andamento. Resultados desconhecidos não são aprovados.",
    NOT_CLAIMED: "Este comportamento não é reivindicado como completo.",
  },
};

export function LocalizedEvidence({ locale }: { locale: Locale }) {
  const t=getMessages(locale); const polish=getReputationPolish(locale);
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}>
    <header className="page-intro container"><p className="eyebrow">{t.evidence.eyebrow}</p><h1><Lines value={t.evidence.title}/></h1><p className="lead">{t.evidence.lead}</p><details className="evidence-explainer"><summary>{t.evidence.explainerQ}</summary><p>{t.evidence.explainerA}</p></details></header>
    <section className="container section catalog-section" aria-label={t.evidence.eyebrow}><Catalog locale={locale} kind="evidence" items={publicEvidenceRecords.map((record)=>({href:localePath(locale,`/evidence/${record.slug}`),title:record.title,summary:record.claim,category:record.systemName,meta:`${record.id} · ${polish.evidenceStates[record.state]}`}))}/></section>
  </main>;
}

export function LocalizedEvidenceRecord({ locale, slug }: { locale: Locale; slug: string }) {
  const t=getMessages(locale); const polish=getReputationPolish(locale);
  const record=findEvidenceBySlug(slug);
  if(!record) notFound();
  const systemSlug=localizedSystemCases(locale).find((system)=>system.id===record.systemId)?.slug;
  const system=systemSlug ? localizedSystemCases(locale).find((item)=>item.slug===systemSlug) : undefined;
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}>
    <article className="container reading-article evidence-dossier">
      <Link href={localePath(locale,"/evidence")} className="back-link">{t.evidence.back}</Link>
      <header className="reading-heading"><p className="eyebrow">{record.id} / {record.systemName}</p><h1>{record.title}</h1><p className="lead">{record.claim}</p><dl className="evidence-facts"><div><dt>{t.evidence.evidenceClass}</dt><dd>{polish.evidenceStates[record.state]}</dd></div><div><dt>{t.evidence.publicability}</dt><dd>{polish.publicability[record.publicability]}</dd></div></dl></header>
      <div className="prose"><section><h2>{t.evidence.supports}</h2><p>{record.context}</p><p>{evidenceStateCopy[locale][record.state]}</p></section><section className="reading-notice"><h2>{t.evidence.notProve}</h2><p>{record.limitations}</p>{record.systemName==="CV Engine"&&<p>{t.evidence.cvNotice}</p>}</section><section><h2>{t.evidence.sourceRevision}</h2><div className="evidence-sources">{record.sources.map((source,i)=>{const withheld=source.access==="PRIVATE_WITHHELD";const href=!withheld&&source.repository&&source.path&&source.ref?`https://github.com/${source.repository}/blob/${source.ref}/${source.path}`:null;const blobUrl=!withheld&&source.repository&&source.reviewedBlobSha?`https://api.github.com/repos/${source.repository}/git/blobs/${source.reviewedBlobSha}`:null;return <div className="evidence-source" key={`${source.label}-${i}`}><h3>{source.label}</h3>{withheld?<><span className="source-access">{t.evidence.privateSource}</span><p>{source.note}</p></>:<>{href&&<a className="text-link" href={href} target="_blank" rel="noreferrer">{t.evidence.inspectPath} <span aria-hidden="true">↗</span></a>}<dl><div><dt>{t.evidence.repository}</dt><dd>{source.repository}</dd></div><div><dt>{t.evidence.path}</dt><dd className="mono">{source.path}</dd></div><div><dt>{t.evidence.revision}</dt><dd className="mono">{source.ref}</dd></div>{source.reviewedBlobSha&&<div><dt>{t.evidence.reviewedBlob}</dt><dd className="mono">{source.reviewedBlobSha}</dd></div>}</dl>{blobUrl&&<a href={blobUrl} target="_blank" rel="noreferrer" className="text-link">{t.evidence.inspectBlob} <span aria-hidden="true">↗</span></a>}{source.note&&<p>{source.note}</p>}{source.ref&&!/^[a-f0-9]{40}$/.test(source.ref)&&<p className="source-reference-notice">{t.evidence.branchNotice}</p>}</>}</div>})}</div></section></div>
      <footer className="reading-relations"><h2>{t.evidence.bigger}</h2>{system&&<Link className="text-link" href={localePath(locale,`/systems/${system.slug}`)}>{t.common.explore} {system.name} <span aria-hidden="true">↗</span></Link>}<Link className="text-link" href={localePath(locale,"/contact")}>{t.common.contact} <span aria-hidden="true">↗</span></Link></footer>
    </article>
  </main>;
}

export function localizedEvidenceStaticSlugs() { return publicEvidenceRecords.map((record)=>record.slug); }
