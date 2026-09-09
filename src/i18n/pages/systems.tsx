import Link from "next/link";
import { notFound } from "next/navigation";
import { SystemArtifact } from "@/components/systems/system-artifact";
import { SystemMedia } from "@/components/systems/system-media";
import { publicEvidenceRecords, findEvidenceBySlug } from "@/content/evidence-index";
import { absoluteSiteUrl } from "@/lib/site-config";
import { localePath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getReputationPolish } from "@/i18n/polish";
import { findLocalizedSystem, localizedSystemCases } from "@/i18n/systems";
import { Lines, LocalizedConversation } from "./shared";

const seeIt: Record<Locale, string> = { en: "See it", es: "Verlo", pt: "Ver" };

export function LocalizedSystems({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const polish = getReputationPolish(locale);
  const systems = localizedSystemCases(locale);
  const featured = systems.filter((system) => system.placement === "FLAGSHIP");
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <header className="page-intro container"><p className="eyebrow accent">{t.systems.eyebrow}</p><h1>{t.systems.title}</h1><p className="lead">{t.systems.lead}</p><p className="system-count-signal">{t.common.selectedCount}</p></header>
    <section className="container" aria-label={t.systems.selectedLabel}>{featured.map((system,i)=><article className={`system-encounter encounter-${i}`} key={system.slug} data-accent={system.accent}><div className="encounter-copy"><p className="eyebrow accent">{system.category}</p><h2>{system.name}</h2><p className="encounter-summary">{system.summary}</p><p className="encounter-built">{system.built}</p><p className="encounter-state">{system.state.label}</p><Link className="text-link" href={localePath(locale,`/systems/${system.slug}`)}>{t.common.explore} {system.name}<span aria-hidden="true">↗</span></Link></div><SystemArtifact system={system} locale={locale}/></article>)}</section>
    <section className="section container"><div className="section-head"><div><p className="eyebrow accent">{t.systems.further}</p><h2><Lines value={t.systems.furtherTitle}/></h2></div><p>{t.systems.furtherText}</p></div><div className="supporting-systems">{systems.filter((system)=>system.placement!=="FLAGSHIP").map((system)=><Link href={localePath(locale,`/systems/${system.slug}`)} key={system.slug}><span className="eyebrow">{polish.system.placements[system.placement]}</span><div><h3>{system.name}</h3><p>{system.summary}</p><span className="support-state">{system.state.label}</span></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <div className="rule-top"><LocalizedConversation locale={locale}/></div>
  </main>;
}

export function LocalizedSystem({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getMessages(locale);
  const polish = getReputationPolish(locale);
  const system = findLocalizedSystem(locale, slug);
  if (!system) notFound();
  const evidence = system.evidence.map((id) => findEvidenceBySlug(id.toLowerCase())).filter((item) => item !== undefined);
  const url = absoluteSiteUrl(localePath(locale, `/systems/${slug}`));
  const jsonLd = { "@context":"https://schema.org", "@type":"CreativeWork", inLanguage:locale, name:system.name, description:system.summary, ...(url?{url}:{}), creator:{"@type":"Person",name:"Eduardo Merino"} };
  const related = localizedSystemCases(locale).filter((item)=>item.placement==="FLAGSHIP"&&item.slug!==slug).slice(0,2);

  return <main id="main-content" lang={locale} className="system-page" data-accent={system.accent} tabIndex={-1}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
    <header className="case-hero container"><Link className="back-link" href={localePath(locale,"/systems")}>{t.common.backSystems}</Link><div className="case-hero-grid"><div><p className="eyebrow accent">{system.category}</p><h1>{system.name}</h1><p className="case-thesis">{system.summary}</p><p className="case-built">{system.built}</p><div className="actions"><a href="#problem" className="button primary">{t.common.inside} <span aria-hidden="true">↓</span></a><Link href={localePath(locale,"/contact")} className="text-link">{t.common.talk} <span aria-hidden="true">↗</span></Link></div></div><SystemArtifact system={system} locale={locale}/></div><div className="case-context"><div><span className="eyebrow">{t.common.currentState}</span><p>{system.state.label}</p></div><div><span className="eyebrow">{t.common.myRole}</span><p>{system.ownership}</p></div></div></header>
    <nav className="case-nav container" aria-label={`${system.name} ${polish.system.sections}`}><a href="#problem">{t.system.problem}</a><a href="#what-it-does">{t.system.built}</a>{system.media?.length ? <a href="#product-reality">{seeIt[locale]}</a> : null}<a href="#current-state">{t.system.state}</a><a href="#engineering">{t.system.engineering}</a><a href="#evidence">{t.common.proof}</a></nav>
    <section className="case-problem section container split" id="problem"><div><p className="eyebrow accent">{t.system.problem}</p><h2><Lines value={t.system.problemTitle}/></h2></div><div className="case-body"><p className="lead">{system.problem}</p><h3>{t.system.why}</h3><p>{system.importance}</p></div></section>
    <section className="case-capabilities section rule-top" id="what-it-does"><div className="container split"><div><p className="eyebrow accent">{t.system.built}</p><h2><Lines value={t.system.builtTitle}/></h2><p className="muted case-built">{system.built}</p></div><ol>{system.capabilities.map((capability,i)=><li key={capability}><span className="eyebrow">0{i+1}</span><p>{capability}</p></li>)}</ol></div></section>
    <SystemMedia system={system} locale={locale}/>
    <section className="state-section section container" id="current-state"><p className="eyebrow accent">{t.system.state}</p><div className="split"><h2>{system.state.label}</h2><div className="case-body"><p>{system.state.detail}</p><p className="state-boundary">{system.state.boundary}</p></div></div></section>
    <section className="engineering-section section" id="engineering"><div className="container"><div className="section-head"><div><p className="eyebrow accent">{t.system.engineering}</p><h2><Lines value={t.system.engineeringTitle}/></h2></div><p>{t.system.engineeringIntro}</p></div><div className="depth-disclosures"><details id="how-it-works"><summary><span className="eyebrow">01</span><h3>{t.system.how}</h3><span aria-hidden="true">+</span></summary><div className="depth-content">{system.architecture.map((item)=><section key={item.title}><h4>{item.title}</h4><p>{item.body}</p></section>)}</div></details><details id="decisions"><summary><span className="eyebrow">02</span><h3>{t.system.decisions}</h3><span aria-hidden="true">+</span></summary><div className="depth-content">{system.decisions.map((item)=><section key={item.title}><h4>{item.title}</h4><p>{item.body}</p></section>)}</div></details><details id="failure"><summary><span className="eyebrow">03</span><h3>{t.system.failure}</h3><span aria-hidden="true">+</span></summary><div className="depth-content"><ul>{system.limitations.map((item)=><li key={item}>{item}</li>)}</ul></div></details></div></div></section>
    <section className="paper section" id="evidence"><div className="container"><div className="section-head"><div><p className="eyebrow">{t.system.inspect}</p><h2><Lines value={t.system.trust}/></h2></div><p>{t.system.proofIntro}</p></div>{evidence.length>0&&<div className="proof-list">{evidence.map((record)=><Link key={record.id} href={localePath(locale,`/evidence/${record.slug}`)}><span className="eyebrow">{polish.evidenceTypes[record.type]}</span><h3>{record.title}</h3><span aria-hidden="true">↗</span></Link>)}</div>}{system.sourceBoundary&&<p className="source-boundary">{system.sourceBoundary}</p>}{system.source&&<a className="text-link source-link" href={system.source.href} target="_blank" rel="noreferrer">{system.source.label} <span aria-hidden="true">↗</span></a>}</div></section>
    <section className="section container related-systems"><p className="eyebrow accent">{t.common.anotherProblem}</p>{related.map((item)=><Link key={item.slug} href={localePath(locale,`/systems/${item.slug}`)}><h2>{item.name}</h2><p>{item.summary}</p><span aria-hidden="true">↗</span></Link>)}</section>
    <div className="rule-top"><LocalizedConversation locale={locale}/></div>
  </main>;
}

export function localizedSystemStaticSlugs() { return localizedSystemCases("en").filter((system)=>system.publicability!=="PRIVATE").map((system)=>system.slug); }
export function localizedSystemCount() { return localizedSystemCases("en").filter((system)=>system.publicability!=="PRIVATE").length; }
export function publicSystemEvidenceCount() { return publicEvidenceRecords.length; }
