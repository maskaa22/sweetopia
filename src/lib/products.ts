import type { Product } from '@/types/content'

// Sweetopia candy bar -- products for sale. The descriptions are the pastry
// chef's own build lists, kept as supplied: each is what the sweet is made of,
// top layer down, separated by middots rather than written out as a sentence.
export const PRODUCTS: Product[] = [
  {
    id: 'pastel-berry-cupcake',
    name: 'Pastel Berry Cupcake',
    description:
      'Vanilla sponge · Strawberry cream · Raspberry filling · Pastel buttercream · Fresh berries',
    image: '/images/products/1.png',
    price: 6,
    tag: 'hit',
  },
  {
    id: 'raspberry-dream-tart',
    name: 'Raspberry Dream Tart',
    description:
      'Crispy pastry · Vanilla cream · Raspberry confit · Fresh strawberries · Raspberries · White chocolate · Edible flower',
    image: '/images/products/2.png',
    price: 8,
  },
  {
    id: 'strawberry-bliss',
    name: 'Strawberry Bliss',
    description:
      'Vanilla sponge · Vanilla mousse · Raspberry confit · Fresh strawberries & raspberries · White chocolate · Pink macaron',
    image: '/images/products/3.png',
    price: 9,
  },
  {
    id: 'chocolate-hazelnut-dream',
    name: 'Chocolate Hazelnut Dream',
    description:
      'Chocolate sponge · Dark chocolate ganache · Hazelnut praline · Chocolate mousse · Caramel filling · Roasted hazelnuts · Dark chocolate decor',
    image: '/images/products/4.png',
    price: 9,
  },
  {
    id: 'berry-cloud-roulade',
    name: 'Berry Cloud Roulade',
    description:
      'Crisp meringue · Vanilla whipped cream · Raspberry & strawberry confit · Fresh berries · White chocolate · Freeze-dried raspberries',
    image: '/images/products/5.png',
    price: 7,
    tag: 'new',
  },
  // Held open for the sixth sweet. No `image`, so the card shows the
  // placeholder frame; drop the art in and swap the copy when it arrives.
  {
    id: 'sixth-treat',
    name: 'Sixth Treat',
    description: 'Still in the kitchen — its picture and its recipe are on the way.',
    price: 7,
  },
]
