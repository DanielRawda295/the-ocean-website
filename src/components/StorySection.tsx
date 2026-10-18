import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from './Reveal'
import { business } from '../data/business'

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imageOffset = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section className="story section" id="story" ref={sectionRef}>
      <div className="page-container story__grid">
        <Reveal className="story__intro">
          <p className="eyebrow">Our Catch</p>
          <h2>{business.tagline}</h2>
          <p className="story__copy">Discover The Ocean through its seafood photography and its current sandwich selection.</p>
          <a className="text-link" href="#gallery">View the gallery <ArrowDown aria-hidden="true" size={17} strokeWidth={1.5} /></a>
        </Reveal>
        <figure className="story__image image-frame">
          <motion.img alt="A prepared seafood plate with bread, lemon, and fries" decoding="async" loading="lazy" src="/assets/seafood/plate1.webp" style={shouldReduceMotion ? undefined : { y: imageOffset }} />
          <figcaption>Seafood selection</figcaption>
        </figure>
        <Reveal className="story__note" delay={0.15}><span aria-hidden="true">01</span><p>Explore the gallery, then open the Captain&apos;s Log to browse the menu.</p></Reveal>
      </div>
    </section>
  )
}
