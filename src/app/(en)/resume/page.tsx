import { LocalizedResume } from "@/i18n/pages/resume";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Eduardo Merino — Résumé",
  "Software Engineer · Full Stack · Applied AI · Systems. Professional experience and selected engineering work.",
  "/resume",
);

export default function ResumePage() {
  return <LocalizedResume locale="en" />;
}
