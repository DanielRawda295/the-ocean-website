import { Anchor } from 'lucide-react'

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="concept-notice" role="status">
        <Anchor aria-hidden="true" size={15} strokeWidth={1.75} />
        <span>Unofficial concept — not accepting orders</span>
      </div>

      <header className="site-header">
        <div className="page-container site-header__inner">
          <a aria-label="The Ocean home" className="brand" href="#main-content">
            <span className="brand__mark" aria-hidden="true">
              <img alt="" src="/assets/brand/the-ocean-logo.jpg" />
            </span>
            <span className="brand__name">The Ocean</span>
          </a>
          <span className="site-header__status">Foundation</span>
        </div>
      </header>

      <main className="page-container foundation" id="main-content" tabIndex={-1}>
        <p className="eyebrow">Remhala, Lebanon</p>
        <h1>From the sea. To your plate.</h1>
        <p className="foundation__copy">
          The Ocean’s unofficial concept website is being prepared with a thoughtful,
          accessible foundation.
        </p>
        <div className="foundation__rule" aria-hidden="true" />
        <p className="foundation__caption">
          Menu, cart, and demo checkout experiences will be introduced in later review phases.
        </p>
      </main>
    </div>
  )
}

export default App
