import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { bilingualAlternates } from "@/lib/i18n-metadata";

export const metadata: Metadata = {
  alternates: bilingualAlternates("/", "en"),
};

export default function Home() {
  return <HomePage locale="en" />;
}
