export const SECTION_IDS = {
  HERO: 'hero',
  KINGDOM: 'kingdom',
  CITIZENS: 'citizens',
  RULER: 'ruler',
  ADVENTURE: 'adventure',
  CHARACTERS: 'characters',
  GARDEN: 'garden',
  HOUSE: 'house',
  SHOP: 'shop',
  CONTACT: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const BRAND = 'Sweetopia'

export const CURRENCY = '$'

export interface NavLink {
  id: SectionId
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { id: SECTION_IDS.KINGDOM, label: 'Kingdom' },
  { id: SECTION_IDS.CITIZENS, label: 'Citizens' },
  { id: SECTION_IDS.GARDEN, label: 'Garden' },
  { id: SECTION_IDS.HOUSE, label: 'Gingerbread House' },
  { id: SECTION_IDS.SHOP, label: 'Candy Bar' },
  { id: SECTION_IDS.CONTACT, label: 'Contact' },
]
