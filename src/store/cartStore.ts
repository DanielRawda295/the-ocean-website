import { useSyncExternalStore } from 'react'

export type CartVerification = 'confirmed'

export interface CartProduct {
  id: string
  name: string
  unitPrice: number
  verification: CartVerification
}

export interface CartLine extends CartProduct {
  quantity: number
}

export interface CartSnapshot {
  lines: readonly CartLine[]
}

let snapshot: CartSnapshot = { lines: [] }
const listeners = new Set<() => void>()

function publish(lines: readonly CartLine[]) {
  snapshot = { lines }
  listeners.forEach((listener) => listener())
}

function addItem(product: CartProduct) {
  const existingLine = snapshot.lines.find((line) => line.id === product.id)
  if (existingLine) {
    publish(snapshot.lines.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line))
    return
  }
  publish([...snapshot.lines, { ...product, quantity: 1 }])
}

function removeItem(productId: string) {
  const lines = snapshot.lines.filter((line) => line.id !== productId)
  if (lines.length !== snapshot.lines.length) publish(lines)
}

function setQuantity(productId: string, quantity: number) {
  const nextQuantity = Math.max(0, Math.floor(quantity))
  if (nextQuantity === 0) return removeItem(productId)

  let changed = false
  const lines = snapshot.lines.map((line) => {
    if (line.id !== productId || line.quantity === nextQuantity) return line
    changed = true
    return { ...line, quantity: nextQuantity }
  })
  if (changed) publish(lines)
}

function clearCart() {
  if (snapshot.lines.length > 0) publish([])
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const cartStore = { addItem, removeItem, setQuantity, clearCart, subscribe, getSnapshot: () => snapshot }

export function getCartQuantity(cart: CartSnapshot) {
  return cart.lines.reduce((total, line) => total + line.quantity, 0)
}

export function getLineSubtotal(line: CartLine) {
  return line.unitPrice * line.quantity
}

export function getCartSubtotal(cart: CartSnapshot) {
  return cart.lines.reduce((total, line) => total + getLineSubtotal(line), 0)
}

export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
}
