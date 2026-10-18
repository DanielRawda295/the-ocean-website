export interface CatchEffectEvent {
  id: number
  productId: string
  origin: { x: number; y: number }
}

type CatchEffectInput = Omit<CatchEffectEvent, 'id'>

let nextEffectId = 0
const listeners = new Set<(event: CatchEffectEvent) => void>()

export function dispatchCatchEffect(input: CatchEffectInput) {
  const event: CatchEffectEvent = { ...input, id: ++nextEffectId }
  listeners.forEach((listener) => listener(event))
}

export function subscribeToCatchEffects(listener: (event: CatchEffectEvent) => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
