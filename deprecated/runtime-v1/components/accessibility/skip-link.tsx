"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function routeFallbackTarget(pathname: string) {
  if (pathname === "/") {
    const heading = document.querySelector<HTMLElement>("#systems-heading");
    return heading?.closest<HTMLElement>("section") ?? heading;
  }

  if (pathname.startsWith("/evidence/")) {
    return document.querySelector<HTMLElement>(".evidence-inspector-sheet");
  }

  if (pathname.startsWith("/notes/")) {
    return document.querySelector<HTMLElement>(".note-sheet");
  }

  return null;
}

export function SkipLink() {
  const pathname = usePathname();

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
    <a className="skip-link" href="#main-content" onClick={focusContent}>
      Skip to content
    </a>
  );
}
