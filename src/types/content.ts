export interface Character {
  id: string
  name: string
  role: string
  description: string
}

export interface Product {
  id: string
  name: string
  description: string
  // Optional: a product still waiting on its photo falls back to the
  // placeholder frame, which is what that component is for.
  image?: string
  price: number
  tag?: string
}
