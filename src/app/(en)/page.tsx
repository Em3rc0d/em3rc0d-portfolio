import Image from 'next/image';
import Link from 'next/link';
import { CoreFallback } from '@/components/scene/core-fallback';
import { SystemArtifact } from '@/components/systems/system-artifact';
import { ProfessionalSnapshot } from '@/components/profile/professional-snapshot';
import { featuredSystems } from '@/content/systems/index';
import { profile } from '@/content/profile';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'Eduardo Merino — Software Engineer · Full Stack & Applied AI',
  'Software Engineer building full-stack products, automation and applied AI. Explore selected projects, download the CV and get in touch.',
  '/'
);

export default function Home() {
  return <main id="main-content" tabIndex={-1}>
    <section className="hero container">
      <div className="hero-copy enter">
        <p className="eyebrow hero-identity"><span className="identity-line" aria-hidden="true"/>Eduardo Merino <span>/</span> {profile.role} · {profile.specialty}</p>
        <h1><span className="hero-line">I build software</span><span className="hero-line hero-line-accent">people can use.</span></h1>
        <p className="hero-statement">From idea to working product.</p>
        <p className="hero-scope">Full-stack development, automation and applied AI across real projects.</p>
        <div className="actions">
          <Link href="/systems" className="button primary">View projects <span aria-hidden="true">↗</span></Link>
          <a href={profile.cvDownload} className="hero-secondary">Download CV (PDF) <span aria-hidden="true">↓</span></a>
          <Link href="/contact" className="hero-secondary">Contact me <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="hero-art">
        <div className="core-stage" data-scene-slot="HOME"><CoreFallback/></div>
        <div className="core-caption"><span className="eyebrow">Software · Products · AI</span><span className="core-caption-index" aria-hidden="true">01 — 03</span></div>
      </div>
      <div className="hero-bottom"><span>Software Engineer · Lima, Peru</span><a href="#projects">See selected work <span aria-hidden="true">↓</span></a></div>
    </section>

    <section className="container recruiter-strip" aria-label="Professional snapshot"><ProfessionalSnapshot/></section>

    <section className="selected-section section container" id="projects">
      <div className="section-head">
        <div><p className="eyebrow accent">Selected projects</p><h2>Built, tested<br/>and worth showing.</h2></div>
        <p>Three projects that show how I work across mobile, geospatial systems and AI-powered workflows.</p>
      </div>
      {featuredSystems.map((system,i)=><article key={system.slug} className={`system-encounter encounter-${i}`} data-accent={system.accent}>
        <div className="encounter-copy">
          <p className="eyebrow accent"><span className="encounter-number">0{i+1}</span>{system.category}</p>
          <h3><Link href={`/systems/${system.slug}`}>{system.name}</Link></h3>
          <p className="encounter-summary">{system.summary}</p>
          <p className="encounter-built">{system.built}</p>
          <Link href={`/systems/${system.slug}`} className="text-link">View project <span aria-hidden="true">↗</span></Link>
        </div>
        <SystemArtifact system={system}/>
      </article>)}
      <div className="all-systems-row">
        <p>There is more work behind these three, including product experiments, professional contributions and earlier full-stack projects.</p>
        <Link href="/systems" className="text-link">See all projects <span aria-hidden="true">↗</span></Link>
      </div>
    </section>

    <section className="human-section section container">
      <div className="human-portrait"><Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 50vw, 300px"/></div>
      <div className="human-copy">
        <p className="eyebrow accent">About me</p>
        <h2>Hi, I’m Eduardo.</h2>
        <p className="lead">I’m a Software Engineer from Lima focused on building complete products: interface, backend, data, integrations and AI when it genuinely helps.</p>
        <div className="actions">
          <Link href="/about" className="text-link">More about me <span aria-hidden="true">↗</span></Link>
          <a href={profile.cvDownload} className="text-link">Download CV <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>

    <section className="conversation section rule-top">
      <div className="container split">
        <div><p className="eyebrow accent">Get in touch</p><h2>Have a project,<br/>role or idea?</h2></div>
        <div className="professional-copy">
          <p className="lead">I’m open to conversations about software engineering, full-stack products and applied AI.</p>
          <Link href="/contact" className="button primary">Contact me <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  </main>;
}
