import { Anchor, ArrowRight, Compass } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import { heroPosterSrc, heroVideoSrc } from '../data/media'
import { Reveal } from './Reveal'

export function MenuPreview() {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  const showVideo = Boolean(heroVideoSrc) && isInView && !shouldReduceMotion && !videoUnavailable

  return (
    <section className="menu-preview section" id="menu-preview" ref={sectionRef}>
      <div className="page-container menu-preview__panel">
        <div className="menu-preview__media" aria-hidden="true">
          {showVideo ? (
            <video autoPlay loop muted onError={() => setVideoUnavailable(true)} playsInline poster={heroPosterSrc} preload="metadata">
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          ) : <img alt="" decoding="async" loading="lazy" src={heroPosterSrc} />}
        </div>
        <div className="menu-preview__overlay" aria-hidden="true" />
        <motion.div className="menu-preview__art" aria-hidden="true" whileHover={shouldReduceMotion ? undefined : { rotateY: -7, rotateX: 2, y: -5 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <div className="menu-cover">
            <div className="menu-cover__line menu-cover__line--top" />
            <img alt="" src="/assets/brand/the-ocean-logo.jpg" />
            <span className="menu-cover__kicker">The Ocean</span>
            <strong>Menu<br />Journal</strong>
            <span className="menu-cover__seal"><Compass size={21} strokeWidth={1.2} /></span>
            <div className="menu-cover__line menu-cover__line--bottom" />
          </div>
        </motion.div>
        <Reveal className="menu-preview__content">
          <p className="eyebrow">Coming next</p>
          <h2>A menu designed like a keepsake.</h2>
          <p>The digital menu is being shaped into an easy, considered way to browse the current sandwich selection.</p>
          <span className="menu-preview__coming-soon">Menu experience in progress <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} /></span>
          <span className="menu-preview__detail"><Anchor aria-hidden="true" size={15} strokeWidth={1.3} /> An interactive menu book is next</span>
        </Reveal>
      </div>
    </section>
  )
}
