import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

interface CinematicFeatureProps {
  className?: string
  label: string
  src: string
}

export function CinematicFeature({ className = '', label, src }: CinematicFeatureProps) {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [hasActivated, setHasActivated] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || shouldReduceMotion) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
      if (entry.isIntersecting) setHasActivated(true)
    }, { threshold: 0.2 })
    observer.observe(container)
    return () => observer.disconnect()
  }, [shouldReduceMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasActivated || hasFailed) return
    if (isVisible) void video.play().catch(() => {})
    else video.pause()
  }, [hasActivated, hasFailed, isVisible])

  return <figure className={`cinematic-feature ${className}`} ref={containerRef}><div className="cinematic-feature__fallback" aria-hidden="true"><span>Illustrative motion</span></div>{!shouldReduceMotion && hasActivated && !hasFailed && <video className={isReady ? 'cinematic-feature__video--ready' : undefined} ref={videoRef} autoPlay loop muted playsInline preload="none" onCanPlay={() => setIsReady(true)} onError={() => setHasFailed(true)} aria-hidden="true"><source src={src} type="video/mp4" /></video>}<figcaption>{label} <span>Illustrative motion</span></figcaption></figure>
}
