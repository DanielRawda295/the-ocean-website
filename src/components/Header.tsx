import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const navigation = [
  { href: '#top', label: 'Home' },
  { href: '#story', label: 'Our catch' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#menu-preview', label: 'Menu' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('#top')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false)
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus())
  }, [])

  const handleNavigation = (href: string) => {
    setActiveHash(href)
    closeMenu()
  }

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (current) setActiveHash(`#${current.target.id}`)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    mobileNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu(true)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeMenu])

  return (
    <header className="site-header">
      <div className="page-container site-header__inner">
        <a aria-label="The Ocean — home" className="brand" href="#top" onClick={() => handleNavigation('#top')}>
          <img alt="The Ocean fish mark" className="brand__mark" src="/assets/brand/the-ocean-logo.jpg" />
          <span className="brand__name">The Ocean</span>
        </a>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navigation.map((item) => <a aria-current={activeHash === item.href ? 'location' : undefined} className={activeHash === item.href ? 'is-active' : undefined} href={item.href} key={item.href} onClick={() => handleNavigation(item.href)}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#menu-preview" onClick={() => handleNavigation('#menu-preview')}>Explore menu</a>
        <button aria-controls="mobile-navigation" aria-expanded={isOpen} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} className="mobile-menu-button" onClick={() => isOpen ? closeMenu(true) : setIsOpen(true)} ref={menuButtonRef} type="button">
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div aria-hidden={!isOpen} className={`mobile-nav-wrap ${isOpen ? 'mobile-nav-wrap--open' : ''}`} id="mobile-navigation" inert={!isOpen}>
        <nav aria-label="Mobile navigation" className="mobile-nav" ref={mobileNavRef}>
          {navigation.map((item, index) => (
            <a aria-current={activeHash === item.href ? 'location' : undefined} className={activeHash === item.href ? 'is-active' : undefined} href={item.href} key={item.href} onClick={() => handleNavigation(item.href)}><span>0{index + 1}</span>{item.label}</a>
          ))}
          <a className="mobile-nav__cta" href="#menu-preview" onClick={() => handleNavigation('#menu-preview')}>Explore menu</a>
        </nav>
      </div>
    </header>
  )
}
