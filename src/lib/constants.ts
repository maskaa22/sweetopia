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

export const BRAND = 'Солодія'
