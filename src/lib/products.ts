import type { Product } from '@/types/content'

// Sweetopia candy bar — products for sale.
export const PRODUCTS: Product[] = [
  {
    id: 'lollipops',
    name: 'Caramel Lollipops',
    description: 'Handmade and boiled on natural juices — one for every taste.',
    price: 5,
    tag: 'hit',
  },
  {
    id: 'cotton-candy',
    name: 'Cotton Candy',
    description: 'A light cloud of sweetness on a stick — straight from the Sugar Tree.',
    price: 6,
  },
  {
    id: 'marshmallow',
    name: 'Handmade Marshmallow',
    description: 'Tender, airy and melts in your mouth — by Mr. Marshmallow’s recipe.',
    price: 5,
  },
  {
    id: 'gingerbread',
    name: 'Chocolate Gingerbread',
    description: 'With glaze and sugar stars, like the walls of the Gingerbread House.',
    price: 7,
  },
  {
    id: 'marmalade',
    name: 'Assorted Marmalade',
    description: 'A fruity mix of all the kingdom’s colors in a single box.',
    price: 5,
    tag: 'new',
  },
  {
    id: 'cupcakes',
    name: 'Sugar King Cupcakes',
    description: 'Royal buttercream and fresh berries on a gingerbread base.',
    price: 9,
  },
]
