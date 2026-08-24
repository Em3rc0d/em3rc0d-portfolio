import type {Metadata} from "next";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {ContactPageView} from "@/components/contact/contact-page";
import {getPathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {bilingualAlternates} from "@/lib/i18n-metadata";
import {absoluteSiteUrl} from "@/lib/site-config";
import "../../visual-acceptance-v2b.css";

interface LocalePageProps {
  params: Promise<{locale: string}>;
}

export async function generateMetadata({params}: LocalePageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: "Metadata"});
  const description = t("contactDescription");
  const routePath = "/contact";
  const publicPath = getPathname({locale, href: routePath});
  const canonicalUrl = absoluteSiteUrl(publicPath);
  const socialImage = absoluteSiteUrl("/opengraph-image");
  const socialTitle = locale === "es"
    ? "Inicia una conversación de software con Eduardo Merino"
    : "Start a software conversation with Eduardo Merino";

  return {
    title: t("contactTitle"),
    description,
    alternates: bilingualAlternates(routePath, locale),
    openGraph: {
      type: "website",
      siteName: "THE BUILD ROOM",
      title: socialTitle,
      description,
      ...(canonicalUrl ? {url: canonicalUrl} : {}),
      ...(socialImage ? {images: [{url: socialImage, width: 1200, height: 630, alt: "Eduardo Merino — THE BUILD ROOM"}]} : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(socialImage ? {images: [socialImage]} : {}),
    },
  };
}

export default async function ContactPage({params}: LocalePageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ContactPageView locale={locale} />;
}
