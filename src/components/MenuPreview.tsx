import { ArrowRight } from 'lucide-react'

export function MenuPreview() {
  return (
    <section className="menu-preview section" id="menu-preview">
      <div className="page-container menu-preview__panel">
        <div className="menu-preview__art" aria-hidden="true"><img alt="" decoding="async" loading="lazy" src="/assets/seafood/fish6.webp" /></div>
        <div className="menu-preview__content">
          <p className="eyebrow">Coming next</p>
          <h2>A menu designed like a keepsake.</h2>
          <p>The digital menu is being shaped into an easy, considered way to browse the current sandwich selection.</p>
          <span className="menu-preview__coming-soon">Menu experience in progress <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} /></span>
        </div>
      </div>
    </section>
  )
}
