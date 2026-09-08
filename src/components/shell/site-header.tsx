"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label="THE BUILD ROOM — Eduardo Merino home" onClick={() => setOpen(false)}>
        <svg width="27" height="30" viewBox="0 0 27 30" aria-hidden="true"><path d="M2 7 13.5 1 25 7v16l-11.5 6L2 23Z M2 7l11.5 6L25 7M13.5 13v16M2 15l11.5 6L25 15" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
        <span>THE BUILD ROOM<span className="brand-version"> / V2</span></span>
      </Link>
      <button className="menu-toggle" type="button" ref={toggle} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
        {navigation.map(item => <Link key={item.href} href={item.href} className={item.href === "/contact" ? "nav-contact" : undefined} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}{item.href === "/contact" && <span aria-hidden="true">↗</span>}</Link>)}
      </nav>
    </div>
  </header>;
}
