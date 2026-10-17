import { Anchor } from 'lucide-react'

export function ConceptBanner() {
  return (
    <div className="concept-notice" role="status">
      <Anchor aria-hidden="true" size={15} strokeWidth={1.75} />
      <span>Unofficial concept — not accepting orders</span>
    </div>
  )
}
