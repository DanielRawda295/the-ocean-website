import { ArrowDown } from 'lucide-react'

export function StorySection() {
  return (
    <section className="story section" id="story">
      <div className="page-container story__grid">
        <div className="story__intro">
          <p className="eyebrow">A table by the water</p>
          <h2>An invitation to explore the day&apos;s visual catch.</h2>
          <p className="story__copy">The Ocean is located in Remhala, Lebanon. This concept brings its supplied imagery into a calm, considered digital setting—where detail and the sea set the tone.</p>
          <a className="text-link" href="#gallery">View the gallery <ArrowDown aria-hidden="true" size={17} strokeWidth={1.5} /></a>
        </div>
        <figure className="story__image image-frame">
          <img alt="A prepared seafood plate with bread, lemon, and fries" decoding="async" loading="lazy" src="/assets/seafood/plate1.webp" />
          <figcaption>Seafood selection</figcaption>
        </figure>
        <div className="story__note"><span aria-hidden="true">01</span><p>Authentic supplied photography, presented without unconfirmed menu or sourcing claims.</p></div>
      </div>
    </section>
  )
}
