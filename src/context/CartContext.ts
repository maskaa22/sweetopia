import { createContext } from 'react'
import type { Product } from '@/types/content'

export interface CartItem extends Product {
  quantity: number
}

/** `placed` is the moment after checkout, before the drawer is dismissed. */
export type CartStatus = 'idle' | 'placed'

export interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  status: CartStatus
  /** What the order came to, kept for the confirmation after the cart empties. */
  placed: number
  add: (product: Product) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  remove: (id: string) => void
  checkout: () => void
  open: () => void
  close: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
