import { LocalizedHome } from "@/i18n/pages/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Eduardo Merino — Software Engineer · Full Stack",
  "Software Engineer building web, mobile, automation and applied AI products.",
  "/",
);

export default function Home() {
  return <LocalizedHome locale="en" />;
}
