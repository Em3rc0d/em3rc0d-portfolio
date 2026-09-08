import Link from "next/link";
export function Conversation() {
  return <section className="conversation container section"><p className="eyebrow accent">Your next system</p><h2>Start with the problem.<br/><span>Let’s make it work.</span></h2><div className="conversation-bottom"><p>You bring the context. We find the path from what exists to what needs to work.</p><Link href="/contact" className="button primary">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>;
}
