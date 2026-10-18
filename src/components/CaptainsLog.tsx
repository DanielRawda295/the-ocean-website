import { Compass } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

interface CaptainsLogProps {
  onOpen: () => void
}

export function CaptainsLog({ onOpen }: CaptainsLogProps) {
  const [isOpening, setIsOpening] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isOpening) return undefined

    const timer = window.setTimeout(onOpen, shouldReduceMotion ? 0 : 340)
    return () => window.clearTimeout(timer)
  }, [isOpening, onOpen, shouldReduceMotion])

  const openBook = () => {
    if (!isOpening) setIsOpening(true)
  }

  return (
    <motion.button
      className="captains-log-trigger"
      type="button"
      aria-label="Open the Captain's Log menu"
      aria-busy={isOpening}
      disabled={isOpening}
      onClick={openBook}
      animate={isOpening && !shouldReduceMotion ? { scale: 0.97, y: -8 } : { scale: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="captains-log-trigger__spine" aria-hidden="true" />
      <span className="captains-log-trigger__pages" aria-hidden="true" />
      <span className="captains-log-trigger__cover">
        <span className="captains-log-trigger__border" aria-hidden="true" />
        <img alt="" src="/assets/brand/the-ocean-logo.jpg" />
        <span className="captains-log-trigger__kicker">The Ocean</span>
        <strong>The Captain&apos;s<br />Log</strong>
        <Compass aria-hidden="true" size={31} strokeWidth={1.1} />
        <span className="captains-log-trigger__open">Open the Captain&apos;s Log</span>
      </span>
    </motion.button>
  )
}
