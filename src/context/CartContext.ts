import { createContext } from 'react'
import type { Product } from '@/types/content'

export interface CartItem extends Product {
  quantity: number
}

export interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  add: (product: Product) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  remove: (id: string) => void
  open: () => void
  close: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
