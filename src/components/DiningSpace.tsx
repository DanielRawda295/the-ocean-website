import { Play } from 'lucide-react'
import { business } from '../data/business'

interface DiningSpaceProps { onOpenWalkthrough: () => void }

export function DiningSpace({ onOpenWalkthrough }: DiningSpaceProps) {
  return <section className="dining-space section" id="dining-space"><div className="page-container dining-space__inner"><div><p className="eyebrow">Looking ahead</p><h2>A larger dining space is on the horizon.</h2><p>The Ocean is preparing for a larger dining space. For updates, please contact the restaurant directly.</p>{business.walkthroughVideoUrl && <button className="dining-space__link" type="button" onClick={onOpenWalkthrough}><Play aria-hidden="true" size={16} fill="currentColor" />Watch Walkthrough</button>}</div>{business.walkthroughPosterUrl && <button className="dining-space__preview" type="button" onClick={onOpenWalkthrough} aria-label="Watch The Ocean walkthrough"><img alt="Preview of The Ocean owner walkthrough" decoding="async" loading="lazy" src={business.walkthroughPosterUrl} /><span><Play aria-hidden="true" size={21} fill="currentColor" />Watch Walkthrough</span></button>}</div></section>
}
