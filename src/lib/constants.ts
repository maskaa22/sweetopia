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

export const CURRENCY = 'грн'

export interface NavLink {
  id: SectionId
  label: string
}

export const NAV_LINKS: NavLink[] = [
  { id: SECTION_IDS.KINGDOM, label: 'Королівство' },
  { id: SECTION_IDS.CHARACTERS, label: 'Мешканці' },
  { id: SECTION_IDS.GARDEN, label: 'Сад' },
  { id: SECTION_IDS.HOUSE, label: 'Пряничний дім' },
  { id: SECTION_IDS.SHOP, label: 'Кенді-бар' },
  { id: SECTION_IDS.CONTACT, label: 'Контакти' },
]
