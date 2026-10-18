import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { business } from '../data/business'

const socialLinks = [
  { href: business.socials.instagram, label: 'Instagram' },
  { href: business.socials.facebook, label: 'Facebook' },
  { href: business.socials.tiktok, label: 'TikTok' },
]

export function VisitSection() {
  return <section className="visit section" id="visit"><div className="page-container visit__grid"><div><p className="eyebrow">Visit The Ocean</p><h2>Find your way<br />to the table.</h2></div><div className="visit__details"><p><MapPin aria-hidden="true" size={18} strokeWidth={1.5} /><span>{business.address}</span></p><a href={business.phone.href}><Phone aria-hidden="true" size={17} strokeWidth={1.5} />{business.phone.display}</a><a className="visit__directions" href={business.directionsUrl} rel="noopener noreferrer" target="_blank">View Directions <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} /></a><div className="visit__socials" aria-label="The Ocean social media">{socialLinks.map((link) => <a href={link.href} key={link.label} rel="noopener noreferrer" target="_blank">{link.label}</a>)}</div></div></div></section>
}
