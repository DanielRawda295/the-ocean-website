import { Play } from 'lucide-react'
import { business } from '../data/business'

export function DiningSpace() {
  return <section className="dining-space section" id="dining-space"><div className="page-container dining-space__inner"><p className="eyebrow">Looking ahead</p><h2>A larger dining space is on the horizon.</h2><p>The Ocean is preparing for a larger dining space. For updates, please contact the restaurant directly.</p>{business.walkthroughVideoUrl && <a className="dining-space__link" href={business.walkthroughVideoUrl} rel="noopener noreferrer" target="_blank"><Play aria-hidden="true" size={16} fill="currentColor" />Watch Walkthrough</a>}</div></section>
}
