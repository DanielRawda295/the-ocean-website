import { BookScene } from './BookScene'

interface MenuPageProps {
  onClose: () => void
}

export function MenuPage({ onClose }: MenuPageProps) {
  return (
    <main className="menu-page" id="main-content" tabIndex={-1}>
      <header className="menu-page__header page-container">
        <div className="menu-page__brand">
          <img alt="" src="/assets/brand/the-ocean-logo.jpg" />
          <span>The Ocean</span>
        </div>
      </header>
      <BookScene onClosed={onClose} />
    </main>
  )
}
