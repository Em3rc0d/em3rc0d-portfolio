"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { SceneRuntime } from "@/lib/scene/scene-runtime";

export function PortfolioScene() {
  const host = useRef<HTMLDivElement>(null);
  const runtime = useRef<SceneRuntime | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const attach = () => {
      const slot = document.querySelector<HTMLElement>("[data-scene-slot]");
      if (runtime.current) { runtime.current.attach(preference.matches ? null : slot); return; }
      if (!slot || preference.matches) return;
      observer?.disconnect();
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer?.disconnect();
        // Import occurs after HTML, layout and the static fallback are already visible.
        void import("@/lib/scene/scene-runtime").then(module => {
          if (cancelled || preference.matches || !slot.isConnected) return;
          runtime.current ??= module.createScene(node);
          runtime.current.attach(slot);
        }).catch(() => { node.dataset.quality = "STATIC"; });
      }, { rootMargin: "0px" });
      observer.observe(slot);
    };
    attach(); preference.addEventListener("change", attach);
    return () => { cancelled = true; observer?.disconnect(); preference.removeEventListener("change", attach); runtime.current?.attach(null); };
  }, [pathname]);
  useEffect(() => () => { runtime.current?.dispose(); runtime.current = null; }, []);
  return <div ref={host} className="scene-runtime" aria-hidden="true" data-quality="STATIC"/>;
}
