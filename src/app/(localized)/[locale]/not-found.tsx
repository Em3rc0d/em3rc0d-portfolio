"use client";
import { usePathname } from "next/navigation";
import { NotFoundView } from "@/components/content/not-found-view";
import { localeFromPathname } from "@/i18n/config";
export default function LocalizedNotFound() { return <NotFoundView locale={localeFromPathname(usePathname())}/>; }
