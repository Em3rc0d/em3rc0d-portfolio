import Image from "next/image";
import Link from "next/link";
import { CoreFallback } from "@/components/scene/core-fallback";
import { SystemArtifact } from "@/components/systems/system-artifact";
import { profile } from "@/content/profile";
import { professional } from "@/content/professional";
import { localePath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedNotes, localizedTerritory } from "@/i18n/notes";
import { localizedSystemCases } from "@/i18n/systems";
import { Lines, LocalizedConversation } from "./shared";

const localizedProfessional: Record<Locale, { title: string; summary: string; areas: readonly string[] }> = {
  en: { title: professional.title, summary: professional.summary, areas: professional.areas },
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
};

export function LocalizedHome({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const systems = localizedSystemCases(locale);
  const featured = systems.filter((system) => system.placement === "FLAGSHIP");
  const notes = localizedNotes(locale);
  const featuredNotes = [notes[0], notes[2], notes[3]];
  const pro = localizedProfessional[locale];
  const capabilityHrefs = ["/systems/prodagentic", "/systems/vigia", "/systems/autopulse", "/systems/gpets"];

  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="hero container">
      <div className="hero-copy enter">
        <p className="eyebrow hero-identity"><span className="identity-line" aria-hidden="true"/>Eduardo Merino <span>/</span> {t.home.eyebrow}</p>
        <h1><span className="hero-line">{t.home.hero1}</span><span className="hero-line hero-line-accent">{t.home.hero2}</span></h1>
        <p className="hero-statement">{t.home.proposition}</p><p className="hero-scope">{t.home.scope}</p>
        <div className="actions"><Link href={localePath(locale,"/systems")} className="button primary">{t.common.allSystems} <span aria-hidden="true">↗</span></Link><Link href={localePath(locale,"/contact")} className="hero-secondary">{t.common.contact} <span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className="hero-art"><div className="core-stage" data-scene-slot="HOME"><CoreFallback/></div><div className="core-caption"><span className="eyebrow">{t.home.core}</span><span className="core-caption-index" aria-hidden="true">01 — 03</span></div></div>
      <div className="hero-bottom"><span>{t.home.bottom}</span><a href="#problems">{t.home.closer} <span aria-hidden="true">↓</span></a></div>
    </section>

    <section className="problem-section section rule-top" id="problems"><div className="container">
      <div className="section-head"><div><p className="eyebrow accent">{t.home.problemsEyebrow}</p><h2><Lines value={t.home.problemsTitle}/></h2></div><p>{t.home.problemsIntro}</p></div>
      <div className="problem-paths">{Object.entries(t.problemPaths).map(([id,path],i)=><details key={id} className="problem-path"><summary><span className="eyebrow">0{i+1}</span><h3>{path.title}</h3><span className="expand-symbol" aria-hidden="true">+</span><span className="path-teaser">{path.summary}</span></summary><div className="problem-detail"><p>{path.detail}</p><Link href={`${localePath(locale,"/contact")}?intent=${id}`} className="text-link">{t.home.talkAbout} <span aria-hidden="true">↗</span></Link></div></details>)}</div>
      <details className="capabilities-disclosure"><summary>{t.home.contribute} <span aria-hidden="true">+</span></summary><div className="capability-list">{t.capabilities.map((item,i)=><Link href={localePath(locale,capabilityHrefs[i])} key={item.title}><h3>{item.title}</h3><p>{item.description}</p><span aria-hidden="true">↗</span></Link>)}</div></details>
    </div></section>

    <section className="selected-section section container" id="selected-systems">
      <div className="section-head"><div><p className="eyebrow accent">{t.home.selectedEyebrow}</p><h2><Lines value={t.home.selectedTitle}/></h2><p className="system-count-signal">{t.common.selectedCount}</p></div><p>{t.home.selectedIntro}</p></div>
      {featured.map((system,i)=><article key={system.slug} className={`system-encounter encounter-${i}`} data-accent={system.accent}><div className="encounter-copy"><p className="eyebrow accent"><span className="encounter-number">0{i+1}</span>{system.category}</p><h3><Link href={localePath(locale,`/systems/${system.slug}`)}>{system.name}</Link></h3><p className="encounter-summary">{system.summary}</p><p className="encounter-built">{system.built}</p><div className="encounter-state"><span className="state-line" aria-hidden="true"/>{system.state.label}</div><Link href={localePath(locale,`/systems/${system.slug}`)} className="text-link">{t.common.explore} {system.name}<span aria-hidden="true">↗</span></Link></div><SystemArtifact system={system}/></article>)}
      <div className="all-systems-row"><p>{t.home.moreSystems}</p><Link href={localePath(locale,"/systems")} className="text-link">{t.common.allSystems} <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="professional-section section"><div className="container split"><div><p className="eyebrow accent">{t.home.professionalEyebrow}</p><h2>{pro.title}</h2></div><div className="professional-copy"><p className="lead">{pro.summary}</p><ul className="proof-areas">{pro.areas.map((area)=><li key={area}>{area}</li>)}</ul><Link href={localePath(locale,professional.href)} className="text-link">{t.home.professionalLink} <span aria-hidden="true">↗</span></Link><p className="boundary-caption">{t.home.professionalBoundary}</p></div></div></section>

    <section className="method-section section container"><div className="section-head"><div><p className="eyebrow accent">{t.home.methodEyebrow}</p><h2><Lines value={t.home.methodTitle}/></h2></div><p>{t.home.methodIntro}</p></div><ol className="working-model">{t.working.map((step,i)=><li key={step.title}><span className="eyebrow">0{i+1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol><div className="method-proof"><p>{t.home.methodProof}</p><Link href={localePath(locale,"/evidence")} className="text-link">{t.home.inspectProof} <span aria-hidden="true">↗</span></Link></div></section>

    <section className="paper section"><div className="container"><div className="section-head"><div><p className="eyebrow">{t.home.notesEyebrow}</p><h2><Lines value={t.home.notesTitle}/></h2></div><p>{t.home.notesIntro}</p></div><div className="featured-notes">{featuredNotes.map((note,i)=><article key={note.slug}><span className="eyebrow">0{i+1} / {localizedTerritory(locale,note.territory)}</span><h3><Link href={localePath(locale,`/notes/${note.slug}`)}>{note.title}</Link></h3><p>{note.thesis}</p><Link href={localePath(locale,`/notes/${note.slug}`)} className="text-link">{t.home.readNote} <span aria-hidden="true">↗</span></Link></article>)}</div><Link href={localePath(locale,"/notes")} className="text-link notes-more">{t.home.notebook} <span aria-hidden="true">↗</span></Link></div></section>

    <section className="human-section section container"><div className="human-portrait"><Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 50vw, 300px"/></div><div className="human-copy"><p className="eyebrow accent">{t.home.humanEyebrow}</p><h2>{t.home.humanTitle}</h2><p className="lead">{t.home.humanText}</p><Link href={localePath(locale,"/about")} className="text-link">{t.home.humanLink} <span aria-hidden="true">↗</span></Link></div></section>
    <div className="rule-top"><LocalizedConversation locale={locale}/></div>
  </main>;
}
