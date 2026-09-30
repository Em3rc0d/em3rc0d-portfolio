import { LocalizedContact } from "@/i18n/pages/about-contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact — Eduardo Merino",
  "Contact Eduardo Merino about software roles, projects, collaborations or product ideas.",
  "/contact",
);

export default function ContactPage() {
  return <LocalizedContact locale="en" />;
}
