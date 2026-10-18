import { ArrowDownRight, Compass } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { heroPosterSrc, heroVideoSrc } from '../data/media'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [videoUnavailable, setVideoUnavailable] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headlineWords = ['From the', 'sea.', 'To your', 'plate.']
  const showVideo = Boolean(heroVideoSrc) && !shouldReduceMotion && !videoUnavailable

  useEffect(() => {
    if (!showVideo || !videoRef.current) return
    void videoRef.current.play().catch(() => {
      // Muted autoplay can be deferred by a browser without making the MP4 unavailable.
    })
  }, [showVideo])

  const handleVideoError = (event: SyntheticEvent<HTMLVideoElement>) => {
    const code = event.currentTarget.error?.code
    if (import.meta.env.DEV) console.error('Hero video playback failed', { code, src: event.currentTarget.currentSrc })
    if (code === MediaError.MEDIA_ERR_DECODE || code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) setVideoUnavailable(true)
  }

  const logVideoEvent = (event: SyntheticEvent<HTMLVideoElement>) => {
    if (!import.meta.env.DEV) return
    const video = event.currentTarget
    console.debug('[The Ocean hero video]', event.type, { paused: video.paused, ended: video.ended, readyState: video.readyState, networkState: video.networkState, currentTime: video.currentTime, duration: video.duration, errorCode: video.error?.code })
  }

  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        {showVideo ? (
          <video ref={videoRef} autoPlay loop muted onError={handleVideoError} onPlaying={logVideoEvent} onPause={logVideoEvent} onWaiting={logVideoEvent} onStalled={logVideoEvent} onEnded={logVideoEvent} onTimeUpdate={logVideoEvent} playsInline poster={heroPosterSrc} preload="metadata">
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <img alt="" decoding="async" fetchPriority="high" src={heroPosterSrc} />
        )}
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__current hero__current--one" aria-hidden="true" />
      <div className="hero__current hero__current--two" aria-hidden="true" />
      <div className="page-container hero__content">
        <motion.p animate={{ opacity: 1, y: 0 }} className="hero__eyebrow" initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }} transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}>
          Seafood restaurant · Remhala, Lebanon
        </motion.p>
        <h1 aria-label="From the sea. To your plate.">
          {headlineWords.map((word, index) => (
            <span className="hero__headline-line" key={word}>
              <motion.span animate={{ y: 0 }} initial={{ y: shouldReduceMotion ? 0 : '105%' }} transition={{ delay: shouldReduceMotion ? 0 : 0.12 + index * 0.1, duration: shouldReduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}>
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div animate={{ opacity: 1, y: 0 }} className="hero__lower" initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }} transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p>A refined digital concept inspired by The Ocean and its supplied seafood imagery.</p>
          <a className="button button--cream" href="#menu-preview">Explore the menu <ArrowDownRight aria-hidden="true" size={18} strokeWidth={1.5} /></a>
        </motion.div>
      </div>
      <div className="hero__coordinates" aria-hidden="true"><Compass size={18} strokeWidth={1.2} /><span>The Ocean · Concept study</span></div>
      <div className="hero__tide" aria-hidden="true"><span /><span /><span /></div>
    </section>
  )
}
