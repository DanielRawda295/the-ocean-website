import { Minus, Plus, Trash2, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { cartStore, getCartQuantity, getCartSubtotal, getLineSubtotal, useCart } from '../store/cartStore'
import { subscribeToCatchEffects, type CatchEffectEvent } from '../store/cartEffects'

const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function formatUsd(amount: number) {
  return `$${amount.toFixed(2)}`
}

function FishingBoatIcon({ hasCatch }: { hasCatch: boolean }) {
  return <svg className="boat-cart__illustration" viewBox="0 0 88 58" aria-hidden="true">
    <path className="boat-cart__wave" d="M5 48c7-5 13 5 20 0s13 5 20 0 13 5 20 0 13 5 18 0" />
    <path className="boat-cart__hull" d="M13 35h58l-7 11H24z" />
    {hasCatch && <path className="boat-cart__cargo" d="M35 34c2-5 8-5 10 0-2 3-7 3-10 0Z" />}
    <path className="boat-cart__deck" d="M25 34h31" />
    <path className="boat-cart__mast" d="M43 12v23" />
    <path className="boat-cart__sail" d="M45 14c13 4 19 11 20 18H45z" />
    <path className="boat-cart__flag" d="M43 12h10l-3 5 3 5H43z" />
  </svg>
}

interface ActiveCatch extends CatchEffectEvent {
  destination: { x: number; y: number }
  control: { x: number; y: number }
  rotation: number
}

function CatchFish() {
  return <svg viewBox="0 0 76 50" aria-hidden="true">
    <path className="catch-fish__line" d="M38 0v12" />
    <path className="catch-fish__hook" d="M38 12c-5 0-5 8 0 8 3 0 3-4 1-4" />
    <path className="catch-fish__body" d="M19 28c8-12 25-12 34 0-9 12-26 12-34 0Z" />
    <path className="catch-fish__tail" d="M20 28 7 18v20z" />
    <circle className="catch-fish__eye" cx="43" cy="25" r="1.8" />
  </svg>
}

export function FishingBoatCart() {
  const cart = useCart()
  const shouldReduceMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [activeCatches, setActiveCatches] = useState<ActiveCatch[]>([])
  const [arrivalSequence, setArrivalSequence] = useState(0)
  const [isRocking, setIsRocking] = useState(false)
  const drawerId = useId()
  const boatRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const rockResetRef = useRef<number | null>(null)
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

  useEffect(() => {
    const removeListener = subscribeToCatchEffects((event) => {
      if (shouldReduceMotion || !boatRef.current) return
      const boatBounds = boatRef.current.getBoundingClientRect()
      const destination = { x: boatBounds.left + boatBounds.width / 2, y: boatBounds.top + boatBounds.height * .48 }
      const distance = Math.hypot(destination.x - event.origin.x, destination.y - event.origin.y)
      const control = { x: (event.origin.x + destination.x) / 2 + Math.min(90, distance * .14), y: Math.min(event.origin.y, destination.y) - Math.min(150, 55 + distance * .15) }
      const rotation = Math.atan2(destination.y - control.y, destination.x - control.x) * 180 / Math.PI
      setActiveCatches((current) => [...current, { ...event, destination, control, rotation }].slice(-4))
    })
    const cancelEffects = () => setActiveCatches([])
    window.addEventListener('resize', cancelEffects)
    return () => {
      removeListener()
      window.removeEventListener('resize', cancelEffects)
      if (rockResetRef.current) window.clearTimeout(rockResetRef.current)
    }
  }, [shouldReduceMotion])

  const handleCatchArrival = (effectId: number) => {
    setActiveCatches((current) => current.filter((effect) => effect.id !== effectId))
    setArrivalSequence((value) => value + 1)
    setIsRocking(false)
    window.requestAnimationFrame(() => setIsRocking(true))
    if (rockResetRef.current) window.clearTimeout(rockResetRef.current)
    rockResetRef.current = window.setTimeout(() => setIsRocking(false), 720)
  }

  const quantity = getCartQuantity(cart)
  const subtotal = getCartSubtotal(cart)

  return <>
    <button className={`boat-cart${isRocking ? ' boat-cart--rocking' : ''}`} ref={boatRef} type="button" onClick={openDrawer} aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={drawerId}>
      <FishingBoatIcon hasCatch={quantity > 0} />
      {quantity > 0 && <span className="boat-cart__catch" key={arrivalSequence} aria-hidden="true">✦</span>}
      <span className="boat-cart__label">Demo boat</span>
      <span className="boat-cart__count" aria-label={`${quantity} item${quantity === 1 ? '' : 's'} in demo cart`}>{quantity}</span>
    </button>
    <div className="catch-effects" aria-hidden="true">{activeCatches.map((effect) => <motion.div className="catch-fish" key={effect.id} initial={{ x: effect.origin.x - 38, y: effect.origin.y - 25, rotate: 0, opacity: 1, scale: .8 }} animate={{ x: [effect.origin.x - 38, effect.control.x - 38, effect.destination.x - 38], y: [effect.origin.y - 25, effect.control.y - 25, effect.destination.y - 25], rotate: [0, effect.rotation - 18, effect.rotation], opacity: [1, 1, .95], scale: [.8, 1, .86] }} transition={{ duration: .98, ease: [0.22, 1, 0.36, 1], times: [0, .54, 1] }} onAnimationComplete={() => handleCatchArrival(effect.id)}><CatchFish /></motion.div>)}</div>
    {isOpen && <div className="cart-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDrawer() }}>
      <aside className="cart-drawer" id={drawerId} ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby={`${drawerId}-title`} tabIndex={-1}>
        <header className="cart-drawer__header"><div><p className="cart-drawer__eyebrow">Demo cart</p><h2 id={`${drawerId}-title`}>Demo Boat Cart</h2></div><button className="cart-drawer__close" type="button" onClick={closeDrawer} aria-label="Close demo cart"><X aria-hidden="true" size={20} /></button></header>
        {cart.lines.length === 0 ? <p className="cart-drawer__empty">Your boat is waiting for its first confirmed sandwich.</p> : <ul className="cart-drawer__lines">{cart.lines.map((line) => <li key={line.id}><div className="cart-drawer__line-main"><div><h3>{line.name}</h3><p>{formatUsd(line.unitPrice)} · {line.verification}</p></div><strong>{formatUsd(getLineSubtotal(line))}</strong></div><div className="cart-drawer__line-actions"><div className="cart-quantity" aria-label={`Quantity for ${line.name}`}><button type="button" onClick={() => cartStore.setQuantity(line.id, line.quantity - 1)} aria-label={`Decrease ${line.name} quantity`}><Minus aria-hidden="true" size={14} /></button><output aria-label={`${line.quantity} ${line.name}`}>{line.quantity}</output><button type="button" onClick={() => cartStore.setQuantity(line.id, line.quantity + 1)} aria-label={`Increase ${line.name} quantity`}><Plus aria-hidden="true" size={14} /></button></div><button className="cart-drawer__remove" type="button" onClick={() => cartStore.removeItem(line.id)}><Trash2 aria-hidden="true" size={14} />Remove</button></div></li>)}</ul>}
        <footer className="cart-drawer__footer"><div><span>Demo subtotal</span><strong>{formatUsd(subtotal)}</strong></div><button type="button" onClick={() => cartStore.clearCart()} disabled={cart.lines.length === 0}>Clear cart</button><p>No payment or order submission is available in this demo.</p></footer>
      </aside>
    </div>}
  </>
}
