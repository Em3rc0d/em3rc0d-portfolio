import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/content/profile';
import { ProfessionalSnapshot } from '@/components/profile/professional-snapshot';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'About — Eduardo Merino',
  'Eduardo Merino is a Software Engineer in Lima focused on full-stack products and applied AI.',
  '/about'
);

export default function AboutPage(){
  return <main id="main-content" tabIndex={-1}>
    <section className="container section about-intro">
      <div>
        <p className="eyebrow accent">About me</p>
        <h1>Hi, I’m<br/>Eduardo Merino.</h1>
        <p className="lead">Software Engineer focused on building complete products from idea to release.</p>
        <p className="about-personal">I work across frontend, backend, data, integrations, mobile and applied AI. I enjoy taking a real problem, understanding what matters and turning it into software that is useful, clear and reliable.</p>
        <div className="actions">
          <Link href="/systems" className="button primary">View projects <span aria-hidden="true">↗</span></Link>
          <a href={profile.cvDownload} className="hero-secondary">Download CV <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <figure className="about-portrait">
        <Image src={profile.portrait} alt="Eduardo Merino, Software Engineer" width={480} height={594} sizes="(max-width: 767px) 85vw, 420px" priority/>
        <figcaption>{profile.role} · {profile.specialty}</figcaption>
      </figure>
    </section>

    <section className="container recruiter-strip about-snapshot"><ProfessionalSnapshot education/></section>

    <section className="professional-section section">
      <div className="container split">
        <div><p className="eyebrow accent">What I work on</p><h2>Products, systems<br/>and useful automation.</h2></div>
        <div className="case-body">
          <p className="lead">My projects span vehicle telemetry, geospatial planning, AI workflows, career tooling and operational software.</p>
          <p className="about-personal">The common thread is simple: I like owning the full path from understanding the problem to shipping something that works.</p>
          <Link className="text-link" href="/systems">Explore projects <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>

    <section className="conversation section rule-top">
      <div className="container split"><div><p className="eyebrow accent">Contact</p><h2>Have something<br/>worth building?</h2></div><div className="professional-copy"><p className="lead">I’m open to roles, collaborations and interesting software projects.</p><Link href="/contact" className="button primary">Contact me <span aria-hidden="true">↗</span></Link></div></div>
    </section>
  </main>;
}
