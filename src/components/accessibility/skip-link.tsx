"use client";

import { usePathname } from "next/navigation";

function routeFallbackSelector(pathname: string) {
  if (pathname === "/") return "#systems-heading";
  if (pathname.startsWith("/evidence/")) return ".evidence-inspector-sheet";
  if (pathname.startsWith("/notes/")) return ".note-sheet";
  return "#main-content";
}

export function SkipLink() {
  const pathname = usePathname();

  function focusContent(event: React.MouseEvent<HTMLAnchorElement>) {
    const selector = routeFallbackSelector(pathname);
    const target = document.querySelector<HTMLElement>(selector);

    if (!target) return;

    event.preventDefault();
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start", behavior: "auto" });
  }

  return (
    <a className="skip-link" href="#main-content" onClick={focusContent}>
      Skip to content
    </a>
  );
}
