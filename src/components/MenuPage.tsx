import { Anchor, ArrowLeft, Compass } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { menuItems } from '../data/menu'
import type { MenuPrice } from '../types/menu'

interface MenuPageProps {
  onClose: () => void
}

function formatPrice(price: MenuPrice) {
  if (price.kind === 'fixed') return `$${price.amountUsd}`
  if (price.kind === 'per-kilogram') return `$${price.amountUsdPerKg} / kg`
  return 'Price on request'
}

export function MenuPage({ onClose }: MenuPageProps) {
  const [isClosing, setIsClosing] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const closeMenu = () => {
    if (!isClosing) setIsClosing(true)
  }

  useEffect(() => {
    if (!isClosing) return undefined

    const timer = window.setTimeout(onClose, shouldReduceMotion ? 0 : 280)
    return () => window.clearTimeout(timer)
  }, [isClosing, onClose, shouldReduceMotion])

  return (
    <main className="menu-page" id="main-content" tabIndex={-1}>
      <motion.div
        className="menu-page__shell"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={isClosing ? { opacity: 0, y: shouldReduceMotion ? 0 : 8 } : { opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="menu-page__header page-container">
          <a className="menu-page__brand" href="/" aria-label="The Ocean home" onClick={(event) => { event.preventDefault(); closeMenu() }}>
            <img alt="" src="/assets/brand/the-ocean-logo.jpg" />
            <span>The Ocean</span>
          </a>
          <button className="menu-page__close" type="button" onClick={closeMenu}>
            <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
            Close the Captain&apos;s Log
          </button>
        </header>

        <section className="menu-page__hero page-container" aria-labelledby="menu-page-title">
          <div>
            <p className="eyebrow">The Ocean</p>
            <h1 id="menu-page-title">The Captain&apos;s Log</h1>
            <p>Current confirmed menu.</p>
          </div>
          <Compass className="menu-page__hero-compass" aria-hidden="true" size={138} strokeWidth={0.75} />
        </section>

        <section className="menu-page__journal page-container" aria-labelledby="sandwiches-title">
          <div className="menu-page__paper">
            <div className="menu-page__paper-heading">
              <span>01</span>
              <h2 id="sandwiches-title">Sandwiches</h2>
              <Anchor aria-hidden="true" size={22} strokeWidth={1.25} />
            </div>
            <ul className="menu-page__list">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.12 + index * 0.045 }}
                >
                  <span>{item.name.en}</span>
                  <i aria-hidden="true" />
                  <strong>{formatPrice(item.price)}</strong>
                </motion.li>
              ))}
            </ul>
            <p className="menu-page__paper-note">Prices shown as provided for this concept.</p>
          </div>
          <figure className="menu-page__image">
            <img alt="Sandwich from The Ocean" src="/assets/sandwiches/sandwich-1.webp" />
            <figcaption>The Captain&apos;s Log</figcaption>
          </figure>
        </section>
      </motion.div>
    </main>
  )
}
