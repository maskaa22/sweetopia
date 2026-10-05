import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '@/types/content'
import { PRODUCTS } from '@/lib/products'
import {
  CartContext,
  type CartItem,
  type CartContextValue,
  type CartStatus,
} from './CartContext'

const STORAGE_KEY = 'sweetopia.cart'

interface CartProviderProps {
  children: ReactNode
}

// Only the id and the quantity are kept. Everything else -- name, price,
// picture -- is looked up again from the catalogue on the way back in, so a
// cart left from an earlier visit cannot resurrect an old price or a sweet
// that has since been taken off the menu.
interface StoredLine {
  id: string
  quantity: number
}

const readStored = (): CartItem[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.flatMap((entry): CartItem[] => {
      const line = entry as Partial<StoredLine>
      const product = PRODUCTS.find((item) => item.id === line.id)
      const quantity = Math.floor(Number(line.quantity))

      if (!product || !Number.isFinite(quantity) || quantity < 1) return []
      return [{ ...product, quantity }]
    })
  } catch {
    // Storage can be unavailable or hold something we did not write. An empty
    // cart is the right answer either way; it is not worth failing the app.
    return []
  }
}

const CartProvider = ({ children }: CartProviderProps) => {
  // Read once, on the way up -- an effect would paint an empty cart first and
  // then fill it, which flashes.
  const [items, setItems] = useState<CartItem[]>(readStored)
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<CartStatus>('idle')
  const [placed, setPlaced] = useState(0)

  useEffect(() => {
    try {
      const lines: StoredLine[] = items.map(({ id, quantity }) => ({ id, quantity }))
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Full, or blocked. The cart still works for this visit.
    }
  }, [items])

  const add = useCallback((product: Product) => {
    setStatus('idle')
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }, [])

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  // Reads `items` from the closure rather than from an updater: a state
  // updater has to be pure, and React runs it twice in development, so the
  // other two setters do not belong inside one.
  const checkout = useCallback(() => {
    if (items.length === 0) return

    setPlaced(items.reduce((sum, item) => sum + item.price * item.quantity, 0))
    setStatus('placed')
    setItems([])
  }, [items])

  const open = useCallback(() => setIsOpen(true), [])

  const close = useCallback(() => {
    setIsOpen(false)
    // Back to a normal cart once the confirmation has been dismissed -- but
    // only after it is out of sight, so it does not change as it slides away.
    window.setTimeout(() => setStatus('idle'), 350)
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return {
      items,
      count,
      total,
      isOpen,
      status,
      placed,
      add,
      increment,
      decrement,
      remove,
      checkout,
      open,
      close,
    }
  }, [items, isOpen, status, placed, add, increment, decrement, remove, checkout, open, close])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
