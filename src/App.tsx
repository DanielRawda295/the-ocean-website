import { ConceptBanner } from './components/ConceptBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuPreview } from './components/MenuPreview'
import { PhotoGallery } from './components/PhotoGallery'
import { Reviews } from './components/Reviews'
import { StorySection } from './components/StorySection'
import { Faq } from './components/Faq'

function App() {
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
        <MenuPreview />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}

export default App
