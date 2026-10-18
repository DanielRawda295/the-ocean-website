import { ArrowUpRight, Instagram, MapPin, Phone } from 'lucide-react'
import { business } from '../data/business'

const footerLinks = [
  { href: '#top', label: 'Home' },
  { href: '#story', label: 'Our catch' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#menu-preview', label: 'Menu' },
  { href: '#visit', label: 'Visit' },
]

export function Footer() {
  return <footer className="site-footer" id="contact"><div className="page-container"><div className="footer__top"><div><p className="eyebrow">{business.name}</p><p className="footer__line">{business.tagline}</p></div><div className="footer__socials" aria-label="The Ocean social media"><a href={business.socials.instagram} rel="noopener noreferrer" target="_blank"><Instagram aria-hidden="true" size={17} strokeWidth={1.5} />Instagram</a><a href={business.socials.facebook} rel="noopener noreferrer" target="_blank">Facebook</a><a href={business.socials.tiktok} rel="noopener noreferrer" target="_blank">TikTok</a></div></div><div className="footer__grid"><div className="footer__contact"><p className="footer__label">Find The Ocean</p><a href={business.phone.href}><Phone aria-hidden="true" size={16} strokeWidth={1.5} />{business.phone.display}</a><p><MapPin aria-hidden="true" size={16} strokeWidth={1.5} />{business.address}</p></div><nav aria-label="Footer navigation" className="footer__nav">{footerLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</nav><a className="footer__directions" href={business.directionsUrl} rel="noopener noreferrer" target="_blank"><span>Plan your visit<br />View directions</span><ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.3} /></a></div><div className="footer__bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>Menu availability and dining-space updates are available directly from the restaurant.</span></div></div></footer>
}
