import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";

export function LanguageToggle({
  locale,
  pathname,
  className,
}: {
  locale: AppLocale;
  pathname: string;
  className?: string;
}) {
  const targetLocale: AppLocale = locale === "en" ? "es" : "en";
  const t = useTranslations("Navigation");

  return (
    <Link
      className={className}
      href={pathname}
      locale={targetLocale}
      prefetch={false}
      hrefLang={targetLocale}
      aria-label={
        targetLocale === "es"
          ? t("switchToSpanish")
          : t("switchToEnglish")
      }
    >
      {locale.toUpperCase()} → {targetLocale.toUpperCase()}
    </Link>
  );
}
