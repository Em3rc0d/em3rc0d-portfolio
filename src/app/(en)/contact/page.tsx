import { profile } from '@/content/profile';
import { EmailActions } from '@/components/contact/email-actions';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata(
  'Contact — Eduardo Merino',
  'Contact Eduardo Merino about software engineering, full-stack products, automation and applied AI.',
  '/contact'
);

export default function ContactPage(){
  return <main id="main-content" tabIndex={-1}>
    <section className="container contact-intro">
      <p className="eyebrow accent">Contact</p>
      <h1>Let’s talk.</h1>
      <div className="contact-opening">
        <p className="lead">A role, a project, a collaboration or simply an interesting software problem — send me a message.</p>
        <EmailActions/>
      </div>
    </section>

    <section className="container section contact-channels">
      <div><h2>Choose the easiest way.</h2><p className="muted">No form. No long process.</p></div>
      <nav aria-label="Contact channels">
        <a href={`mailto:${profile.email}`}><span>Direct</span><strong>Email ↗</strong></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>Professional</span><strong>LinkedIn ↗</strong></a>
        <a href={profile.github} target="_blank" rel="noreferrer"><span>Code</span><strong>GitHub ↗</strong></a>
        <a href={profile.cvDownload}><span>Résumé</span><strong>Download CV ↓</strong></a>
      </nav>
    </section>
  </main>;
}
