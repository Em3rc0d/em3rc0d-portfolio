import Link from "next/link";
import { profile } from "@/content/profile";
export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-inner"><div><Link href="/" className="footer-name">Eduardo Merino</Link><p>Software systems. Built with intent.</p></div><nav aria-label="Footer"><Link href="/evidence">Evidence</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></nav><a href="#top" className="back-top">Back to top ↑</a></div></footer>;
}
