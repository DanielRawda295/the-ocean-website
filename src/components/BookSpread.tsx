import type { MenuItemName, MenuPrice } from '../types/menu'

export interface JournalMenuItem { id: string; name: MenuItemName; price: MenuPrice }
export interface MenuListPage { kind: 'menu'; pageNumber: number; heading: string; items: JournalMenuItem[]; image?: { src: string; caption: string }; note?: string }
export interface PhotoFeaturePage { kind: 'photo'; pageNumber: number; heading: string; image: { src: string; caption: string } }
export type JournalPageData = MenuListPage | PhotoFeaturePage
export interface BookSpreadData { index: number; pages: [JournalPageData, JournalPageData] }

interface BookSpreadProps { spread: BookSpreadData; labelledBy?: string; ariaHidden?: boolean }

function formatPrice(item: JournalMenuItem) {
  if (item.price.kind === 'fixed') return `$${item.price.amountUsd}`
  if (item.price.kind === 'per-kilogram') return `$${item.price.amountUsdPerKg} / kg`
  return 'Price on request'
}

export function JournalPage({ page }: { page: JournalPageData }) {
  if (page.kind === 'photo') {
    return <article className="journal-page journal-page--feature"><span className="journal-page__number" aria-hidden="true">{String(page.pageNumber).padStart(2, '0')}</span><p className="journal-page__eyebrow">{page.heading}</p><figure className="journal-page__feature-media"><img alt="" src={page.image.src} /><figcaption>{page.image.caption}</figcaption></figure><span className="journal-page__corner" aria-hidden="true" /></article>
  }

  return <article className="journal-page"><span className="journal-page__number" aria-hidden="true">{String(page.pageNumber).padStart(2, '0')}</span>{page.image && <figure className="journal-page__media"><img alt="" src={page.image.src} /><figcaption>{page.image.caption}</figcaption></figure>}<p className="journal-page__eyebrow">{page.heading}</p><ul className="journal-page__list">{page.items.map((item) => <li key={item.id}><span>{item.name.en}</span><i aria-hidden="true" /><strong>{formatPrice(item)}</strong></li>)}</ul>{page.note && <p className="journal-page__note">{page.note}</p>}<span className="journal-page__corner" aria-hidden="true" /></article>
}

export function BookSpread({ spread, labelledBy, ariaHidden = false }: BookSpreadProps) {
  return <div className="book-spread" aria-hidden={ariaHidden || undefined} aria-labelledby={labelledBy}><JournalPage page={spread.pages[0]} /><JournalPage page={spread.pages[1]} /></div>
}
