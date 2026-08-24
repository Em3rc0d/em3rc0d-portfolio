import type { Metadata } from "next";

const description =
  "Desarrollador de software que construye, recupera y mejora sistemas de software a medida, productos full stack e IA aplicada para problemas operativos complejos.";

export const metadata: Metadata = {
  title: {
    default: "Eduardo Merino — Sistemas de Software e IA Aplicada",
    template: "%s — Eduardo Merino",
  },
  description,
  keywords: [
    "desarrollador de software",
    "sistemas de software a medida",
    "desarrollo full stack",
    "IA aplicada",
    "automatización de procesos",
    "recuperación de software",
    "integración de sistemas",
  ],
  openGraph: {
    type: "website",
    siteName: "THE BUILD ROOM",
    title: "Eduardo Merino — Sistemas de Software e IA Aplicada",
    description,
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Merino — Sistemas de Software e IA Aplicada",
    description,
  },
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="es">{children}</div>;
}
