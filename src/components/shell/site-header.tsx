"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  ["Systems", "/systems"],
  ["Notes", "/notes"],
  ["Evidence", "/evidence"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="site-identity" href="/" aria-label="Eduardo Merino — Home">
        <span>EM</span>
        <span aria-hidden="true">/</span>
        <span>BUILD ROOM</span>
        <span className="signal-dot" aria-hidden="true" />
      </Link>

      <nav aria-label="Primary navigation">
        <ul className="primary-nav">
          {navItems.map(([label, href], index) => {
            const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link href={href} aria-current={isCurrent ? "page" : undefined}>
                  <span className="nav-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
