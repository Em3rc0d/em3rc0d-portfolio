import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {IBM_Plex_Mono, Instrument_Sans} from "next/font/google";
import {notFound} from "next/navigation";
import {DynamicSemantics} from "@/components/accessibility/dynamic-semantics";
import {MotionPolicy} from "@/components/accessibility/motion-policy";
import {SkipLink} from "@/components/accessibility/skip-link";
import {routing, type AppLocale} from "@/i18n/routing";
import {getSiteOrigin} from "@/lib/site-config";
import "../globals.css";
import "../internal.css";
import "../foundation.css";
import "../startup.css";
import "../autopulse.css";
import "../autopulse-fixes.css";
import "../evidence.css";
import "../cv-engine.css";
import "../cv-engine-fixes.css";
import "../public-surfaces.css";
import "../public-surfaces-fixes.css";
import "../accessibility.css";
import "../accessibility-fixes.css";
import "../visual-material-v2.css";
import "../visual-material-v2-fixes.css";
import "../usability-v2.css";
import "../evidence-library-usability.css";
import "../material-reality-acceptance.css";
import "../commercial-refinement.css";
import "../reputation-completeness.css";
import "../reputation-completeness-fixes.css";
import "../frame-discipline.css";
import "../frame-discipline-fixes.css";
import "../i18n.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-interface",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteOrigin = getSiteOrigin();
const metadataBase = siteOrigin ?? undefined;

const localeMetadata: Record<AppLocale, {
  title: string;
  description: string;
  keywords: string[];
  openGraphLocale: string;
}> = {
  en: {
    title: "Eduardo Merino — Software Systems & Applied AI",
    description:
      "Software developer building, recovering and improving custom software systems, full-stack products and applied AI for messy operational problems.",
    keywords: [
      "software developer",
      "custom software systems",
      "full stack development",
      "applied AI",
      "workflow automation",
      "software recovery",
      "systems integration",
    ],
    openGraphLocale: "en_US",
  },
  es: {
    title: "Eduardo Merino — Sistemas de Software e IA Aplicada",
    description:
      "Desarrollador de software que construye, recupera y mejora sistemas de software a medida, productos full stack e IA aplicada para problemas operativos complejos.",
    keywords: [
      "desarrollador de software",
      "sistemas de software a medida",
      "desarrollo full stack",
      "IA aplicada",
      "automatización de procesos",
      "recuperación de software",
      "integración de sistemas",
    ],
    openGraphLocale: "es_PE",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const copy = localeMetadata[locale];

  return {
    metadataBase,
    title: {
      default: copy.title,
      template: "%s — Eduardo Merino",
    },
    description: copy.description,
    applicationName: "THE BUILD ROOM",
    authors: [{name: "Eduardo Merino"}],
    creator: "Eduardo Merino",
    keywords: copy.keywords,
    openGraph: {
      type: "website",
      siteName: "THE BUILD ROOM",
      title: copy.title,
      description: copy.description,
      locale: copy.openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const personJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Eduardo Merino",
    ...(siteOrigin ? {url: siteOrigin.toString()} : {}),
    jobTitle: "Software Developer",
    sameAs: [
      "https://www.linkedin.com/in/emerinoc",
      "https://github.com/Em3rc0d",
    ],
    knowsAbout: [
      "Custom software systems",
      "Full-stack software development",
      "Systems integration",
      "Software recovery and modernization",
      "Workflow automation",
      "Applied artificial intelligence",
    ],
  });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: personJsonLd}}
        />
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <DynamicSemantics />
          <MotionPolicy>{children}</MotionPolicy>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
