export const NAV_LINKS = [
  'Cryptocurrencies',
  'Markets',
  'Trade',
  'NFT',
  'Derivatives',
  'Finance',
  'Calendars',
] as const

export type NavLink = (typeof NAV_LINKS)[number]
