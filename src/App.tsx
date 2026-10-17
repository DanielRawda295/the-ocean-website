import { useCallback, useEffect, useState } from 'react'
import { ConceptBanner } from './components/ConceptBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuPreview } from './components/MenuPreview'
import { MenuPage } from './components/MenuPage'
import { PhotoGallery } from './components/PhotoGallery'
import { Reviews } from './components/Reviews'
import { StorySection } from './components/StorySection'
import { Faq } from './components/Faq'

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  const restoreMenuTeaser = useCallback(() => {
    window.requestAnimationFrame(() => {
      const teaser = document.getElementById('menu-preview')
      teaser?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
      if (window.location.pathname === '/') restoreMenuTeaser()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [restoreMenuTeaser])

  const openMenu = useCallback(() => {
    window.history.pushState({ captainsLogOrigin: true }, '', '/menu')
    setPathname('/menu')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const closeMenu = useCallback(() => {
    if (window.history.state?.captainsLogOrigin) {
      window.history.back()
      return
    }

    window.history.replaceState({}, '', '/#menu-preview')
    setPathname('/')
    restoreMenuTeaser()
  }, [restoreMenuTeaser])

  if (pathname === '/menu') return <MenuPage onClose={closeMenu} />

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ConceptBanner />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <StorySection />
        <PhotoGallery />
        <MenuPreview onOpenMenu={openMenu} />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

export default App
