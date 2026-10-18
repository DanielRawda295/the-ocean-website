import { ChevronLeft, ChevronRight, Compass } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { conceptFishItems, conceptFishNotice } from '../data/conceptFish'
import { menuItems } from '../data/menu'
import { BookSpread, JournalPage, type BookSpreadData } from './BookSpread'

type BookState = 'closed' | 'opening' | 'open' | 'turning' | 'closing'
type TurnDirection = 'next' | 'previous'

interface BookSceneProps {
  onClosed: () => void
}

const spreads: BookSpreadData[] = [
  {
    index: 0,
    pages: [
      { pageNumber: 1, heading: 'Sandwiches', items: menuItems.slice(0, 4), image: { src: '/assets/sandwiches/sandwich-1.webp', caption: 'Sandwich selection' } },
      { pageNumber: 2, heading: 'Sandwiches', items: menuItems.slice(4, 8), image: { src: '/assets/sandwiches/sandwich-2.webp', caption: 'Sandwich selection' } },
    ],
  },
  {
    index: 1,
    pages: [
      { pageNumber: 3, heading: 'Fresh Fish', items: conceptFishItems.slice(0, 4), image: { src: '/assets/seafood/fish2.webp', caption: 'Seafood selection' }, note: conceptFishNotice },
      { pageNumber: 4, heading: 'Fresh Fish', items: conceptFishItems.slice(4, 8), image: { src: '/assets/seafood/fish4.webp', caption: 'Seafood selection' }, note: conceptFishNotice },
    ],
  },
]

export function BookScene({ onClosed }: BookSceneProps) {
  const shouldReduceMotion = useReducedMotion()
  const [bookState, setBookState] = useState<BookState>('closed')
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [turnDirection, setTurnDirection] = useState<TurnDirection>('next')

  const targetSpreadIndex = useMemo(() => {
    if (bookState !== 'turning') return spreadIndex
    return turnDirection === 'next' ? spreadIndex + 1 : spreadIndex - 1
  }, [bookState, spreadIndex, turnDirection])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setBookState('opening'))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const coverDuration = shouldReduceMotion ? 0 : bookState === 'closing' ? 1.8 : 2
  const turnDuration = shouldReduceMotion ? 0 : 1

  const handleCoverComplete = () => {
    if (bookState === 'opening') setBookState('open')
    if (bookState === 'closing') onClosed()
  }

  const turnPage = (direction: TurnDirection) => {
    const isAvailable = direction === 'next' ? spreadIndex < spreads.length - 1 : spreadIndex > 0
    if (bookState === 'open' && isAvailable) {
      setTurnDirection(direction)
      setBookState('turning')
    }
  }

  const handleTurnComplete = () => {
    setSpreadIndex(targetSpreadIndex)
    setBookState('open')
  }

  const closeBook = () => {
    if (bookState === 'open') setBookState('closing')
  }

  const displayedSpread = bookState === 'turning' ? spreads[targetSpreadIndex] : spreads[spreadIndex]
  const outgoingSpread = spreads[spreadIndex]
  const isInteractive = bookState === 'open'

  return (
    <section className={`book-scene book-scene--${bookState}`} aria-labelledby="captains-log-heading">
      <div className="book-scene__atmosphere" aria-hidden="true" />
      <div className="book-scene__object">
        <div className="book-scene__spine" aria-hidden="true" />
        <div className="book-scene__page-edges book-scene__page-edges--left" aria-hidden="true" />
        <div className="book-scene__page-edges book-scene__page-edges--right" aria-hidden="true" />
        <div className="book-scene__papers">
          <BookSpread spread={displayedSpread} labelledBy="captains-log-heading" ariaHidden={bookState === 'closed'} />
        </div>

        <motion.div
          className="book-cover-3d"
          initial={false}
          animate={{ rotateY: bookState === 'closed' || bookState === 'closing' ? 0 : -180 }}
          transition={{ duration: coverDuration, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={handleCoverComplete}
          aria-hidden="true"
        >
          <div className="book-cover-3d__outside">
            <span className="book-cover-3d__border" />
            <img alt="" src="/assets/brand/the-ocean-logo.jpg" />
            <span>The Ocean</span>
            <strong>The Captain&apos;s<br />Log</strong>
            <Compass size={42} strokeWidth={1} />
          </div>
          <div className="book-cover-3d__inside">
            <span className="book-cover-3d__border" />
            <Compass size={72} strokeWidth={.8} />
            <span>Captain&apos;s Log</span>
            <small>The Ocean</small>
          </div>
          <span className="book-cover-3d__shadow" />
        </motion.div>

        {bookState === 'turning' && (
          <motion.div
            key={`${turnDirection}-${spreadIndex}`}
            className={`turning-sheet turning-sheet--${turnDirection}`}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: turnDirection === 'next' ? -180 : 180 }}
            transition={{ duration: turnDuration, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={handleTurnComplete}
            aria-hidden="true"
          >
            <div className="turning-sheet__front">
              <JournalPage
                page={turnDirection === 'next' ? outgoingSpread.pages[1] : outgoingSpread.pages[0]}
              />
            </div>
            <div className="turning-sheet__back">
              <JournalPage
                page={turnDirection === 'next' ? displayedSpread.pages[0] : displayedSpread.pages[1]}
              />
            </div>
            <span className="turning-sheet__shadow" />
          </motion.div>
        )}
      </div>

      <div className="book-scene__heading">
        <p className="eyebrow">The Ocean</p>
        <h1 id="captains-log-heading">The Captain&apos;s Log</h1>
        <p>Confirmed sandwiches and concept fish estimates.</p>
      </div>

      <nav className="book-scene__controls" aria-label="Captain's Log controls">
        <button type="button" onClick={() => turnPage('previous')} disabled={!isInteractive || spreadIndex === 0}>
          <ChevronLeft aria-hidden="true" size={18} />
          Previous page
        </button>
        <span aria-live="polite">Spread {spreadIndex + 1} of {spreads.length}</span>
        <button type="button" onClick={() => turnPage('next')} disabled={!isInteractive || spreadIndex === spreads.length - 1}>
          Next page
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </nav>
      <button className="book-scene__close" type="button" onClick={closeBook} disabled={!isInteractive}>
        Close the Captain&apos;s Log
      </button>
    </section>
  )
}
