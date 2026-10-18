import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface WebsiteEntranceProps {
  onDismiss: () => void
}

function IntroBoat() {
  return <svg className="website-entrance__boat" viewBox="0 0 180 104" aria-hidden="true"><path className="website-entrance__boat-wave" d="M4 90c15-10 29 10 44 0s29 10 44 0 29 10 44 0 29 10 40 0" /><path className="website-entrance__boat-hull" d="M32 66h109l-15 23H52z" /><path className="website-entrance__boat-mast" d="M89 18v48" /><path className="website-entrance__boat-sail" d="M93 21c26 8 40 24 42 41H93z" /><path className="website-entrance__boat-sail website-entrance__boat-sail--small" d="M86 27c-16 8-28 21-31 35h31z" /></svg>
}

export function WebsiteEntrance({ onDismiss }: WebsiteEntranceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const skipButtonRef = useRef<HTMLButtonElement>(null)
  const dismissedRef = useRef(false)
  const [videoReady, setVideoReady] = useState(false)

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    videoRef.current?.pause()
    onDismiss()
  }, [onDismiss])

  useEffect(() => {
    const video = videoRef.current
    skipButtonRef.current?.focus()
    const timeout = window.setTimeout(dismiss, 2600)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
      if (event.key === 'Tab') {
        event.preventDefault()
        skipButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timeout)
      document.removeEventListener('keydown', onKeyDown)
      video?.pause()
    }
  }, [dismiss])

  return <motion.section className="website-entrance" role="region" aria-label="The Ocean introduction" exit={{ opacity: 0 }} initial={{ opacity: 1 }} transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}><div className="website-entrance__water" aria-hidden="true"><span /><span /><span /></div><div className="website-entrance__fallback" aria-hidden="true"><IntroBoat /></div><video className={`website-entrance__video${videoReady ? ' website-entrance__video--ready' : ''}`} ref={videoRef} autoPlay loop muted onCanPlay={() => setVideoReady(true)} onError={() => setVideoReady(false)} playsInline preload="metadata" aria-hidden="true"><source src="/assets/intro/boat-intro.mp4" type="video/mp4" /></video><button className="website-entrance__skip" ref={skipButtonRef} type="button" onClick={dismiss}>Skip Intro</button><motion.div className="website-entrance__brand" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} transition={{ delay: .5, duration: .65, ease: [0.22, 1, 0.36, 1] }}><img alt="The Ocean" src="/assets/brand/the-ocean-logo.jpg" /><p>The Ocean</p><span>From the sea. To your plate.</span></motion.div></motion.section>
}
