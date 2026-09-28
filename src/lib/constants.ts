export const SECTION_IDS = {
  HERO: 'hero',
  KINGDOM: 'kingdom',
  CITIZENS: 'citizens',
  SHOP: 'shop',
  RULER: 'ruler',
  ADVENTURE: 'adventure',
  CHARACTERS: 'characters',
  GARDEN: 'garden',
  HOUSE: 'house',
  CONTACT: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const BRAND = 'Sweetopia'

export const CURRENCY = '$'

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT: '/products/:id',
  ABOUT: '/about',
} as const

/** Path for one product's page. */
export const productPath = (id: string) => `${ROUTES.PRODUCTS}/${id}`

export interface NavLink {
  /** Either a route of its own or an anchor on the landing page. */
  to: string
  label: string
}

// Anchors are written against the landing page, not as bare `#id`: a bare
// fragment on any other page points at nothing, and the header is on every
// page.
export const NAV_LINKS: NavLink[] = [
  { to: `${ROUTES.HOME}#${SECTION_IDS.KINGDOM}`, label: 'Kingdom' },
  { to: `${ROUTES.HOME}#${SECTION_IDS.CITIZENS}`, label: 'Citizens' },
  { to: ROUTES.PRODUCTS, label: 'Candy Bar' },
  { to: `${ROUTES.HOME}#${SECTION_IDS.GARDEN}`, label: 'Garden' },
  { to: `${ROUTES.HOME}#${SECTION_IDS.HOUSE}`, label: 'Gingerbread House' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: `${ROUTES.HOME}#${SECTION_IDS.CONTACT}`, label: 'Contact' },
]
