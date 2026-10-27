import { LocalizedHome } from "@/i18n/pages/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Em3rc0d (Eduardo Merino) — Software Engineer · Full Stack",
  "Em3rc0d is the online alias of Eduardo Merino, a Software Engineer building products and systems across web, mobile, connected software and applied AI.",
  "/",
);

export default function Home() {
  return <LocalizedHome locale="en" />;
}
