import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {SystemsIndex} from "@/components/systems/systems-index";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";
import "../../visual-acceptance-v2.css";

interface LocalePageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: "Metadata"});
  return {
    title: t("systemsTitle"),
    description: t("systemsDescription"),
    alternates: bilingualAlternates("/systems", locale),
  };
}

export default async function SystemsPage({params}: LocalePageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <SystemsIndex locale={locale} />;
}
