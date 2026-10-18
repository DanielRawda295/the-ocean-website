const homeSectionIds = ['top', 'story', 'gallery', 'menu-preview', 'reviews', 'faq', 'contact'] as const

export type HomeSectionId = typeof homeSectionIds[number]

export function getHomeSectionId(hash: string): HomeSectionId | null {
  const id = hash.replace(/^#/, '')
  return homeSectionIds.includes(id as HomeSectionId) ? id as HomeSectionId : null
}

function getVisualTarget(id: HomeSectionId) {
  const section = document.getElementById(id)
  if (!section || id === 'top') return section
  return section.querySelector<HTMLElement>('[data-navigation-heading], h1, h2') ?? section
}

export function scrollToHomeSection(id: HomeSectionId, behavior: ScrollBehavior) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const target = getVisualTarget(id)
  const header = document.querySelector<HTMLElement>('.site-header')
  if (!target || !header) return

  const headerHeight = header.getBoundingClientRect().height
  const targetMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || headerHeight
  const visualGap = Math.max(0, targetMargin - headerHeight)
  const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - visualGap
  window.scrollTo({ top: Math.max(0, top), behavior })
}

export function updateHomeHash(id: HomeSectionId) {
  const hash = `#${id}`
  if (window.location.hash !== hash) window.history.pushState(window.history.state, '', hash)
}
