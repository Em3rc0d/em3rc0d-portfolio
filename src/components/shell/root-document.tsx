import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";
import { PortfolioScene } from "@/components/scene/portfolio-scene";
import { getSiteOrigin } from "@/lib/site-config";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";

const sans = localFont({
  src: "../../assets/fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--font-interface",
  display: "optional",
  weight: "400 700",
});
const mono = localFont({
  src: [
    { path: "../../assets/fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../../assets/fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "optional",
  preload: false,
});

const origin = getSiteOrigin();
export const baseMetadata: Metadata = {
  metadataBase: origin ?? undefined,
  title: { default: "Eduardo Merino — Software Engineer · Full Stack & Applied AI", template: "%s — Eduardo Merino" },
  description: `${profile.proposition} ${profile.scope}`,
  applicationName: "Eduardo Merino — Engineering Portfolio",
  authors: [{ name: profile.name }],
  creator: profile.name,
  robots: { index: true, follow: true },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  ...(origin ? { url: origin.toString() } : {}),
  jobTitle: profile.role,
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [
    "Full-stack software development",
    "Systems integration",
    "Applied artificial intelligence",
    "Workflow automation",
    "Decision systems",
  ],
};

export function RootDocument({ lang, skipLabel, children }: { lang: Locale; skipLabel: string; children: ReactNode }) {
  return <html lang={lang} className={`${sans.variable} ${mono.variable}`}><body id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}/>
    <a className="skip-link" href="#main-content">{skipLabel}</a>
    <SiteHeader/>{children}<SiteFooter/><PortfolioScene/>
  </body></html>;
}
