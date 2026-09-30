import Image from "next/image";
import Link from "next/link";
import { EmailActions } from "@/components/contact/email-actions";
import { ProfessionalSnapshot } from "@/components/profile/professional-snapshot";
import { profile } from "@/content/profile";
import { localePath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { Lines, LocalizedConversation } from "./shared";

const channelCopy: Record<Locale, { direct: string; email: string; linkedin: string; github: string }> = {
  en: { direct: "Write directly", email: "Email", linkedin: "Start a professional conversation", github: "Inspect the public source" },
  es: { direct: "Escribir directamente", email: "Correo", linkedin: "Iniciar una conversación profesional", github: "Inspeccionar el código público" },
  pt: { direct: "Escrever diretamente", email: "E-mail", linkedin: "Iniciar uma conversa profissional", github: "Inspecionar o código público" },
};

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const t=getMessages(locale);
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="container section about-intro"><div><p className="eyebrow accent">{t.about.eyebrow}</p><h1><Lines value={t.about.title}/></h1><p className="lead">{t.home.proposition}</p><p className="about-personal">{t.about.personal}</p><Link href={localePath(locale,"/contact")} className="button primary">{t.common.contact} <span aria-hidden="true">↗</span></Link></div><figure className="about-portrait"><Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 85vw, 420px" priority/><figcaption>{profile.role} · {profile.specialty}</figcaption></figure></section>
    <section className="container recruiter-strip about-snapshot"><ProfessionalSnapshot locale={locale} education/></section>
    <section className="professional-section section"><div className="container split"><div><p className="eyebrow accent">{t.about.connects}</p><h2><Lines value={t.about.connectsTitle}/></h2></div><div className="case-body"><p className="lead">{t.about.connectsLead}</p><p className="about-personal">{t.about.connectsText}</p><Link className="text-link" href={localePath(locale,"/systems/infrastructure-site-mapper")}>{t.about.professional} <span aria-hidden="true">↗</span></Link></div></div></section>
    <section className="container section" id="method"><div className="section-head"><div><p className="eyebrow accent">{t.about.method}</p><h2><Lines value={t.about.methodTitle}/></h2></div><p>{t.about.methodText}</p></div><ol className="working-model">{t.working.map((step,i)=><li key={step.title}><span className="eyebrow">0{i+1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol></section>
    <section className="paper section"><div className="container split"><div><p className="eyebrow">{t.about.truths}</p><h2><Lines value={t.about.truthsTitle}/></h2></div><ul className="about-rules">{t.about.rules.map((rule)=><li key={rule}>{rule}</li>)}</ul></div></section>
    <LocalizedConversation locale={locale}/>
  </main>;
}

export function LocalizedContact({ locale }: { locale: Locale }) {
  const copy: Record<Locale, {
    eyebrow: string; title: string; lead: string; email: string; linkedin: string; github: string;
    note: string; cv: string;
  }> = {
    en: {
      eyebrow: "Contact", title: "Let’s talk.", lead: "A role, a project, a collaboration or a product idea — send me the context and we can start from there.",
      email: "Email", linkedin: "LinkedIn", github: "GitHub",
      note: "You do not need a polished brief. A few lines about what you are working on, what you need and what a useful result would look like are enough.",
      cv: "Download CV",
    },
    es: {
      eyebrow: "Contacto", title: "Hablemos.", lead: "Una oportunidad laboral, un proyecto, una colaboración o una idea de producto — cuéntame el contexto y empezamos desde ahí.",
      email: "Correo", linkedin: "LinkedIn", github: "GitHub",
      note: "No necesitas un brief perfecto. Bastan unas líneas sobre qué estás haciendo, qué necesitas y cómo se vería un buen resultado.",
      cv: "Descargar CV",
    },
    pt: {
      eyebrow: "Contato", title: "Vamos conversar.", lead: "Uma vaga, um projeto, uma colaboração ou uma ideia de produto — envie o contexto e podemos começar por aí.",
      email: "E-mail", linkedin: "LinkedIn", github: "GitHub",
      note: "Você não precisa de um briefing perfeito. Algumas linhas sobre o que está fazendo, o que precisa e como seria um bom resultado já bastam.",
      cv: "Baixar CV",
    },
  };
  const t = copy[locale];

  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="simple-contact-page container">
      <div className="simple-contact-grid">
        <div className="simple-contact-main">
          <p className="eyebrow accent">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="lead">{t.lead}</p>
          <EmailActions locale={locale}/>
          <p className="simple-contact-note">{t.note}</p>
        </div>
        <div>
          <p className="eyebrow">{locale === "es" ? "Canales" : locale === "pt" ? "Canais" : "Channels"}</p>
          <nav className="simple-contact-options" aria-label="Contact channels">
            <a href={`mailto:${profile.email}`}><span>{t.email}</span><strong>↗</strong></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>{t.linkedin}</span><strong>↗</strong></a>
            <a href={profile.github} target="_blank" rel="noreferrer"><span>{t.github}</span><strong>↗</strong></a>
            <a href={profile.cvDownload}><span>{t.cv}</span><strong>↓</strong></a>
          </nav>
        </div>
      </div>
    </section>
  </main>;
}
