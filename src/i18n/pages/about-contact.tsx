import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { localePath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { Lines, LocalizedConversation } from "./shared";

export function LocalizedAbout({ locale }: { locale: Locale }) {
  const t=getMessages(locale);
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="container section about-intro"><div><p className="eyebrow accent">{t.about.eyebrow}</p><h1><Lines value={t.about.title}/></h1><p className="lead">{t.home.proposition}</p><p className="about-personal">{t.about.personal}</p><Link href={localePath(locale,"/contact")} className="button primary">{t.common.contact} <span aria-hidden="true">↗</span></Link></div><figure className="about-portrait"><Image src={profile.portrait} alt="Eduardo Merino" width={480} height={594} sizes="(max-width: 767px) 85vw, 420px" priority/><figcaption>{t.about.portrait}</figcaption></figure></section>
    <section className="professional-section section"><div className="container split"><div><p className="eyebrow accent">{t.about.connects}</p><h2><Lines value={t.about.connectsTitle}/></h2></div><div className="case-body"><p className="lead">{t.about.connectsLead}</p><p className="about-personal">{t.about.connectsText}</p><Link className="text-link" href={localePath(locale,"/systems/infrastructure-site-mapper")}>{t.about.professional} <span aria-hidden="true">↗</span></Link></div></div></section>
    <section className="container section" id="method"><div className="section-head"><div><p className="eyebrow accent">{t.about.method}</p><h2><Lines value={t.about.methodTitle}/></h2></div><p>{t.about.methodText}</p></div><ol className="working-model">{t.working.map((step,i)=><li key={step.title}><span className="eyebrow">0{i+1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol></section>
    <section className="paper section"><div className="container split"><div><p className="eyebrow">{t.about.truths}</p><h2><Lines value={t.about.truthsTitle}/></h2></div><ul className="about-rules">{t.about.rules.map((rule)=><li key={rule}>{rule}</li>)}</ul></div></section>
    <LocalizedConversation locale={locale}/>
  </main>;
}

export function LocalizedContact({ locale }: { locale: Locale }) {
  const t=getMessages(locale);
  return <main id="main-content" lang={locale} tabIndex={-1}>
    <section className="container contact-intro"><p className="eyebrow accent">{t.contact.eyebrow}</p><h1><Lines value={t.contact.title}/></h1><div className="contact-opening"><p className="lead">{t.contact.opening}</p><a href={profile.linkedin} target="_blank" rel="noreferrer" className="button primary">{t.contact.linkedin} <span aria-hidden="true">↗</span></a></div></section>
    <section className="container section rule-top contact-context"><div><p className="eyebrow accent">{t.contact.useful}</p><h2><Lines value={t.contact.usefulTitle}/></h2></div><ol>{t.contact.prompts.map((item)=><li key={item.title}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol></section>
    <section className="paper section"><div className="container"><p className="eyebrow">{t.contact.ways}</p><div className="contact-paths">{Object.values(t.problemPaths).map((path)=><div key={path.title}><h2>{path.title}</h2><p>{path.detail}</p></div>)}</div></div></section>
    <section className="container section contact-channels"><div><h2><Lines value={t.contact.channelsTitle}/></h2><p className="muted">{t.contact.channelsLead}</p></div><nav aria-label="Contact channels"><a href={profile.linkedin} target="_blank" rel="noreferrer"><span>{t.contact.start}</span><strong>LinkedIn ↗</strong></a><a href={profile.github} target="_blank" rel="noreferrer"><span>{t.contact.inspect}</span><strong>GitHub ↗</strong></a><Link href={localePath(locale,"/systems")}><span>{t.contact.understand}</span><strong>{t.nav.systems} →</strong></Link></nav></section>
  </main>;
}
