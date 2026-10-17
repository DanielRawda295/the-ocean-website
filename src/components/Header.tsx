import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { href: '#top', label: 'Home' },
  { href: '#story', label: 'Our catch' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#menu-preview', label: 'Menu' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="page-container site-header__inner">
        <a aria-label="The Ocean — home" className="brand" href="#top" onClick={closeMenu}>
          <img alt="The Ocean fish mark" className="brand__mark" src="/assets/brand/the-ocean-logo.jpg" />
          <span className="brand__name">The Ocean</span>
        </a>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#menu-preview">Explore menu</a>
        <button aria-controls="mobile-navigation" aria-expanded={isOpen} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} className="mobile-menu-button" onClick={() => setIsOpen((open) => !open)} type="button">
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div aria-hidden={!isOpen} className={`mobile-nav-wrap ${isOpen ? 'mobile-nav-wrap--open' : ''}`} id="mobile-navigation" inert={!isOpen}>
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {navigation.map((item, index) => (
            <a href={item.href} key={item.href} onClick={closeMenu}><span>0{index + 1}</span>{item.label}</a>
          ))}
          <a className="mobile-nav__cta" href="#menu-preview" onClick={closeMenu}>Explore menu</a>
        </nav>
      </div>
    </header>
  )
}
