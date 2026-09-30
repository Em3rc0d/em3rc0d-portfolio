import { LocalizedHome } from "@/i18n/pages/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Eduardo Merino — Software Engineer · Full Stack",
  "Software Engineer building products and systems for messy real-world problems across web, mobile, connected software and applied AI.",
  "/",
);

export default function Home() {
  return <LocalizedHome locale="en" />;
}
