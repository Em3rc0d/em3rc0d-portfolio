import Link from "next/link";
import {
  localizedHref,
  navigationLabels,
  type Locale,
} from "@/lib/i18n";

export function LanguageToggle({
  locale,
  pathname,
  className,
}: {
  locale: Locale;
  pathname: string;
  className?: string;
}) {
  const targetLocale: Locale = locale === "en" ? "es" : "en";
  const labels = navigationLabels[locale];

  return (
    <Link
      className={className}
      href={localizedHref(pathname, targetLocale)}
      prefetch={false}
      hrefLang={targetLocale}
      aria-label={
        targetLocale === "es"
          ? labels.switchToSpanish
          : labels.switchToEnglish
      }
    >
      {locale.toUpperCase()} → {targetLocale.toUpperCase()}
    </Link>
  );
}
