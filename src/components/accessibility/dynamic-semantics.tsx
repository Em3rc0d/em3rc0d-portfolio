"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const LIVE_INSPECTOR_SELECTORS = [
  ".ap-component-inspector",
  ".cv-truth-inspector",
] as const;

function applyLiveInspectorSemantics(root: ParentNode = document) {
  for (const selector of LIVE_INSPECTOR_SELECTORS) {
    root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.setAttribute("aria-live", "polite");
      element.setAttribute("aria-atomic", "true");
    });
  }
}

export function DynamicSemantics() {
  const pathname = usePathname();

  useEffect(() => {
    applyLiveInspectorSemantics();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;

          if (LIVE_INSPECTOR_SELECTORS.some((selector) => node.matches(selector))) {
            node.setAttribute("aria-live", "polite");
            node.setAttribute("aria-atomic", "true");
          }

          applyLiveInspectorSemantics(node);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
