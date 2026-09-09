import Link from 'next/link';
import { notFound } from 'next/navigation';
import { systemCases, findSystem, featuredSystems } from '@/content/systems/index';
import { findEvidenceBySlug } from '@/content/evidence-index';
import { SystemArtifact } from '@/components/systems/system-artifact';
import { SystemMedia } from '@/components/systems/system-media';
import { Conversation } from '@/components/content/conversation';
import { pageMetadata } from '@/lib/metadata';
import { absoluteSiteUrl } from '@/lib/site-config';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return systemCases.filter(s=>s.publicability!=='PRIVATE').map(s=>({slug:s.slug})); }
export async function generateMetadata({params}: Props) { const {slug}=await params; const system=findSystem(slug);return system?pageMetadata(system.name,system.summary,`/systems/${slug}`,`/systems/${slug}/opengraph-image`):{}; }
export default async function SystemPage({params}: Props) {
 const {slug}=await params; const system=findSystem(slug); if(!system)notFound();
 const evidence=system.evidence.map(id=>findEvidenceBySlug(id.toLowerCase())).filter(item=>item!==undefined);
 const url=absoluteSiteUrl(`/systems/${slug}`); const jsonLd={'@context':'https://schema.org','@type':'CreativeWork',name:system.name,description:system.summary,...(url?{url}:{}),creator:{'@type':'Person',name:'Eduardo Merino'}};
 return <main id="main-content" className="system-page" data-accent={system.accent} tabIndex={-1}>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/>
 <header className="case-hero container"><Link className="back-link" href="/systems">← All systems</Link><div className="case-hero-grid"><div><p className="eyebrow accent">{system.category}</p><h1>{system.name}</h1><p className="case-thesis">{system.summary}</p><p className="case-built">{system.built}</p><div className="actions"><a href="#problem" className="button primary">Inside the system <span aria-hidden="true">↓</span></a><Link href="/contact" className="text-link">Let’s talk <span aria-hidden="true">↗</span></Link></div></div><SystemArtifact system={system}/></div><div className="case-context"><div><span className="eyebrow">Current state</span><p>{system.state.label}</p></div><div><span className="eyebrow">My role</span><p>{system.ownership}</p></div></div></header>
 <nav className="case-nav container" aria-label={`${system.name} sections`}><a href="#problem">The problem</a><a href="#what-it-does">What it does</a>{system.media?.length ? <a href="#product-reality">See it</a> : null}<a href="#current-state">Current state</a><a href="#engineering">Engineering</a><a href="#evidence">Evidence</a></nav>
 <section className="case-problem section container split" id="problem"><div><p className="eyebrow accent">The problem</p><h2>What needed<br/>to change?</h2></div><div className="case-body"><p className="lead">{system.problem}</p><h3>Why it matters</h3><p>{system.importance}</p></div></section>
 <section className="case-capabilities section rule-top" id="what-it-does"><div className="container split"><div><p className="eyebrow accent">What I built</p><h2>A useful path<br/>through the problem.</h2><p className="muted case-built">{system.built}</p></div><ol>{system.capabilities.map((cap,i)=><li key={cap}><span className="eyebrow">0{i+1}</span><p>{cap}</p></li>)}</ol></div></section>
 <SystemMedia system={system}/>
 <section className="state-section section container" id="current-state"><p className="eyebrow accent">Current state</p><div className="split"><h2>{system.state.label}</h2><div className="case-body"><p>{system.state.detail}</p><p className="state-boundary">{system.state.boundary}</p></div></div></section>
 <section className="engineering-section section" id="engineering"><div className="container"><div className="section-head"><div><p className="eyebrow accent">Optional depth</p><h2>How the engineering<br/>holds together.</h2></div><p>Open the parts you want to inspect. The reasoning, trade-offs and limitations are part of the work.</p></div><div className="depth-disclosures">
 <details id="how-it-works"><summary><span className="eyebrow">01</span><h3>How it works</h3><span aria-hidden="true">+</span></summary><div className="depth-content">{system.architecture.map(item=><section key={item.title}><h4>{item.title}</h4><p>{item.body}</p></section>)}</div></details>
 <details id="decisions"><summary><span className="eyebrow">02</span><h3>Key engineering decisions</h3><span aria-hidden="true">+</span></summary><div className="depth-content">{system.decisions.map(item=><section key={item.title}><h4>{item.title}</h4><p>{item.body}</p></section>)}</div></details>
 <details id="failure"><summary><span className="eyebrow">03</span><h3>Failure modes & limitations</h3><span aria-hidden="true">+</span></summary><div className="depth-content"><ul>{system.limitations.map(item=><li key={item}>{item}</li>)}</ul></div></details>
 </div></div></section>
 <section className="paper section" id="evidence"><div className="container"><div className="section-head"><div><p className="eyebrow">Inspect the proof</p><h2>Trust has<br/>a source.</h2></div><p>Each record states the claim, what supports it and what remains outside its scope.</p></div>{evidence.length>0&&<div className="proof-list">{evidence.map(record=><Link key={record.id} href={`/evidence/${record.slug}`}><span className="eyebrow">{record.type.toLowerCase()}</span><h3>{record.title}</h3><span aria-hidden="true">↗</span></Link>)}</div>}{system.sourceBoundary&&<p className="source-boundary">{system.sourceBoundary}</p>}{system.source&&<a className="text-link source-link" href={system.source.href} target="_blank" rel="noreferrer">{system.source.label} <span aria-hidden="true">↗</span></a>}</div></section>
 <section className="section container related-systems"><p className="eyebrow accent">Another kind of problem</p>{featuredSystems.filter(s=>s.slug!==slug).slice(0,2).map(related=><Link key={related.slug} href={`/systems/${related.slug}`}><h2>{related.name}</h2><p>{related.summary}</p><span aria-hidden="true">↗</span></Link>)}</section><div className="rule-top"><Conversation/></div>
 </main>;
}
