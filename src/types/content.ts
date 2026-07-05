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
  price: number
  tag?: string
}
