import type { MenuItem } from '../types/menu'

export interface ConceptFishItem extends MenuItem {
  verification: 'concept-estimate'
}

export const conceptFishNotice = 'Concept prices only — fish selection and prices are subject to restaurant confirmation.'

export const conceptFishItems: ConceptFishItem[] = [
  { id: 'ajaj-sea-bream', category: 'fish', name: { en: 'Ajaj (Sea Bream)' }, price: { kind: 'per-kilogram', amountUsdPerKg: 22 }, verification: 'concept-estimate' },
  { id: 'brak-sea-bass', category: 'fish', name: { en: 'Brak (Sea Bass)' }, price: { kind: 'per-kilogram', amountUsdPerKg: 28 }, verification: 'concept-estimate' },
  { id: 'sultan-ibrahim', category: 'fish', name: { en: 'Sultan Ibrahim' }, price: { kind: 'per-kilogram', amountUsdPerKg: 30 }, verification: 'concept-estimate' },
  { id: 'miskar-ombrine', category: 'fish', name: { en: 'Miskar (Ombrine)' }, price: { kind: 'per-kilogram', amountUsdPerKg: 26 }, verification: 'concept-estimate' },
  { id: 'mallifa', category: 'fish', name: { en: 'Mallifa' }, price: { kind: 'per-kilogram', amountUsdPerKg: 25 }, verification: 'concept-estimate' },
  { id: 'sargous-white-bream', category: 'fish', name: { en: 'Sargous (White Bream)' }, price: { kind: 'per-kilogram', amountUsdPerKg: 28 }, verification: 'concept-estimate' },
  { id: 'faride', category: 'fish', name: { en: 'Faride' }, price: { kind: 'per-kilogram', amountUsdPerKg: 45 }, verification: 'concept-estimate' },
  { id: 'lokoz-grouper', category: 'fish', name: { en: 'Lokoz (Grouper)' }, price: { kind: 'per-kilogram', amountUsdPerKg: 55 }, verification: 'concept-estimate' },
]
