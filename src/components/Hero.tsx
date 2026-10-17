import { ArrowDownRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true"><img alt="" decoding="async" fetchPriority="high" src="/assets/seafood/fish5.webp" /></div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="page-container hero__content">
        <p className="hero__eyebrow">Seafood restaurant · Remhala, Lebanon</p>
        <h1>From the sea.<br />To your plate.</h1>
        <div className="hero__lower">
          <p>A refined digital concept inspired by The Ocean and its supplied seafood imagery.</p>
          <a className="button button--cream" href="#menu-preview">Explore the menu <ArrowDownRight aria-hidden="true" size={18} strokeWidth={1.5} /></a>
        </div>
      </div>
      <div className="hero__tide" aria-hidden="true"><span /><span /><span /></div>
    </section>
  )
}
