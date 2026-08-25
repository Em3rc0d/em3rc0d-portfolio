import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {NotesIndex} from "@/components/notes/notes-index";
import {SiteHeader} from "@/components/shell/site-header";
import {getLocalizedNotes} from "@/content/localized";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";
import "../../visual-acceptance-v2d.css";

interface LocalePageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: "Metadata"});
  return {
    title: t("notesTitle"),
    description: t("notesDescription"),
    alternates: bilingualAlternates("/notes", locale),
  };
}

export default async function NotesPage({params}: LocalePageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className="notes-page">
      <div className="public-carbon-header"><SiteHeader /></div>
      <NotesIndex notes={getLocalizedNotes(locale)} />
    </main>
  );
}
