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
  "Software Developer — Systems, Full Stack & Applied AI. I turn messy operational problems into working software.";
const metadataBase = getSiteOrigin() ?? undefined;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Eduardo Merino — The Build Room",
    template: "%s — Eduardo Merino",
  },
  description,
  applicationName: "THE BUILD ROOM",
  authors: [{ name: "Eduardo Merino" }],
  creator: "Eduardo Merino",
  openGraph: {
    type: "website",
    siteName: "THE BUILD ROOM",
    title: "Eduardo Merino — The Build Room",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Merino — The Build Room",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <SkipLink />
        <DynamicSemantics />
        <MotionPolicy>{children}</MotionPolicy>
      </body>
    </html>
  );
}
