import type { ReactNode } from "react";
import { RootDocument, baseMetadata } from "@/components/shell/root-document";
import { getMessages } from "@/i18n/messages";
import "@/styles/index.css";

export const metadata = baseMetadata;
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en" skipLabel={getMessages("en").skip}>{children}</RootDocument>;
}
