import { ChevronLeft, ChevronRight, Compass } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { conceptFishItems, conceptFishNotice } from '../data/conceptFish'
import { conceptMenuItems, conceptMenuNotice } from '../data/conceptMenu'
import { menuItems } from '../data/menu'
import { BookSpread, JournalPage, type BookSpreadData } from './BookSpread'

type BookState = 'closed' | 'opening' | 'open' | 'turning' | 'closing'
type TurnDirection = 'next' | 'previous'

interface BookSceneProps {
  onClosed: () => void
}

const bySection = (section: string) => conceptMenuItems.filter((item) => item.section === section)

const spreads: BookSpreadData[] = [
  {
    index: 0,
    pages: [
      { kind: 'menu', pageNumber: 1, heading: 'Shrimp Sandwiches', items: menuItems.slice(0, 4), image: { src: '/assets/sandwiches/sandwich-1.webp', caption: 'Sandwich selection' } },
      { kind: 'menu', pageNumber: 2, heading: 'Felleh Sandwiches', items: menuItems.slice(4, 8), image: { src: '/assets/sandwiches/sandwich-2.webp', caption: 'Sandwich selection' } },
    ],
  },
  {
    index: 1,
    pages: [
      { kind: 'menu', pageNumber: 3, heading: 'Fresh Fish', items: conceptFishItems.slice(0, 4), image: { src: '/assets/seafood/fish2.webp', caption: 'Seafood selection' }, note: conceptFishNotice },
      { kind: 'menu', pageNumber: 4, heading: 'Fresh Fish', items: conceptFishItems.slice(4, 8), image: { src: '/assets/seafood/fish4.webp', caption: 'Seafood selection' }, note: conceptFishNotice },
    ],
  },
  {
    index: 2,
    pages: [
      { kind: 'photo', pageNumber: 5, heading: 'Fresh Fish Selection', image: { src: '/assets/seafood/fish4.webp', caption: 'Fresh Fish Selection' } },
      { kind: 'photo', pageNumber: 6, heading: 'Fresh Fish Selection', image: { src: '/assets/seafood/fish5.webp', caption: 'Fresh Fish Selection' } },
    ],
  },
  {
    index: 3,
    pages: [
      { kind: 'menu', pageNumber: 7, heading: 'Fish & Chips', items: bySection('Fish & Chips'), image: { src: '/assets/seafood/plate1.webp', caption: 'Seafood selection' }, note: conceptMenuNotice },
      { kind: 'menu', pageNumber: 8, heading: 'Seafood Platters', items: bySection('Seafood Platters'), image: { src: '/assets/seafood/776442970_18066413636754697_7845254103303073647_n..jpg', caption: 'Seafood selection' }, note: conceptMenuNotice },
    ],
  },
  {
    index: 4,
    pages: [
      { kind: 'menu', pageNumber: 9, heading: 'Sides', items: bySection('Sides'), note: conceptMenuNotice },
      { kind: 'menu', pageNumber: 10, heading: 'Soft Drinks', items: bySection('Soft Drinks'), note: conceptMenuNotice },
    ],
  },
]

const menuImageSources = spreads.flatMap((spread) => spread.pages.flatMap((page) => page.image ? [page.image.src] : []))

export function BookScene({ onClosed }: BookSceneProps) {
  const shouldReduceMotion = useReducedMotion()
  const [bookState, setBookState] = useState<BookState>('closed')
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [pendingSpreadIndex, setPendingSpreadIndex] = useState<number | null>(null)
  const [turnDirection, setTurnDirection] = useState<TurnDirection>('next')

  useEffect(() => {
    const images = menuImageSources.map((src) => {
      const image = new Image()
      image.src = src
      return image
    })
    return () => { images.forEach((image) => { image.src = '' }) }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setBookState('opening'), shouldReduceMotion ? 0 : 420)
    return () => window.clearTimeout(timer)
  }, [shouldReduceMotion])

  const coverDuration = shouldReduceMotion ? 0 : bookState === 'closing' ? 2 : 2.35
  const turnDuration = shouldReduceMotion ? 0 : 1
  const outgoingSpread = spreads[spreadIndex]
  const incomingSpread = pendingSpreadIndex === null ? outgoingSpread : spreads[pendingSpreadIndex]
  const isInteractive = bookState === 'open'

  const handleCoverComplete = () => {
    if (bookState === 'opening') setBookState('open')
    if (bookState === 'closing') onClosed()
  }

  const turnPage = (direction: TurnDirection) => {
    const target = direction === 'next' ? spreadIndex + 1 : spreadIndex - 1
    if (bookState === 'open' && target >= 0 && target < spreads.length) {
      setTurnDirection(direction)
      setPendingSpreadIndex(target)
      setBookState('turning')
    }
  }

  const handleTurnComplete = () => {
    if (pendingSpreadIndex !== null) setSpreadIndex(pendingSpreadIndex)
    setPendingSpreadIndex(null)
    setBookState('open')
  }

  const closeBook = () => {
    if (bookState === 'open') setBookState('closing')
  }

  return (
    <section className={`book-scene book-scene--${bookState}`} aria-labelledby="captains-log-heading">
      <div className="book-scene__atmosphere" aria-hidden="true" />
      <div className="book-scene__object">
        <div className="book-scene__spine" aria-hidden="true" />
        <div className="book-scene__page-stack book-scene__page-stack--left" aria-hidden="true" />
        <div className="book-scene__page-stack book-scene__page-stack--right" aria-hidden="true" />
        {bookState !== 'closed' && <div className="book-scene__papers">
          {bookState === 'turning' && pendingSpreadIndex !== null ? (
            <div className="book-page-layers" aria-hidden="true">
              <div className="book-page-layer book-page-layer--left"><JournalPage page={turnDirection === 'next' ? outgoingSpread.pages[0] : incomingSpread.pages[0]} /></div>
              <div className="book-page-layer book-page-layer--right"><JournalPage page={turnDirection === 'next' ? incomingSpread.pages[1] : outgoingSpread.pages[1]} /></div>
            </div>
          ) : <BookSpread key={`base-${outgoingSpread.index}`} spread={outgoingSpread} labelledBy="captains-log-heading" />}
        </div>}

        <motion.div
          className="book-cover-3d"
          initial={false}
          animate={{ rotateY: bookState === 'closed' || bookState === 'closing' ? 0 : -180 }}
          transition={{ duration: coverDuration, ease: [0.18, 0.8, 0.24, 1] }}
          onAnimationComplete={handleCoverComplete}
          aria-hidden="true"
        >
          <div className="book-cover-3d__outside"><span className="book-cover-3d__border" /><img alt="" src="/assets/brand/the-ocean-logo.jpg" /><span>The Ocean</span><strong>The Captain&apos;s<br />Log</strong><Compass size={42} strokeWidth={1} /></div>
          <div className="book-cover-3d__inside"><span className="book-cover-3d__border" /><Compass size={72} strokeWidth={.8} /><span>Captain&apos;s Log</span><small>The Ocean</small></div>
          <span className="book-cover-3d__shadow" />
        </motion.div>

        {bookState === 'turning' && pendingSpreadIndex !== null && (
          <motion.div key={`${turnDirection}-${spreadIndex}-${pendingSpreadIndex}`} className={`turning-sheet turning-sheet--${turnDirection}`} initial={{ rotateY: 0 }} animate={{ rotateY: turnDirection === 'next' ? -180 : 180 }} transition={{ duration: turnDuration, ease: [0.36, 0, 0.2, 1] }} onAnimationComplete={handleTurnComplete} aria-hidden="true">
            <div className="turning-sheet__front"><JournalPage page={turnDirection === 'next' ? outgoingSpread.pages[1] : outgoingSpread.pages[0]} /></div>
            <div className="turning-sheet__back"><JournalPage page={turnDirection === 'next' ? incomingSpread.pages[0] : incomingSpread.pages[1]} /></div>
            <span className="turning-sheet__shadow" />
          </motion.div>
        )}
      </div>

      <div className="book-scene__heading"><p className="eyebrow">The Ocean</p><h1 id="captains-log-heading">The Captain&apos;s Log</h1><p>Confirmed sandwiches and concept menu estimates.</p></div>
      <nav className="book-scene__controls" aria-label="Captain's Log controls">
        <button type="button" onClick={() => turnPage('previous')} disabled={!isInteractive || spreadIndex === 0}><ChevronLeft aria-hidden="true" size={18} />Previous page</button>
        <span aria-live="polite">Spread {spreadIndex + 1} of {spreads.length}</span>
        <button type="button" onClick={() => turnPage('next')} disabled={!isInteractive || spreadIndex === spreads.length - 1}>Next page<ChevronRight aria-hidden="true" size={18} /></button>
      </nav>
      <button className="book-scene__close" type="button" onClick={closeBook} disabled={!isInteractive}>Close the Captain&apos;s Log</button>
    </section>
  )
}
