import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoreFallback } from "@/components/scene/core-fallback";
import { SystemArtifact } from "@/components/systems/system-artifact";
import { Catalog } from "@/components/content/catalog";
import { profile } from "@/content/profile";
import { professional } from "@/content/professional";
import { publicEvidenceRecords, findEvidenceBySlug } from "@/content/evidence-index";
import { pageMetadata } from "@/lib/metadata";
import { absoluteSiteUrl } from "@/lib/site-config";
import type { EvidenceState } from "@/lib/content/types";
import { isLocale, localePath, prefixedLocales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedSystemCases, findLocalizedSystem } from "@/i18n/systems";
import { localizedNotes, findLocalizedNote, localizedTerritory } from "@/i18n/notes";

type Props = { params: Promise<{ locale: string; segments?: string[] }> };

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

const professionalCopy = {
  es: {
    title: "El software tiene que funcionar más allá de la demo.",
    summary: "Mi trabajo profesional incluye mapeo de infraestructura, contexto de equipos, vistas operativas y hardening de seguridad. Mi responsabilidad abarca implementación y verificación dentro de un sistema existente.",
    areas: ["Software operativo", "Integraciones reales", "Implementación y hardening"],
  },
  pt: {
    title: "Software precisa funcionar além da demo.",
    summary: "Meu trabalho profissional inclui mapeamento de infraestrutura, contexto de equipamentos, vistas operacionais e hardening de segurança. Minha responsabilidade abrange implementação e verificação dentro de um sistema existente.",
    areas: ["Software operacional", "Integrações reais", "Implementação e hardening"],
  },
} as const;

function validLocale(value: string): Locale | null {
  return value === "es" || value === "pt" ? value : null;
}

function lines(value: string) {
  const parts = value.split("\n");
  return parts.map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <br/>}{part}</span>);
}

function pathFor(locale: Locale, path: string) { return localePath(locale, path); }

export function generateStaticParams() {
  const routeSegments: string[][] = [
    [], ["systems"], ["notes"], ["about"], ["contact"], ["evidence"],
    ...localizedSystemCases("en").filter((s) => s.publicability !== "PRIVATE").map((s) => ["systems", s.slug]),
    ...localizedNotes("en").map((n) => ["notes", n.slug]),
    ...publicEvidenceRecords.map((record) => ["evidence", record.slug]),
  ];
  return prefixedLocales.flatMap((locale) => routeSegments.map((segments) => ({ locale, segments })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale: rawLocale, segments = [] } = await params;
  const locale = validLocale(rawLocale);
  if (!locale) return {};
  const t = getMessages(locale);
  const [section, slug, ...rest] = segments;
  if (rest.length) return {};
  if (!section) return pageMetadata("Eduardo Merino — Full Stack Developer & Applied AI", t.home.proposition, "/", "/opengraph-image", locale);
  if (section === "systems" && !slug) return pageMetadata(t.systems.title, t.systems.lead, "/systems", "/opengraph-image", locale);
  if (section === "systems" && slug) { const system = findLocalizedSystem(locale, slug); return system ? pageMetadata(system.name, system.summary, `/systems/${slug}`, `/systems/${slug}/opengraph-image`, locale) : {}; }
  if (section === "notes" && !slug) return pageMetadata(t.notes.eyebrow, t.notes.lead, "/notes", "/opengraph-image", locale);
  if (section === "notes" && slug) { const note = findLocalizedNote(locale, slug); return note ? pageMetadata(note.title, note.thesis, `/notes/${slug}`, "/opengraph-image", locale) : {}; }
  if (section === "evidence" && !slug) return pageMetadata(t.evidence.eyebrow, t.evidence.lead, "/evidence", "/opengraph-image", locale);
  if (section === "evidence" && slug) { const record = findEvidenceBySlug(slug); return record ? pageMetadata(record.id, record.claim, `/evidence/${slug}`, "/opengraph-image", locale) : {}; }
  if (section === "about" && !slug) return pageMetadata(locale === "es" ? "Sobre Eduardo Merino" : "Sobre Eduardo Merino", t.about.personal, "/about", "/opengraph-image", locale);
  if (section === "contact" && !slug) return pageMetadata(locale === "es" ? "Contacto" : "Contato", t.contact.opening, "/contact", "/opengraph-image", locale);
  return {};
}

function Conversation({ locale }: { locale: Locale }) {
  const t = getMessages(locale).conversation;
  return <section className="conversation container section"><p className="eyebrow accent">{t.eyebrow}</p><h2>{t.title1}<br/><span>{t.title2}</span></h2><div className="conversation-bottom"><p>{t.text}</p><Link href={pathFor(locale, "/contact")} className="button primary">{getMessages(locale).common.contact} <span aria-hidden="true">↗</span></Link></div></section>;
}

function LocalizedHome({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const systems = localizedSystemCases(locale);
  const featured = systems.filter((system) => system.placement === "FLAGSHIP");
  const notes = localizedNotes(locale);
  const featuredNotes = [notes[0], notes[2], notes[3]];
  const pro = professionalCopy[locale];
  const capabilityHrefs = ["/systems/prodagentic", "/systems/vigia", "/systems/autopulse", "/systems/gpets"];
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="hero container">
      <div className="hero-copy enter"><p className="eyebrow hero-identity"><span className="identity-line" aria-hidden="true"/>Eduardo Merino <span>/</span> {t.home.eyebrow}</p><h1><span className="hero-line">{t.home.hero1}</span><span className="hero-line hero-line-accent">{t.home.hero2}</span></h1><p className="hero-statement">{t.home.proposition}</p><p className="hero-scope">{t.home.scope}</p><div className="actions"><Link href={pathFor(locale, "/systems")} className="button primary">{t.common.allSystems} <span aria-hidden="true">↗</span></Link><Link href={pathFor(locale, "/contact")} className="hero-secondary">{t.common.contact} <span aria-hidden="true">↗</span></Link></div></div>
      <div className="hero-art"><div className="core-stage" data-scene-slot="HOME"><CoreFallback/></div><div className="core-caption"><span className="eyebrow">{t.home.core}</span><span className="core-caption-index" aria-hidden="true">01 — 03</span></div></div>
      <div className="hero-bottom"><span>{t.home.bottom}</span><a href="#problems">{t.home.closer} <span aria-hidden="true">↓</span></a></div>
    </section>
    <section className="problem-section section rule-top" id="problems"><div className="container"><div className="section-head"><div><p className="eyebrow accent">{t.home.problemsEyebrow}</p><h2>{lines(t.home.problemsTitle)}</h2></div><p>{t.home.problemsIntro}</p></div><div className="problem-paths">{Object.entries(t.problemPaths).map(([id,path],i)=><details key={id} className="problem-path"><summary><span className="eyebrow">0{i+1}</span><h3>{path.title}</h3><span className="expand-symbol" aria-hidden="true">+</span><span className="path-teaser">{path.summary}</span></summary><div className="problem-detail"><p>{path.detail}</p><Link href={`${pathFor(locale, "/contact")}?intent=${id}`} className="text-link">{t.home.talkAbout} <span aria-hidden="true">↗</span></Link></div></details>)}</div><details className="capabilities-disclosure"><summary>{t.home.contribute} <span aria-hidden="true">+</span></summary><div className="capability-list">{t.capabilities.map((item,i)=><Link href={pathFor(locale, capabilityHrefs[i])} key={item.title}><h3>{item.title}</h3><p>{item.description}</p><span aria-hidden="true">↗</span></Link>)}</div></details></div></section>
    <section className="selected-section section container" id="selected-systems"><div className="section-head"><div><p className="eyebrow accent">{t.home.selectedEyebrow}</p><h2>{lines(t.home.selectedTitle)}</h2><p className="system-count-signal">{t.common.selectedCount}</p></div><p>{t.home.selectedIntro}</p></div>{featured.map((system,i)=><article key={system.slug} className={`system-encounter encounter-${i}`} data-accent={system.accent}><div className="encounter-copy"><p className="eyebrow accent"><span className="encounter-number">0{i+1}</span>{system.category}</p><h3><Link href={pathFor(locale, `/systems/${system.slug}`)}>{system.name}</Link></h3><p className="encounter-summary">{system.summary}</p><p className="encounter-built">{system.built}</p><div className="encounter-state"><span className="state-line" aria-hidden="true"/>{system.state.label}</div><Link href={pathFor(locale, `/systems/${system.slug}`)} className="text-link">{t.common.explore} {system.name}<span aria-hidden="true">↗</span></Link></div><SystemArtifact system={system}/></article>)}<div className="all-systems-row"><p>{t.home.moreSystems}</p><Link href={pathFor(locale, "/systems")} className="text-link">{t.common.allSystems} <span aria-hidden="true">↗</span></Link></div></section>
    <section className="professional-section section"><div className="container split"><div><p className="eyebrow accent">{t.home.professionalEyebrow}</p><h2>{pro.title}</h2></div><div className="professional-copy"><p className="lead">{pro.summary}</p><ul className="proof-areas">{pro.areas.map(area=><li key={area}>{area}</li>)}</ul><Link href={pathFor(locale, professional.href)} className="text-link">{t.home.professionalLink} <span aria-hidden="true">↗</span></Link><p className="boundary-caption">{t.home.professionalBoundary}</p></div></div></section>
    <section className="method-section section container"><div className="section-head"><div><p className="eyebrow accent">{t.home.methodEyebrow}</p><h2>{lines(t.home.methodTitle)}</h2></div><p>{t.home.methodIntro}</p></div><ol className="working-model">{t.working.map((step,i)=><li key={step.title}><span className="eyebrow">0{i+1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol><div className="method-proof"><p>{t.home.methodProof}</p><Link href={pathFor(locale, "/evidence")} className="text-link">{t.home.inspectProof} <span aria-hidden="true">↗</span></Link></div></section>
    <section className="paper section"><div className="container"><div className="section-head"><div><p className="eyebrow">{t.home.notesEyebrow}</p><h2>{lines(t.home.notesTitle)}</h2></div><p>{t.home.notesIntro}</p></div><div className="featured-notes">{featuredNotes.map((note,i)=><article key={note.slug}><span className="eyebrow">0{i+1} / {localizedTerritory(locale,note.territory)}</span><h3><Link href={pathFor(locale, `/notes/${note.slug}`)}>{note.title}</Link></h3><p>{note.thesis}</p><Link href={pathFor(locale, `/notes/${note.slug}`)} className="text-link" aria-label={`${t.home.readNote} ${note.title}`}>{t.home.readNote} <span aria-hidden="true">↗</span></Link></article>)}</div><Link href={pathFor(locale, "/notes")} className="text-link notes-more">{t.home.notebook} <span aria-hidden="true">↗</span></Link></div></section>
    <section className="human-section section container"><div className="human-portrait"><Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 50vw, 300px"/></div><div className="human-copy"><p className="eyebrow accent">{t.home.humanEyebrow}</p><h2>{t.home.humanTitle}</h2><p className="lead">{t.home.humanText}</p><Link href={pathFor(locale, "/about")} className="text-link">{t.home.humanLink} <span aria-hidden="true">↗</span></Link></div></section>
    <div className="rule-top"><Conversation locale={locale}/></div>
  </main>;
}

function LocalizedSystems({ locale }: { locale: Locale }) {
  const t=getMessages(locale); const systems=localizedSystemCases(locale); const featured=systems.filter(s=>s.placement==="FLAGSHIP");
  return <main id="main-content" lang={locale} tabIndex={-1}><header className="page-intro container"><p className="eyebrow accent">{t.systems.eyebrow}</p><h1>{t.systems.title}</h1><p className="lead">{t.systems.lead}</p><p className="system-count-signal">{t.common.selectedCount}</p></header><section className="container" aria-label={t.systems.selectedLabel}>{featured.map((system,i)=><article className={`system-encounter encounter-${i}`} key={system.slug} data-accent={system.accent}><div className="encounter-copy"><p className="eyebrow accent">{system.category}</p><h2>{system.name}</h2><p className="encounter-summary">{system.summary}</p><p className="encounter-built">{system.built}</p><p className="encounter-state">{system.state.label}</p><Link className="text-link" href={pathFor(locale, `/systems/${system.slug}`)}>{t.common.explore} {system.name}<span aria-hidden="true">↗</span></Link></div><SystemArtifact system={system}/></article>)}</section><section className="section container"><div className="section-head"><div><p className="eyebrow accent">{t.systems.further}</p><h2>{lines(t.systems.furtherTitle)}</h2></div><p>{t.systems.furtherText}</p></div><div className="supporting-systems">{systems.filter(s=>s.placement!=="FLAGSHIP").map(system=><Link href={pathFor(locale, `/systems/${system.slug}`)} key={system.slug}><span className="eyebrow">{system.placement === "R&D" ? t.systems.inDevelopment : system.placement.toLowerCase()}</span><div><h3>{system.name}</h3><p>{system.summary}</p><span className="support-state">{system.state.label}</span></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></section><div className="rule-top"><Conversation locale={locale}/></div></main>;
}

function LocalizedSystem({ locale, slug }: { locale: Locale; slug: string }) {
  const t=getMessages(locale); const system=findLocalizedSystem(locale,slug); if(!system)notFound();
  const evidence=system.evidence.map(id=>findEvidenceBySlug(id.toLowerCase())).filter(item=>item!==undefined);
  const url=absoluteSiteUrl(pathFor(locale, `/systems/${slug}`)); const jsonLd={"@context":"https://schema.org","@type":"CreativeWork",inLanguage:locale,name:system.name,description:system.summary,...(url?{url}:{}),creator:{"@type":"Person",name:"Eduardo Merino"}};
  const related=localizedSystemCases(locale).filter(s=>s.placement==="FLAGSHIP"&&s.slug!==slug).slice(0,2);
  return <main id="main-content" lang={locale} className="system-page" data-accent={system.accent} tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
    <header className="case-hero container"><Link className="back-link" href={pathFor(locale,"/systems")}>{t.common.backSystems}</Link><div className="case-hero-grid"><div><p className="eyebrow accent">{system.category}</p><h1>{system.name}</h1><p className="case-thesis">{system.summary}</p><p className="case-built">{system.built}</p><div className="actions"><a href="#problem" className="button primary">{t.common.inside} <span aria-hidden="true">↓</span></a><Link href={pathFor(locale,"/contact")} className="text-link">{t.common.talk} <span aria-hidden="true">↗</span></Link></div></div><SystemArtifact system={system}/></div><div className="case-context"><div><span className="eyebrow">{t.common.currentState}</span><p>{system.state.label}</p></div><div><span className="eyebrow">{t.common.myRole}</span><p>{system.ownership}</p></div></div></header>
    <nav className="case-nav container" aria-label={`${system.name} sections`}><a href="#problem">{t.system.problem}</a><a href="#what-it-does">{t.system.built}</a><a href="#current-state">{t.system.state}</a><a href="#engineering">{t.system.engineering}</a><a href="#evidence">{t.common.proof}</a></nav>
    <section className="case-problem section container split" id="problem"><div><p className="eyebrow accent">{t.system.problem}</p><h2>{lines(t.system.problemTitle)}</h2></div><div className="case-body"><p className="lead">{system.problem}</p><h3>{t.system.why}</h3><p>{system.importance}</p></div></section>
    <section className="case-capabilities section rule-top" id="what-it-does"><div className="container split"><div><p className="eyebrow accent">{t.system.built}</p><h2>{lines(t.system.builtTitle)}</h2><p className="muted case-built">{system.built}</p></div><ol>{system.capabilities.map((cap,i)=><li key={cap}><span className="eyebrow">0{i+1}</span><p>{cap}</p></li>)}</ol></div></section>
    <section className="state-section section container" id="current-state"><p className="eyebrow accent">{t.system.state}</p><div className="split"><h2>{system.state.label}</h2><div className="case-body"><p>{system.state.detail}</p><p className="state-boundary">{system.state.boundary}</p></div></div></section>
    <section className="engineering-section section" id="engineering"><div className="container"><div className="section-head"><div><p className="eyebrow accent">{t.system.engineering}</p><h2>{lines(t.system.engineeringTitle)}</h2></div><p>{t.system.engineeringIntro}</p></div><div className="depth-disclosures"><details id="how-it-works"><summary><span className="eyebrow">01</span><h3>{t.system.how}</h3><span aria-hidden="true">+</span></summary><div className="depth-content">{system.architecture.map(item=><section key={item.title}><h4>{item.title}</h4><p>{item.body}</p></section>)}</div></details><details id="decisions"><summary><span className="eyebrow">02</span><h3>{t.system.decisions}</h3><span aria-hidden="true">+</span></summary><div className="depth-content">{system.decisions.map(item=><section key={item.title}><h4>{item.title}</h4><p>{item.body}</p></section>)}</div></details><details id="failure"><summary><span className="eyebrow">03</span><h3>{t.system.failure}</h3><span aria-hidden="true">+</span></summary><div className="depth-content"><ul>{system.limitations.map(item=><li key={item}>{item}</li>)}</ul></div></details></div></div></section>
    <section className="paper section" id="evidence"><div className="container"><div className="section-head"><div><p className="eyebrow">{t.system.inspect}</p><h2>{lines(t.system.trust)}</h2></div><p>{t.system.proofIntro}</p></div>{evidence.length>0&&<div className="proof-list">{evidence.map(record=><Link key={record.id} href={pathFor(locale, `/evidence/${record.slug}`)}><span className="eyebrow">{record.type.toLowerCase()}</span><h3>{record.title}</h3><span aria-hidden="true">↗</span></Link>)}</div>}{system.sourceBoundary&&<p className="source-boundary">{system.sourceBoundary}</p>}{system.source&&<a className="text-link source-link" href={system.source.href} target="_blank" rel="noreferrer">{system.source.label} <span aria-hidden="true">↗</span></a>}</div></section>
    <section className="section container related-systems"><p className="eyebrow accent">{t.common.anotherProblem}</p>{related.map(item=><Link key={item.slug} href={pathFor(locale, `/systems/${item.slug}`)}><h2>{item.name}</h2><p>{item.summary}</p><span aria-hidden="true">↗</span></Link>)}</section><div className="rule-top"><Conversation locale={locale}/></div>
  </main>;
}

function LocalizedNotes({ locale }: { locale: Locale }) {
  const t=getMessages(locale); const notes=localizedNotes(locale);
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}><header className="page-intro container"><p className="eyebrow">{t.notes.eyebrow}</p><h1>{lines(t.notes.title)}</h1><p className="lead">{t.notes.lead}</p><p className="editorial-boundary">{t.notes.boundary.replace("LinkedIn ↗","")}<a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>.</p></header><section className="container section catalog-section" aria-label={t.notes.eyebrow}><Catalog locale={locale} kind="notes" items={notes.map(note=>({href:pathFor(locale,`/notes/${note.slug}`),title:note.title,summary:note.thesis,category:localizedTerritory(locale,note.territory).toLowerCase(),meta:note.state==="EXPLORING"?t.notes.exploring:t.notes.implementation}))}/></section></main>;
}

function LocalizedNote({ locale, slug }: { locale: Locale; slug: string }) {
  const t=getMessages(locale); const note=findLocalizedNote(locale,slug); if(!note)notFound(); const records=note.relatedEvidenceIds.map(id=>findEvidenceBySlug(id.toLowerCase())).filter(x=>x!==undefined);
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}><article className="container reading-article"><Link href={pathFor(locale,"/notes")} className="back-link">{t.notes.back}</Link><header className="reading-heading"><p className="eyebrow">{localizedTerritory(locale,note.territory)} / {note.state==="EXPLORING"?t.notes.exploring:t.notes.implementation}</p><h1>{note.title}</h1><p className="lead">{note.thesis}</p><p className="note-byline">Eduardo Merino{note.systemName?` · ${note.systemName}`:""}</p></header><div className="prose note-body">{note.systemName==="CV Engine"&&<aside className="reading-notice">{t.notes.historicalCv}</aside>}{note.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}{note.currentBoundary&&<aside className="reading-notice"><h2>{t.notes.scope}</h2><p>{note.currentBoundary}</p></aside>}</div><footer className="reading-relations"><h2>{t.notes.reasoning}</h2>{note.systemName&&<Link className="text-link" href={pathFor(locale,`/systems/${note.systemName === "AutoPulse" ? "autopulse" : note.systemName === "CV Engine" ? "cv-engine" : ""}`)}>{t.common.explore} {note.systemName} <span aria-hidden="true">↗</span></Link>}{records.map(record=><Link className="relation-link" key={record.slug} href={pathFor(locale,`/evidence/${record.slug}`)}>{record.title} <span aria-hidden="true">↗</span></Link>)}<Link className="text-link" href={pathFor(locale,"/contact")}>{t.common.contact} <span aria-hidden="true">↗</span></Link></footer></article></main>;
}

function LocalizedEvidence({ locale }: { locale: Locale }) {
  const t=getMessages(locale);
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}><header className="page-intro container"><p className="eyebrow">{t.evidence.eyebrow}</p><h1>{lines(t.evidence.title)}</h1><p className="lead">{t.evidence.lead}</p><details className="evidence-explainer"><summary>{t.evidence.explainerQ}</summary><p>{t.evidence.explainerA}</p></details></header><section className="container section catalog-section" aria-label={t.evidence.eyebrow}><Catalog locale={locale} kind="evidence" items={publicEvidenceRecords.map(record=>({href:pathFor(locale,`/evidence/${record.slug}`),title:record.title,summary:record.claim,category:record.systemName,meta:`${record.id} · ${record.state.toLowerCase().replaceAll("_"," ")}`}))}/></section></main>;
}

function LocalizedEvidenceRecord({ locale, slug }: { locale: Locale; slug: string }) {
  const t=getMessages(locale); const record=findEvidenceBySlug(slug); if(!record)notFound(); const system=findLocalizedSystem(locale, localizedSystemCases(locale).find(s=>s.id===record.systemId)?.slug ?? "");
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}><article className="container reading-article evidence-dossier"><Link href={pathFor(locale,"/evidence")} className="back-link">{t.evidence.back}</Link><header className="reading-heading"><p className="eyebrow">{record.id} / {record.systemName}</p><h1>{record.title}</h1><p className="lead">{record.claim}</p><dl className="evidence-facts"><div><dt>{t.evidence.evidenceClass}</dt><dd>{record.state.toLowerCase().replaceAll("_"," ")}</dd></div><div><dt>{t.evidence.publicability}</dt><dd>{record.publicability.toLowerCase()}</dd></div></dl></header><div className="prose"><section><h2>{t.evidence.supports}</h2><p>{record.context}</p><p>{evidenceStateCopy[locale][record.state]}</p></section><section className="reading-notice"><h2>{t.evidence.notProve}</h2><p>{record.limitations}</p>{record.systemName==="CV Engine"&&<p>{t.evidence.cvNotice}</p>}</section><section><h2>{t.evidence.sourceRevision}</h2><div className="evidence-sources">{record.sources.map((source,i)=>{const withheld=source.access==="PRIVATE_WITHHELD";const href=!withheld&&source.repository&&source.path&&source.ref?`https://github.com/${source.repository}/blob/${source.ref}/${source.path}`:null;const blobUrl=!withheld&&source.repository&&source.reviewedBlobSha?`https://api.github.com/repos/${source.repository}/git/blobs/${source.reviewedBlobSha}`:null;return <div className="evidence-source" key={`${source.label}-${i}`}><h3>{source.label}</h3>{withheld?<><span className="source-access">{t.evidence.privateSource}</span><p>{source.note}</p></>:<>{href&&<a className="text-link" href={href} target="_blank" rel="noreferrer">{t.evidence.inspectPath} <span aria-hidden="true">↗</span></a>}<dl><div><dt>{t.evidence.repository}</dt><dd>{source.repository}</dd></div><div><dt>{t.evidence.path}</dt><dd className="mono">{source.path}</dd></div><div><dt>{t.evidence.revision}</dt><dd className="mono">{source.ref}</dd></div>{source.reviewedBlobSha&&<div><dt>{t.evidence.reviewedBlob}</dt><dd className="mono">{source.reviewedBlobSha}</dd></div>}</dl>{blobUrl&&<a href={blobUrl} target="_blank" rel="noreferrer" className="text-link">{t.evidence.inspectBlob} <span aria-hidden="true">↗</span></a>}{source.note&&<p>{source.note}</p>}{source.ref&&!/^[a-f0-9]{40}$/.test(source.ref)&&<p className="source-reference-notice">{t.evidence.branchNotice}</p>}</>}</div>})}</div></section></div><footer className="reading-relations"><h2>{t.evidence.bigger}</h2>{system&&<Link className="text-link" href={pathFor(locale,`/systems/${system.slug}`)}>{t.common.explore} {system.name} <span aria-hidden="true">↗</span></Link>}<Link className="text-link" href={pathFor(locale,"/contact")}>{t.common.contact} <span aria-hidden="true">↗</span></Link></footer></article></main>;
}

function LocalizedAbout({ locale }: { locale: Locale }) {
  const t=getMessages(locale);
  return <main id="main-content" lang={locale} tabIndex={-1}><section className="container section about-intro"><div><p className="eyebrow accent">{t.about.eyebrow}</p><h1>{lines(t.about.title)}</h1><p className="lead">{t.home.proposition}</p><p className="about-personal">{t.about.personal}</p><Link href={pathFor(locale,"/contact")} className="button primary">{t.common.contact} <span aria-hidden="true">↗</span></Link></div><figure className="about-portrait"><Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 85vw, 420px" priority/><figcaption>{t.about.portrait}</figcaption></figure></section><section className="professional-section section"><div className="container split"><div><p className="eyebrow accent">{t.about.connects}</p><h2>{lines(t.about.connectsTitle)}</h2></div><div className="case-body"><p className="lead">{t.about.connectsLead}</p><p className="about-personal">{t.about.connectsText}</p><Link className="text-link" href={pathFor(locale,"/systems/infrastructure-site-mapper")}>{t.about.professional} <span aria-hidden="true">↗</span></Link></div></div></section><section className="container section" id="method"><div className="section-head"><div><p className="eyebrow accent">{t.about.method}</p><h2>{lines(t.about.methodTitle)}</h2></div><p>{t.about.methodText}</p></div><ol className="working-model">{t.working.map((step,i)=><li key={step.title}><span className="eyebrow">0{i+1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol></section><section className="paper section"><div className="container split"><div><p className="eyebrow">{t.about.truths}</p><h2>{lines(t.about.truthsTitle)}</h2></div><ul className="about-rules">{t.about.rules.map(rule=><li key={rule}>{rule}</li>)}</ul></div></section><Conversation locale={locale}/></main>;
}

function LocalizedContact({ locale }: { locale: Locale }) {
  const t=getMessages(locale);
  return <main id="main-content" lang={locale} tabIndex={-1}><section className="container contact-intro"><p className="eyebrow accent">{t.contact.eyebrow}</p><h1>{lines(t.contact.title)}</h1><div className="contact-opening"><p className="lead">{t.contact.opening}</p><a href={profile.linkedin} target="_blank" rel="noreferrer" className="button primary">{t.contact.linkedin} <span aria-hidden="true">↗</span></a></div></section><section className="container section rule-top contact-context"><div><p className="eyebrow accent">{t.contact.useful}</p><h2>{lines(t.contact.usefulTitle)}</h2></div><ol>{t.contact.prompts.map(item=><li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol></section><section className="paper section"><div className="container"><p className="eyebrow">{t.contact.ways}</p><div className="contact-paths">{Object.values(t.problemPaths).map(path=><div key={path.title}><h2>{path.title}</h2><p>{path.detail}</p></div>)}</div></div></section><section className="container section contact-channels"><div><h2>{lines(t.contact.channelsTitle)}</h2><p className="muted">{t.contact.channelsLead}</p></div><nav aria-label="Contact channels"><a href={profile.linkedin} target="_blank" rel="noreferrer"><span>{t.contact.start}</span><strong>LinkedIn ↗</strong></a><a href={profile.github} target="_blank" rel="noreferrer"><span>{t.contact.inspect}</span><strong>GitHub ↗</strong></a><Link href={pathFor(locale,"/systems")}><span>{t.contact.understand}</span><strong>{t.nav.systems} →</strong></Link></nav></section></main>;
}

export default async function LocalizedRoute({ params }: Props) {
  const { locale: rawLocale, segments = [] } = await params;
  const locale=validLocale(rawLocale); if(!locale || !isLocale(locale)) notFound();
  const [section,slug,...rest]=segments; if(rest.length)notFound();
  if(!section) return <LocalizedHome locale={locale}/>;
  if(section==="systems"&&!slug) return <LocalizedSystems locale={locale}/>;
  if(section==="systems"&&slug) return <LocalizedSystem locale={locale} slug={slug}/>;
  if(section==="notes"&&!slug) return <LocalizedNotes locale={locale}/>;
  if(section==="notes"&&slug) return <LocalizedNote locale={locale} slug={slug}/>;
  if(section==="evidence"&&!slug) return <LocalizedEvidence locale={locale}/>;
  if(section==="evidence"&&slug) return <LocalizedEvidenceRecord locale={locale} slug={slug}/>;
  if(section==="about"&&!slug) return <LocalizedAbout locale={locale}/>;
  if(section==="contact"&&!slug) return <LocalizedContact locale={locale}/>;
  notFound();
}
