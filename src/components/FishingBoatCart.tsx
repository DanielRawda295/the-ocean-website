import { Minus, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { cartStore, getCartQuantity, getCartSubtotal, getLineSubtotal, useCart } from '../store/cartStore'

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function formatUsd(amount: number) {
  return `$${amount.toFixed(2)}`
}

function FishingBoatIcon() {
  return <svg className="boat-cart__illustration" viewBox="0 0 88 58" aria-hidden="true">
    <path className="boat-cart__wave" d="M5 48c7-5 13 5 20 0s13 5 20 0 13 5 20 0 13 5 18 0" />
    <path className="boat-cart__hull" d="M13 35h58l-7 11H24z" />
    <path className="boat-cart__deck" d="M25 34h31" />
    <path className="boat-cart__mast" d="M43 12v23" />
    <path className="boat-cart__sail" d="M45 14c13 4 19 11 20 18H45z" />
    <path className="boat-cart__flag" d="M43 12h10l-3 5 3 5H43z" />
  </svg>
}

export function FishingBoatCart() {
  const cart = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const drawerId = useId()
  const drawerRef = useRef<HTMLElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const closeDrawer = () => setIsOpen(false)
  const openDrawer = () => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setIsOpen(true)
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const frame = window.requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDrawer()
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector))
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
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
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      returnFocusRef.current?.focus()
    }
  }, [isOpen])

  const quantity = getCartQuantity(cart)
  const subtotal = getCartSubtotal(cart)

  return <>
    <button className="boat-cart" type="button" onClick={openDrawer} aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={drawerId}>
      <FishingBoatIcon />
      <span className="boat-cart__label">Demo boat</span>
      <span className="boat-cart__count" aria-label={`${quantity} item${quantity === 1 ? '' : 's'} in demo cart`}>{quantity}</span>
    </button>
    {isOpen && <div className="cart-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDrawer() }}>
      <aside className="cart-drawer" id={drawerId} ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby={`${drawerId}-title`} tabIndex={-1}>
        <header className="cart-drawer__header"><div><p className="cart-drawer__eyebrow">Unofficial concept</p><h2 id={`${drawerId}-title`}>Demo Boat Cart</h2></div><button className="cart-drawer__close" type="button" onClick={closeDrawer} aria-label="Close demo cart"><X aria-hidden="true" size={20} /></button></header>
        {cart.lines.length === 0 ? <p className="cart-drawer__empty">Your boat is waiting for its first confirmed sandwich.</p> : <ul className="cart-drawer__lines">{cart.lines.map((line) => <li key={line.id}><div className="cart-drawer__line-main"><div><h3>{line.name}</h3><p>{formatUsd(line.unitPrice)} · {line.verification}</p></div><strong>{formatUsd(getLineSubtotal(line))}</strong></div><div className="cart-drawer__line-actions"><div className="cart-quantity" aria-label={`Quantity for ${line.name}`}><button type="button" onClick={() => cartStore.setQuantity(line.id, line.quantity - 1)} aria-label={`Decrease ${line.name} quantity`}><Minus aria-hidden="true" size={14} /></button><output aria-label={`${line.quantity} ${line.name}`}>{line.quantity}</output><button type="button" onClick={() => cartStore.setQuantity(line.id, line.quantity + 1)} aria-label={`Increase ${line.name} quantity`}><Plus aria-hidden="true" size={14} /></button></div><button className="cart-drawer__remove" type="button" onClick={() => cartStore.removeItem(line.id)}><Trash2 aria-hidden="true" size={14} />Remove</button></div></li>)}</ul>}
        <footer className="cart-drawer__footer"><div><span>Demo subtotal</span><strong>{formatUsd(subtotal)}</strong></div><button type="button" onClick={() => cartStore.clearCart()} disabled={cart.lines.length === 0}>Clear cart</button><p>No payment or order submission is available in this concept.</p></footer>
      </aside>
    </div>}
  </>
}
