import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import "./internal.css";
import "./foundation.css";

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

export const metadata: Metadata = {
  title: {
    default: "Eduardo Merino — The Build Room",
    template: "%s — Eduardo Merino",
  },
  description:
    "Software Developer — Systems, Full Stack & Applied AI. I turn messy operational problems into working software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
