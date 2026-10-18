import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { business } from '../data/business'

interface WalkthroughDialogProps {
  onClose: () => void
}

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function WalkthroughDialog({ onClose }: WalkthroughDialogProps) {
  const dialogRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(document.activeElement instanceof HTMLElement ? document.activeElement : null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    const video = videoRef.current
    const returnFocus = returnFocusRef.current
    dialog?.querySelector<HTMLElement>('button')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      video?.pause()
      if (video) video.currentTime = 0
      returnFocus?.focus()
    }
  }, [onClose])

  return <div className="walkthrough-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="walkthrough-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}><header><div><p className="eyebrow">The Ocean</p><h2 id={titleId}>Walkthrough</h2></div><button type="button" onClick={onClose} aria-label="Close walkthrough"><X aria-hidden="true" size={20} /></button></header><div className="walkthrough-dialog__media"><video ref={videoRef} controls playsInline poster={business.walkthroughPosterUrl} preload="metadata"><source src={business.walkthroughVideoUrl} type="video/mp4" /></video></div><p>Owner-provided walkthrough video.</p></section></div>
}
