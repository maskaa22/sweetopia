import { useContext } from 'react'
import { CartContext, type CartContextValue } from '@/context/CartContext'

const useCart = (): CartContextValue => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart має використовуватися всередині <CartProvider>')
  }
  return context
}

export { useCart }
