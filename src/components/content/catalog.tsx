"use client";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";

export interface CatalogItem { href: string; title: string; summary: string; category: string; meta: string; }

const copy = {
  en: { search: "Search", evidencePlaceholder: "A claim, system or evidence ID", notesPlaceholder: "A topic or idea", system: "System", topic: "Topic", allSystems: "All systems", allTopics: "All topics", record: "record", records: "records", matching: " matching your selection", no: "No matching", try: "Try a broader term or clear the filters.", clear: "Clear filters", read: "Read note", inspect: "Inspect proof" },
  es: { search: "Buscar", evidencePlaceholder: "Una afirmación, sistema o ID de evidencia", notesPlaceholder: "Un tema o idea", system: "Sistema", topic: "Tema", allSystems: "Todos los sistemas", allTopics: "Todos los temas", record: "registro", records: "registros", matching: " que coinciden con tu selección", no: "Sin coincidencias en", try: "Prueba un término más amplio o limpia los filtros.", clear: "Limpiar filtros", read: "Leer nota", inspect: "Inspeccionar evidencia" },
  pt: { search: "Buscar", evidencePlaceholder: "Um claim, sistema ou ID de evidência", notesPlaceholder: "Um tema ou ideia", system: "Sistema", topic: "Tema", allSystems: "Todos os sistemas", allTopics: "Todos os temas", record: "registro", records: "registros", matching: " correspondentes à sua seleção", no: "Nenhuma correspondência em", try: "Tente um termo mais amplo ou limpe os filtros.", clear: "Limpar filtros", read: "Ler nota", inspect: "Inspecionar evidência" },
} as const;

export function Catalog({items, kind, locale="en"}: {items: readonly CatalogItem[]; kind: "notes" | "evidence"; locale?: Locale}) {
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("all");
  const t=copy[locale];
  const categories=[...new Set(items.map(item=>item.category))];
  const filtered=items.filter(item=>(category==="all"||item.category===category)&&`${item.title} ${item.summary} ${item.category} ${item.meta}`.toLowerCase().includes(query.trim().toLowerCase()));
  const kindLabel=kind==="evidence"?(locale==="en"?"evidence":locale==="es"?"evidencia":"evidências"):(locale==="en"?"notes":"notas");
  return <div className="catalog"><div className="catalog-controls"><label htmlFor={`${kind}-${locale}-search`}>{t.search} {kindLabel}<input id={`${kind}-${locale}-search`} type="search" value={query} placeholder={kind==="evidence" ? t.evidencePlaceholder : t.notesPlaceholder} onChange={event=>setQuery(event.target.value)}/></label><label htmlFor={`${kind}-${locale}-category`}>{kind==="evidence"?t.system:t.topic}<select id={`${kind}-${locale}-category`} value={category} onChange={event=>setCategory(event.target.value)}><option value="all">{kind==="evidence"?t.allSystems:t.allTopics}</option>{categories.map(item=><option key={item}>{item}</option>)}</select></label></div><p className="catalog-count" role="status">{filtered.length} {filtered.length===1?t.record:t.records}{query||category!=="all"?t.matching:""}</p><div className="catalog-list">{filtered.map(item=><article key={item.href}><div className="catalog-meta"><span className="eyebrow">{item.category}</span><span>{item.meta}</span></div><div><h2><Link href={item.href}>{item.title}</Link></h2><p>{item.summary}</p><Link className="text-link" href={item.href} aria-label={`${kind==="notes"?t.read:t.inspect} ${item.title}`}>{kind==="notes"?t.read:t.inspect} <span aria-hidden="true">↗</span></Link></div></article>)}</div>{filtered.length===0&&<div className="empty-state"><h2>{t.no} {kindLabel}.</h2><p>{t.try}</p><button className="button" onClick={()=>{setQuery("");setCategory("all");}}>{t.clear}</button></div>}</div>;
}
