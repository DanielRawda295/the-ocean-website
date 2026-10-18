import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DiningSpace } from './components/DiningSpace'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuPreview } from './components/MenuPreview'
import { MenuPage } from './components/MenuPage'
import { PhotoGallery } from './components/PhotoGallery'
import { Reviews } from './components/Reviews'
import { StorySection } from './components/StorySection'
import { Faq } from './components/Faq'
import { VisitSection } from './components/VisitSection'
import { WebsiteEntrance } from './components/WebsiteEntrance'
import { WalkthroughDialog } from './components/WalkthroughDialog'
import { CinematicFeature } from './components/CinematicFeature'

const entranceSessionKey = 'the-ocean-entrance-seen'

function shouldShowEntrance() {
  if (window.location.pathname !== '/') return false
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  try {
    if (sessionStorage.getItem(entranceSessionKey) || reducedMotion) {
      sessionStorage.setItem(entranceSessionKey, 'true')
      return false
    }
  } catch {
    return !reducedMotion
  }
  return true
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [showEntrance, setShowEntrance] = useState(shouldShowEntrance)
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false)
  const previousPathnameRef = useRef(window.location.pathname)

  const restoreMenuTeaser = useCallback(() => {
    window.requestAnimationFrame(() => {
      const teaser = document.getElementById('menu-preview')
      teaser?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const nextPathname = window.location.pathname
      const returnedFromMenu = previousPathnameRef.current === '/menu' && nextPathname === '/'
      previousPathnameRef.current = nextPathname
      setPathname(nextPathname)
      if (returnedFromMenu) restoreMenuTeaser()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [restoreMenuTeaser])

  const openMenu = useCallback(() => {
    window.history.pushState({ captainsLogOrigin: true }, '', '/menu')
    previousPathnameRef.current = '/menu'
    setPathname('/menu')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const closeMenu = useCallback(() => {
    if (window.history.state?.captainsLogOrigin) {
      window.history.back()
      return
    }

    window.history.replaceState({}, '', '/#menu-preview')
    previousPathnameRef.current = '/'
    setPathname('/')
    restoreMenuTeaser()
  }, [restoreMenuTeaser])

  const dismissEntrance = useCallback(() => {
    try { sessionStorage.setItem(entranceSessionKey, 'true') } catch { /* Session storage can be unavailable in privacy modes. */ }
    setShowEntrance(false)
  }, [])

  const openWalkthrough = useCallback(() => setIsWalkthroughOpen(true), [])
  const closeWalkthrough = useCallback(() => setIsWalkthroughOpen(false), [])

  if (pathname === '/menu') return <MenuPage onClose={closeMenu} />

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero onOpenWalkthrough={openWalkthrough} />
        <StorySection />
        <PhotoGallery />
        <section className="underwater-showcase" aria-label="An underwater glimpse">
          <div className="page-container underwater-showcase__inner">
            <div className="underwater-showcase__heading">
              <p className="eyebrow">Beneath the waves</p>
              <h2>A glimpse beneath the surface.</h2>
            </div>
            <CinematicFeature className="underwater-showcase__video" label="Underwater world" src="/assets/higgsfield/underwater-fish.mp4" />
          </div>
        </section>
        <MenuPreview onOpenMenu={openMenu} />
        <Reviews />
        <Faq />
        <DiningSpace onOpenWalkthrough={openWalkthrough} />
        <VisitSection />
      </main>
      <Footer />
      <AnimatePresence>{showEntrance && <WebsiteEntrance onDismiss={dismissEntrance} />}</AnimatePresence>
      {isWalkthroughOpen && <WalkthroughDialog onClose={closeWalkthrough} />}
    </div>
  )
}

export default App
