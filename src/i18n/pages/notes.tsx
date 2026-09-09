import Link from "next/link";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/content/catalog";
import { profile } from "@/content/profile";
import { findEvidenceBySlug } from "@/content/evidence-index";
import { localePath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { findLocalizedNote, localizedNotes, localizedTerritory } from "@/i18n/notes";
import { Lines } from "./shared";

export function LocalizedNotes({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const notes = localizedNotes(locale);
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}>
    <header className="page-intro container"><p className="eyebrow">{t.notes.eyebrow}</p><h1><Lines value={t.notes.title}/></h1><p className="lead">{t.notes.lead}</p><p className="editorial-boundary">{t.notes.boundary.replace("LinkedIn ↗","")}<a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>.</p></header>
    <section className="container section catalog-section" aria-label={t.notes.eyebrow}><Catalog locale={locale} kind="notes" items={notes.map((note)=>({href:localePath(locale,`/notes/${note.slug}`),title:note.title,summary:note.thesis,category:localizedTerritory(locale,note.territory).toLowerCase(),meta:note.state==="EXPLORING"?t.notes.exploring:t.notes.implementation}))}/></section>
  </main>;
}

export function LocalizedNote({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getMessages(locale);
  const note = findLocalizedNote(locale, slug);
  if (!note) notFound();
  const records = note.relatedEvidenceIds.map((id)=>findEvidenceBySlug(id.toLowerCase())).filter((record)=>record!==undefined);
  const relatedSystemSlug = note.systemName === "AutoPulse" ? "autopulse" : note.systemName === "CV Engine" ? "cv-engine" : null;
  return <main id="main-content" lang={locale} className="paper reading-main" tabIndex={-1}>
    <article className="container reading-article">
      <Link href={localePath(locale,"/notes")} className="back-link">{t.notes.back}</Link>
      <header className="reading-heading"><p className="eyebrow">{localizedTerritory(locale,note.territory)} / {note.state==="EXPLORING"?t.notes.exploring:t.notes.implementation}</p><h1>{note.title}</h1><p className="lead">{note.thesis}</p><p className="note-byline">Eduardo Merino{note.systemName?` · ${note.systemName}`:""}</p></header>
      <div className="prose note-body">{note.systemName==="CV Engine"&&<aside className="reading-notice">{t.notes.historicalCv}</aside>}{note.sections.map((section)=><section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}{note.currentBoundary&&<aside className="reading-notice"><h2>{t.notes.scope}</h2><p>{note.currentBoundary}</p></aside>}</div>
      <footer className="reading-relations"><h2>{t.notes.reasoning}</h2>{relatedSystemSlug&&<Link className="text-link" href={localePath(locale,`/systems/${relatedSystemSlug}`)}>{t.common.explore} {note.systemName} <span aria-hidden="true">↗</span></Link>}{records.map((record)=><Link className="relation-link" key={record.slug} href={localePath(locale,`/evidence/${record.slug}`)}>{record.title} <span aria-hidden="true">↗</span></Link>)}<Link className="text-link" href={localePath(locale,"/contact")}>{t.common.contact} <span aria-hidden="true">↗</span></Link></footer>
    </article>
  </main>;
}

export function localizedNoteStaticSlugs() {
  return localizedNotes("en").map((note)=>note.slug);
}
