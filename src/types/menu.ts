export type MenuPrice =
  | { kind: 'fixed'; amountUsd: number }
  | { kind: 'per-kilogram'; amountUsdPerKg: number }
  | { kind: 'on-request' }

export interface MenuItemName {
  en: string
  ar?: string
}

export interface MenuItem {
  id: string
  category: 'sandwiches' | 'fish' | 'seafood'
  name: MenuItemName
  price: MenuPrice
  image?: string
}
