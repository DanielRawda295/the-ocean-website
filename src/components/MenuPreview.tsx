import { Anchor, ArrowRight } from 'lucide-react'
import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { heroPosterSrc, heroVideoSrc } from '../data/media'
import { CaptainsLog } from './CaptainsLog'
import { Reveal } from './Reveal'

interface MenuPreviewProps {
  onOpenMenu: () => void
}

export function MenuPreview({ onOpenMenu }: MenuPreviewProps) {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  const [isOpeningFromCta, setIsOpeningFromCta] = useState(false)
  const showVideo = Boolean(heroVideoSrc) && isInView && !shouldReduceMotion && !videoUnavailable

  useEffect(() => {
    if (!isOpeningFromCta) return undefined

    const timer = window.setTimeout(onOpenMenu, shouldReduceMotion ? 0 : 280)
    return () => window.clearTimeout(timer)
  }, [isOpeningFromCta, onOpenMenu, shouldReduceMotion])

  return (
    <section className="menu-preview section" id="menu-preview" ref={sectionRef}>
      <div className={`page-container menu-preview__panel${isOpeningFromCta ? ' menu-preview__panel--opening' : ''}`}>
        <div className="menu-preview__media" aria-hidden="true">
          {showVideo ? (
            <video autoPlay loop muted onError={() => setVideoUnavailable(true)} playsInline poster={heroPosterSrc} preload="metadata">
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          ) : <img alt="" decoding="async" loading="lazy" src={heroPosterSrc} />}
        </div>
        <div className="menu-preview__overlay" aria-hidden="true" />
        <div className="menu-preview__art">
          <CaptainsLog onOpen={onOpenMenu} />
        </div>
        <Reveal className="menu-preview__content">
          <p className="eyebrow">Coming next</p>
          <h2>A menu designed like a keepsake.</h2>
          <p>The digital menu is being shaped into an easy, considered way to browse the current sandwich selection.</p>
          <button className="menu-preview__open-button" type="button" disabled={isOpeningFromCta} onClick={() => setIsOpeningFromCta(true)}>Open the Captain&apos;s Log <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} /></button>
          <span className="menu-preview__detail"><Anchor aria-hidden="true" size={15} strokeWidth={1.3} /> Start with its first welcome spread</span>
        </Reveal>
      </div>
    </section>
  )
}
