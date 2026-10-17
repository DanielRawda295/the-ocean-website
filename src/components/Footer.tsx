import { ArrowUpRight, Instagram, MapPin, Phone } from 'lucide-react'

const footerLinks = [
  { href: '#top', label: 'Home' },
  { href: '#story', label: 'Our catch' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#menu-preview', label: 'Menu preview' },
]

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="page-container">
        <div className="footer__top">
          <div><p className="eyebrow">The Ocean</p><p className="footer__line">Served at your plate.</p></div>
          <a className="footer__instagram" href="https://www.instagram.com/theocean.lb/" rel="noreferrer" target="_blank">Instagram <Instagram aria-hidden="true" size={17} strokeWidth={1.5} /></a>
        </div>
        <div className="footer__grid">
          <div className="footer__contact">
            <p className="footer__label">Find The Ocean</p>
            <a href="tel:+96171242240"><Phone aria-hidden="true" size={16} strokeWidth={1.5} /> 71 242 240</a>
            <p><MapPin aria-hidden="true" size={16} strokeWidth={1.5} /> Remhala, Lebanon</p>
          </div>
          <nav aria-label="Footer navigation" className="footer__nav">
            {footerLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
          <a className="footer__concept" href="#top"><span>Unofficial concept<br />Not accepting orders</span><ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.3} /></a>
        </div>
        <div className="footer__bottom"><span>© {new Date().getFullYear()} The Ocean concept</span><span>Independent design study · Details require owner verification</span></div>
      </div>
    </footer>
  )
}
