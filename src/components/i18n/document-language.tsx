"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/lib/i18n";

export function DocumentLanguage() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = previous || "en";
    };
  }, [locale]);

  return null;
}
