import Link from 'next/link';
import { systemCases, featuredSystems } from '@/content/systems/index';
import { SystemArtifact } from '@/components/systems/system-artifact';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'Projects — Eduardo Merino',
  'Selected software projects by Eduardo Merino across mobile, full-stack development, geospatial systems, automation and applied AI.',
  '/systems'
);

export default function SystemsPage() {
  const more = systemCases.filter(s=>s.placement!=='FLAGSHIP');
  return <main id="main-content" tabIndex={-1}>
    <header className="page-intro container">
      <p className="eyebrow accent">Projects</p>
      <h1>Things I’ve built.</h1>
      <p className="lead">A selection of software products and engineering work. Start with the three featured projects, or browse the rest.</p>
    </header>

    <section className="container" aria-label="Featured projects">
      {featuredSystems.map((system,i)=><article className={`system-encounter encounter-${i}`} key={system.slug} data-accent={system.accent}>
        <div className="encounter-copy">
          <p className="eyebrow accent">{system.category}</p>
          <h2>{system.name}</h2>
          <p className="encounter-summary">{system.summary}</p>
          <p className="encounter-built">{system.built}</p>
          <Link className="text-link" href={`/systems/${system.slug}`}>View project <span aria-hidden="true">↗</span></Link>
        </div>
        <SystemArtifact system={system}/>
      </article>)}
    </section>

    <section className="section container">
      <div className="section-head">
        <div><p className="eyebrow accent">More projects</p><h2>More work,<br/>same curiosity.</h2></div>
        <p>Products, research directions, professional contributions and earlier full-stack work.</p>
      </div>
      <div className="supporting-systems">
        {more.map(system=><Link href={`/systems/${system.slug}`} key={system.slug}>
          <span className="eyebrow">Project</span>
          <div><h3>{system.name}</h3><p>{system.summary}</p></div>
          <span className="row-arrow" aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </section>

    <section className="conversation section rule-top">
      <div className="container split"><div><p className="eyebrow accent">Want to know more?</p><h2>Pick a project.<br/>Or start a conversation.</h2></div><div className="professional-copy"><p className="lead">Each project page has the deeper engineering details for people who want them.</p><Link href="/contact" className="button primary">Contact me <span aria-hidden="true">↗</span></Link></div></div>
    </section>
  </main>;
}
