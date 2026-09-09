import type { Metadata } from "next";
import { absoluteSiteUrl } from "./site-config";
import { languageAlternates, localePath, type Locale } from "@/i18n/config";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  imagePath = "/opengraph-image",
  locale: Locale = "en",
): Metadata {
  const localized = localePath(locale, path);
  const canonical = absoluteSiteUrl(localized);
  const image = absoluteSiteUrl(imagePath);
  const languages: Record<string, string> = {};
  for (const [key, value] of Object.entries(languageAlternates(path))) {
    const url = absoluteSiteUrl(value);
    if (url) languages[key] = url;
  }
  const socialTitle = title.includes("Eduardo Merino") ? title : `${title} — Eduardo Merino`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    ...(canonical ? { alternates: { canonical, ...(Object.keys(languages).length ? { languages } : {}) } } : {}),
    openGraph: {
      type: path.startsWith("/systems/") || path.startsWith("/notes/") ? "article" : "website",
      siteName: "THE BUILD ROOM",
      title: socialTitle,
      description,
      locale: locale === "es" ? "es_PE" : locale === "pt" ? "pt_BR" : "en_US",
      ...(canonical ? { url: canonical } : {}),
      images: image ? [{ url: image, width: 1200, height: 630, alt: socialTitle }] : [],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: image ? [image] : [] },
  };
}
