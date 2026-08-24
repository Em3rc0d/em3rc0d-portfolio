"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname, stripLocalePrefix } from "@/lib/i18n";

function routeFallbackTarget(pathname: string) {
  const route = stripLocalePrefix(pathname);

  if (route === "/") {
    const heading = document.querySelector<HTMLElement>("#systems-heading");
    return heading?.closest<HTMLElement>("section") ?? heading;
  }

  if (route.startsWith("/evidence/")) {
    return document.querySelector<HTMLElement>(".evidence-inspector-sheet");
  }

  if (route.startsWith("/notes/")) {
    return document.querySelector<HTMLElement>(".note-sheet");
  }

  return null;
}

export function SkipLink() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    if (document.getElementById("main-content")) return;

    const target = routeFallbackTarget(pathname);
    if (!target) return;

    const previousId = target.id;
    const previousTabIndex = target.getAttribute("tabindex");

    target.id = "main-content";
    target.setAttribute("tabindex", "-1");
    target.dataset.skipTargetManaged = "true";

    return () => {
      if (target.dataset.skipTargetManaged !== "true") return;
      delete target.dataset.skipTargetManaged;
      if (previousId) target.id = previousId;
      else target.removeAttribute("id");
      if (previousTabIndex === null) target.removeAttribute("tabindex");
      else target.setAttribute("tabindex", previousTabIndex);
    };
  }, [pathname]);

  function focusContent(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("main-content");
    if (!target) return;

    event.preventDefault();
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start", behavior: "auto" });
  }

  return (
    <a
      className="skip-link"
      href="#main-content"
      onClick={focusContent}
      lang={locale}
    >
      {locale === "es" ? "Saltar al contenido" : "Skip to content"}
    </a>
  );
}
