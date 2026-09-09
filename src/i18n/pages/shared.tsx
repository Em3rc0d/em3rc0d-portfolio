import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export function Lines({ value }: { value: string }) {
  return <>{value.split("\n").map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <br/>}{part}</span>)}</>;
}

export function LocalizedConversation({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return <section className="conversation container section">
    <p className="eyebrow accent">{t.conversation.eyebrow}</p>
    <h2>{t.conversation.title1}<br/><span>{t.conversation.title2}</span></h2>
    <div className="conversation-bottom">
      <p>{t.conversation.text}</p>
      <Link href={localePath(locale, "/contact")} className="button primary">{t.common.contact} <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
