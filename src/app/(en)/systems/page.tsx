import { LocalizedSystems } from "@/i18n/pages/systems";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Projects — Eduardo Merino",
  "Selected software projects, products, experiments and professional engineering work by Eduardo Merino.",
  "/systems",
);

export default function SystemsPage() {
  return <LocalizedSystems locale="en" />;
}
