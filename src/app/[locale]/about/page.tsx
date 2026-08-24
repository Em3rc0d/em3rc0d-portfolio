import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {AboutPageView} from "@/components/about/about-page";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";
import "../../about/visual-acceptance.css";

interface LocalePageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: "Metadata"});
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: bilingualAlternates("/about", locale),
  };
}

export default async function AboutPage({params}: LocalePageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <AboutPageView locale={locale} />;
}
