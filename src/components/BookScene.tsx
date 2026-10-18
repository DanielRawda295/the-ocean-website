import { Minus, Plus, RotateCcw, ChevronLeft, ChevronRight, Compass } from 'lucide-react'
import { PageFlip, type PageFlipState } from 'page-flip'
import { createRoot, type Root } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { conceptFishItems, conceptFishNotice } from '../data/conceptFish'
import { conceptMenuItems, conceptMenuNotice } from '../data/conceptMenu'
import { menuItems } from '../data/menu'
import { JournalPage, type BookSpreadData, type JournalPageData } from './BookSpread'
import type { MenuItemName, MenuPrice } from '../types/menu'
import { FishingBoatCart } from './FishingBoatCart'

interface BookSceneProps { onClosed: () => void }

const bySection = (section: string) => conceptMenuItems.filter((item) => item.section === section)
type JournalSourceItem = { id: string; name: MenuItemName; price: MenuPrice }
const confirmedItems = (items: JournalSourceItem[]) => items.map((item) => ({ id: item.id, name: item.name, price: item.price, verification: 'confirmed' as const }))
const conceptItems = (items: JournalSourceItem[]) => items.map((item) => ({ id: item.id, name: item.name, price: item.price, verification: 'concept' as const }))

const spreads: BookSpreadData[] = [
  { index: 0, pages: [{ kind: 'menu', pageNumber: 1, heading: 'Shrimp Sandwiches', items: confirmedItems(menuItems.slice(0, 4)), image: { src: '/assets/sandwiches/sandwich-1.webp', caption: 'Sandwich selection' } }, { kind: 'menu', pageNumber: 2, heading: 'Felleh Sandwiches', items: confirmedItems(menuItems.slice(4, 8)), image: { src: '/assets/sandwiches/sandwich-2.webp', caption: 'Sandwich selection' } }] },
  { index: 1, pages: [{ kind: 'menu', pageNumber: 3, heading: 'Fresh Fish', items: conceptItems(conceptFishItems.slice(0, 4)), image: { src: '/assets/seafood/fish2.webp', caption: 'Seafood selection' }, note: conceptFishNotice }, { kind: 'menu', pageNumber: 4, heading: 'Fresh Fish', items: conceptItems(conceptFishItems.slice(4, 8)), image: { src: '/assets/seafood/fish4.webp', caption: 'Seafood selection' }, note: conceptFishNotice }] },
  { index: 2, pages: [{ kind: 'photo', pageNumber: 5, heading: 'Fresh Fish Selection', image: { src: '/assets/seafood/fish4.webp', caption: 'Fresh Fish Selection' } }, { kind: 'photo', pageNumber: 6, heading: 'Fresh Fish Selection', image: { src: '/assets/seafood/fish5.webp', caption: 'Fresh Fish Selection' } }] },
  { index: 3, pages: [{ kind: 'menu', pageNumber: 7, heading: 'Fish & Chips', items: conceptItems(bySection('Fish & Chips')), image: { src: '/assets/seafood/plate1.webp', caption: 'Seafood selection' }, note: conceptMenuNotice }, { kind: 'menu', pageNumber: 8, heading: 'Seafood Platters', items: conceptItems(bySection('Seafood Platters')), image: { src: '/assets/seafood/776442970_18066413636754697_7845254103303073647_n..jpg', caption: 'Seafood selection' }, note: conceptMenuNotice }] },
  { index: 4, pages: [{ kind: 'menu', pageNumber: 9, heading: 'Sides', items: conceptItems(bySection('Sides')), note: conceptMenuNotice }, { kind: 'menu', pageNumber: 10, heading: 'Soft Drinks', items: conceptItems(bySection('Soft Drinks')), note: conceptMenuNotice }] },
]

const journalPages = spreads.flatMap((spread) => spread.pages)

function CoverPage({ rear = false }: { rear?: boolean }) {
  return <article className={`flipbook-page flipbook-cover${rear ? ' flipbook-cover--rear' : ''}`} data-density="hard" aria-label={rear ? 'Captain’s Log rear cover' : 'Captain’s Log front cover'}>
    <span className="flipbook-cover__border" aria-hidden="true" />
    {!rear && <><img alt="" src="/assets/brand/the-ocean-logo.jpg" /><span>The Ocean</span><strong>The Captain&apos;s<br />Log</strong><Compass aria-hidden="true" size={42} strokeWidth={1} /><small>Open the Captain&apos;s Log</small></>}
  </article>
}

function InteriorPage({ page }: { page: JournalPageData }) {
  return <div className="flipbook-page flipbook-page--paper"><JournalPage page={page} /></div>
}

function FlipbookPages() {
  return <><CoverPage />{journalPages.map((page) => <InteriorPage key={page.pageNumber} page={page} />)}<CoverPage rear /></>
}

async function waitForBookImages(host: HTMLElement) {
  const images = Array.from(host.querySelectorAll('img'))
  await Promise.all(images.map(async (image) => {
    if (!image.complete) await new Promise<void>((resolve) => { image.addEventListener('load', () => resolve(), { once: true }); image.addEventListener('error', () => resolve(), { once: true }) })
    try { await image.decode() } catch { /* Per-image fallback handles a decode/load failure. */ }
  }))
}

export function BookScene({ onClosed }: BookSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const pageFlipRef = useRef<PageFlip | null>(null)
  const closingRef = useRef(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [flipState, setFlipState] = useState<PageFlipState>('read')
  const [zoom, setZoom] = useState(1)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const host = document.createElement('div')
    host.className = 'flipbook-host'
    stage.appendChild(host)
    const root: Root = createRoot(host)
    flushSync(() => root.render(<FlipbookPages />))
    let destroyed = false

    const initialise = async () => {
      await document.fonts?.ready
      await waitForBookImages(host)
      if (destroyed) return

      const pageFlip = new PageFlip(host, {
        width: 500,
        height: 680,
        size: 'stretch',
        minWidth: 280,
        maxWidth: 500,
        minHeight: 390,
        maxHeight: 680,
        showCover: true,
        drawShadow: true,
        maxShadowOpacity: 0.28,
        flippingTime: 1150,
        usePortrait: true,
        startZIndex: 10,
        autoSize: true,
        useMouseEvents: false,
      })
      pageFlip.on('flip', ({ data }) => setPageIndex(data))
      pageFlip.on('changeState', ({ data }) => {
        setFlipState(data)
        if (data !== 'read') return
        if (closingRef.current) {
          if (pageFlip.getCurrentPageIndex() === 0) onClosed()
          else pageFlip.flipPrev('top')
        }
      })
      pageFlip.on('init', () => {
        setReady(true)
        pageFlip.flipNext('top')
      })
      pageFlip.loadFromHTML(Array.from(host.querySelectorAll<HTMLElement>('.flipbook-page')))
      pageFlipRef.current = pageFlip
    }

    void initialise()
    return () => {
      destroyed = true
      pageFlipRef.current?.destroy()
      pageFlipRef.current = null
      root.unmount()
    }
  }, [onClosed])

  const canNavigate = ready && flipState === 'read' && !closingRef.current
  const flipNext = () => { if (canNavigate) pageFlipRef.current?.flipNext('top') }
  const flipPrevious = () => { if (canNavigate && pageIndex > 0) pageFlipRef.current?.flipPrev('top') }
  const closeBook = () => {
    if (!canNavigate || !pageFlipRef.current) return
    closingRef.current = true
    setFlipState('flipping')
    if (pageFlipRef.current.getCurrentPageIndex() === 0) onClosed()
    else pageFlipRef.current.flipPrev('top')
  }
  const changeZoom = (delta: number) => { if (flipState === 'read') setZoom((value) => Math.min(1.5, Math.max(.8, Number((value + delta).toFixed(2))))) }

  return <section className="book-scene book-scene--flipbook" aria-labelledby="captains-log-heading">
    <div className="book-scene__atmosphere" aria-hidden="true" />
    <div className="book-scene__heading"><p className="eyebrow">The Ocean</p><h1 id="captains-log-heading">The Captain&apos;s Log</h1><p>Confirmed sandwiches and concept menu estimates.</p></div>
    <div className="flipbook-camera" style={{ '--flipbook-zoom': zoom } as CSSProperties}>
      <div className="flipbook-stage" ref={stageRef} aria-busy={!ready} aria-label="Captain’s Log menu book" />
    </div>
    <nav className="book-scene__controls" aria-label="Captain's Log controls">
      <button type="button" onClick={flipPrevious} disabled={!canNavigate || pageIndex === 0}><ChevronLeft aria-hidden="true" size={18} />Previous page</button>
      <span aria-live="polite">Page {pageIndex + 1} of {journalPages.length + 2}</span>
      <button type="button" onClick={flipNext} disabled={!canNavigate || pageIndex >= journalPages.length + 1}>Next page<ChevronRight aria-hidden="true" size={18} /></button>
    </nav>
    <div className="flipbook-zoom" aria-label="Book zoom controls">
      <button type="button" onClick={() => changeZoom(-.1)} disabled={flipState !== 'read' || zoom <= .8} aria-label="Zoom out"><Minus aria-hidden="true" size={17} /></button>
      <button type="button" onClick={() => changeZoom(.1)} disabled={flipState !== 'read' || zoom >= 1.5} aria-label="Zoom in"><Plus aria-hidden="true" size={17} /></button>
      <button type="button" onClick={() => setZoom(1)} disabled={flipState !== 'read' || zoom === 1} aria-label="Reset zoom"><RotateCcw aria-hidden="true" size={16} /></button>
    </div>
    <button className="book-scene__close" type="button" onClick={closeBook} disabled={!canNavigate}>Close the Captain&apos;s Log</button>
    <FishingBoatCart />
  </section>
}
