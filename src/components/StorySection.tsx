import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './Reveal'

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imageOffset = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section className="story section" id="story" ref={sectionRef}>
      <div className="page-container story__grid">
        <Reveal className="story__intro">
          <p className="eyebrow">A table by the water</p>
          <h2>An invitation to explore the day&apos;s visual catch.</h2>
          <p className="story__copy">The Ocean is located in Remhala, Lebanon. This concept brings its supplied imagery into a calm, considered digital setting—where detail and the sea set the tone.</p>
          <a className="text-link" href="#gallery">View the gallery <ArrowDown aria-hidden="true" size={17} strokeWidth={1.5} /></a>
        </Reveal>
        <figure className="story__image image-frame">
          <motion.img alt="A prepared seafood plate with bread, lemon, and fries" decoding="async" loading="lazy" src="/assets/seafood/plate1.webp" style={shouldReduceMotion ? undefined : { y: imageOffset }} />
          <figcaption>Seafood selection</figcaption>
        </figure>
        <Reveal className="story__note" delay={0.15}><span aria-hidden="true">01</span><p>Authentic supplied photography, presented without unconfirmed menu or sourcing claims.</p></Reveal>
      </div>
    </section>
  )
}
