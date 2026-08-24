import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {HomePage} from "@/components/home/home-page";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";

interface LocalePageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return {alternates: bilingualAlternates("/", locale)};
}

export default async function Home({params}: LocalePageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <HomePage locale={locale} />;
}
