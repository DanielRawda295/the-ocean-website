import type { MenuItemName, MenuPrice } from '../types/menu'

export type ConceptMenuSection = 'Fish & Chips' | 'Seafood Platters' | 'Sides' | 'Soft Drinks'

export interface ConceptMenuItem {
  id: string
  section: ConceptMenuSection
  name: MenuItemName
  price: MenuPrice
  verification: 'concept-placeholder'
}

export const conceptMenuNotice = 'Concept menu and sample prices — subject to restaurant confirmation.'

export const conceptMenuItems: ConceptMenuItem[] = [
  { id: 'classic-fish-chips', section: 'Fish & Chips', name: { en: 'Classic Fish & Chips' }, price: { kind: 'fixed', amountUsd: 12 }, verification: 'concept-placeholder' },
  { id: 'crispy-fish-fillet-platter', section: 'Fish & Chips', name: { en: 'Crispy Fish Fillet Platter' }, price: { kind: 'fixed', amountUsd: 14 }, verification: 'concept-placeholder' },
  { id: 'fish-fingers-fries', section: 'Fish & Chips', name: { en: 'Fish Fingers & Fries' }, price: { kind: 'fixed', amountUsd: 9 }, verification: 'concept-placeholder' },
  { id: 'shrimp-chips', section: 'Fish & Chips', name: { en: 'Shrimp & Chips' }, price: { kind: 'fixed', amountUsd: 13 }, verification: 'concept-placeholder' },
  { id: 'calamari-chips', section: 'Fish & Chips', name: { en: 'Calamari & Chips' }, price: { kind: 'fixed', amountUsd: 14 }, verification: 'concept-placeholder' },
  { id: 'grilled-fish-fillet-platter', section: 'Seafood Platters', name: { en: 'Grilled Fish Fillet Platter' }, price: { kind: 'fixed', amountUsd: 16 }, verification: 'concept-placeholder' },
  { id: 'crispy-shrimp-platter', section: 'Seafood Platters', name: { en: 'Crispy Shrimp Platter' }, price: { kind: 'fixed', amountUsd: 15 }, verification: 'concept-placeholder' },
  { id: 'mixed-seafood-platter', section: 'Seafood Platters', name: { en: 'Mixed Seafood Platter' }, price: { kind: 'fixed', amountUsd: 24 }, verification: 'concept-placeholder' },
  { id: 'french-fries', section: 'Sides', name: { en: 'French Fries' }, price: { kind: 'fixed', amountUsd: 3 }, verification: 'concept-placeholder' },
  { id: 'spicy-fries', section: 'Sides', name: { en: 'Spicy Fries' }, price: { kind: 'fixed', amountUsd: 4 }, verification: 'concept-placeholder' },
  { id: 'coleslaw', section: 'Sides', name: { en: 'Coleslaw' }, price: { kind: 'fixed', amountUsd: 3 }, verification: 'concept-placeholder' },
  { id: 'green-salad', section: 'Sides', name: { en: 'Green Salad' }, price: { kind: 'fixed', amountUsd: 5 }, verification: 'concept-placeholder' },
  { id: 'tartar-sauce', section: 'Sides', name: { en: 'Tartar Sauce' }, price: { kind: 'fixed', amountUsd: 1 }, verification: 'concept-placeholder' },
  { id: 'garlic-sauce', section: 'Sides', name: { en: 'Garlic Sauce' }, price: { kind: 'fixed', amountUsd: 1 }, verification: 'concept-placeholder' },
  { id: 'coca-cola', section: 'Soft Drinks', name: { en: 'Coca-Cola' }, price: { kind: 'fixed', amountUsd: 2 }, verification: 'concept-placeholder' },
  { id: 'coca-cola-zero', section: 'Soft Drinks', name: { en: 'Coca-Cola Zero' }, price: { kind: 'fixed', amountUsd: 2 }, verification: 'concept-placeholder' },
  { id: 'sprite', section: 'Soft Drinks', name: { en: 'Sprite' }, price: { kind: 'fixed', amountUsd: 2 }, verification: 'concept-placeholder' },
  { id: 'fanta', section: 'Soft Drinks', name: { en: 'Fanta' }, price: { kind: 'fixed', amountUsd: 2 }, verification: 'concept-placeholder' },
  { id: 'water-small', section: 'Soft Drinks', name: { en: 'Water (small)' }, price: { kind: 'fixed', amountUsd: 1 }, verification: 'concept-placeholder' },
  { id: 'sparkling-water', section: 'Soft Drinks', name: { en: 'Sparkling Water' }, price: { kind: 'fixed', amountUsd: 2 }, verification: 'concept-placeholder' },
  { id: 'fresh-lemonade', section: 'Soft Drinks', name: { en: 'Fresh Lemonade' }, price: { kind: 'fixed', amountUsd: 4 }, verification: 'concept-placeholder' },
]
