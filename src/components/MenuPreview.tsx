import { Anchor, ArrowRight } from 'lucide-react'
import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { heroPosterSrc, heroVideoSrc } from '../data/media'
import { CaptainsLog } from './CaptainsLog'
import { Reveal } from './Reveal'

interface MenuPreviewProps {
  onOpenMenu: () => void
}

export function MenuPreview({ onOpenMenu }: MenuPreviewProps) {
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  const [isOpeningFromCta, setIsOpeningFromCta] = useState(false)
  const showVideo = Boolean(heroVideoSrc) && !shouldReduceMotion && !videoUnavailable

  useEffect(() => {
    const video = videoRef.current
    if (!video || !showVideo) return

    if (isInView) {
      void video.play().catch(() => {
        // Autoplay rejection is not a media failure; keep the mounted poster/video state intact.
      })
    } else {
      video.pause()
    }
  }, [isInView, showVideo])

  const handleVideoError = (event: SyntheticEvent<HTMLVideoElement>) => {
    const code = event.currentTarget.error?.code
    if (import.meta.env.DEV) console.error('Menu teaser video playback failed', { code, src: event.currentTarget.currentSrc })
    if (code === MediaError.MEDIA_ERR_DECODE || code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) setVideoUnavailable(true)
  }

  const logVideoEvent = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (!import.meta.env.DEV) return
    const video = event.currentTarget
    console.debug('[The Ocean menu teaser video]', event.type, { paused: video.paused, ended: video.ended, readyState: video.readyState, networkState: video.networkState, currentTime: video.currentTime, duration: video.duration, errorCode: video.error?.code })
  }

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
            <video ref={videoRef} autoPlay loop muted onError={handleVideoError} onPlaying={logVideoEvent} onPause={logVideoEvent} onWaiting={logVideoEvent} onStalled={logVideoEvent} onEnded={logVideoEvent} onTimeUpdate={logVideoEvent} playsInline poster={heroPosterSrc} preload="metadata">
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          ) : <img alt="" decoding="async" loading="lazy" src={heroPosterSrc} />}
        </div>
        <div className="menu-preview__overlay" aria-hidden="true" />
        <div className="menu-preview__art">
          <CaptainsLog onOpen={onOpenMenu} />
        </div>
        <Reveal className="menu-preview__content">
          <p className="eyebrow">The Captain&apos;s Log</p>
          <h2>A menu designed like a keepsake.</h2>
          <p>Browse the current sandwich selection in The Ocean&apos;s Captain&apos;s Log.</p>
          <button className="menu-preview__open-button" type="button" disabled={isOpeningFromCta} onClick={() => setIsOpeningFromCta(true)}>Open the Captain&apos;s Log <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} /></button>
          <span className="menu-preview__detail"><Anchor aria-hidden="true" size={15} strokeWidth={1.3} /> Explore the menu at your own pace</span>
        </Reveal>
      </div>
    </section>
  )
}
