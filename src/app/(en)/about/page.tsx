import { LocalizedAbout } from "@/i18n/pages/about-contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About — Eduardo Merino",
  "Eduardo Merino is a Software Engineer and full-stack builder working across web, mobile, data, automation and applied AI.",
  "/about",
);

export default function AboutPage() {
  return <LocalizedAbout locale="en" />;
}
