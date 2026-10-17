import { motion, useReducedMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'

interface RevealProps extends PropsWithChildren {
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      transition={{ delay, duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: { opacity: 1, y: 0 },
      }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  )
}
