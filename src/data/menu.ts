import type { MenuItem } from '../types/menu'

export const menuItems: MenuItem[] = [
  { id: 'shrimp-fajita', category: 'sandwiches', name: { en: 'Shrimp Fajita' }, price: { kind: 'fixed', amountUsd: 10 } },
  { id: 'shrimp-grilled', category: 'sandwiches', name: { en: 'Shrimp Grilled' }, price: { kind: 'fixed', amountUsd: 7 } },
  { id: 'shrimp-mexican', category: 'sandwiches', name: { en: 'Shrimp Mexican' }, price: { kind: 'fixed', amountUsd: 7 } },
  { id: 'shrimp-crispy', category: 'sandwiches', name: { en: 'Shrimp Crispy' }, price: { kind: 'fixed', amountUsd: 6 } },
  { id: 'felleh-philadelphia', category: 'sandwiches', name: { en: 'Felleh Philadelphia' }, price: { kind: 'fixed', amountUsd: 10 } },
  { id: 'felleh-grilled', category: 'sandwiches', name: { en: 'Felleh Grilled' }, price: { kind: 'fixed', amountUsd: 8 } },
  { id: 'felleh-mexican', category: 'sandwiches', name: { en: 'Felleh Mexican' }, price: { kind: 'fixed', amountUsd: 8 } },
  { id: 'felleh-crispy', category: 'sandwiches', name: { en: 'Felleh Crispy' }, price: { kind: 'fixed', amountUsd: 8 } },
]
