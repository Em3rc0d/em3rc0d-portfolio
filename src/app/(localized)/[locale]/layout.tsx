import type { ReactNode } from "react";
import { RootDocument, baseMetadata } from "@/components/shell/root-document";
import { prefixedLocales, type Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import "@/styles/index.css";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };
export const metadata = baseMetadata;
export function generateStaticParams() { return prefixedLocales.map((locale) => ({ locale })); }

export default async function LocalizedLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "pt" ? "pt" : rawLocale === "es" ? "es" : "en";
  return <RootDocument lang={locale} skipLabel={getMessages(locale).skip}>{children}</RootDocument>;
}
