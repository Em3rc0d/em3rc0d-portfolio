import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { DynamicSemantics } from "@/components/accessibility/dynamic-semantics";
import { MotionPolicy } from "@/components/accessibility/motion-policy";
import { SkipLink } from "@/components/accessibility/skip-link";
import { getSiteOrigin } from "@/lib/site-config";
import "./globals.css";
import "./internal.css";
import "./foundation.css";
import "./startup.css";
import "./autopulse.css";
import "./autopulse-fixes.css";
import "./evidence.css";
import "./cv-engine.css";
import "./cv-engine-fixes.css";
import "./public-surfaces.css";
import "./public-surfaces-fixes.css";
import "./accessibility.css";
import "./accessibility-fixes.css";
import "./visual-material-v2.css";
import "./visual-material-v2-fixes.css";
import "./usability-v2.css";
import "./evidence-library-usability.css";
import "./material-reality-acceptance.css";
import "./commercial-refinement.css";
import "./reputation-completeness.css";
import "./reputation-completeness-fixes.css";
import "./frame-discipline.css";
import "./frame-discipline-fixes.css";
import "./visual-acceptance-v2.css";
import "./visual-acceptance-v2b.css";
import "./visual-acceptance-v2c.css";
import "./visual-acceptance-v2d.css";
import "./visual-acceptance-v2e.css";

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

const description =
  "Software developer building, recovering and improving custom software systems, full-stack products and applied AI for messy operational problems.";
const siteOrigin = getSiteOrigin();
const metadataBase = siteOrigin ?? undefined;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Eduardo Merino — Software Systems & Applied AI",
    template: "%s — Eduardo Merino",
  },
  description,
  applicationName: "THE BUILD ROOM",
  authors: [{ name: "Eduardo Merino" }],
  creator: "Eduardo Merino",
  keywords: [
    "software developer",
    "custom software systems",
    "full stack development",
    "applied AI",
    "workflow automation",
    "software recovery",
    "systems integration",
  ],
  openGraph: {
    type: "website",
    siteName: "THE BUILD ROOM",
    title: "Eduardo Merino — Software Systems & Applied AI",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Merino — Software Systems & Applied AI",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eduardo Merino",
  ...(siteOrigin ? { url: siteOrigin.toString() } : {}),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
        />
        <SkipLink />
        <DynamicSemantics />
        <MotionPolicy>{children}</MotionPolicy>
      </body>
    </html>
  );
}
