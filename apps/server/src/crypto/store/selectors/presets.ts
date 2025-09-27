import type { z } from '../../types/schema.ts'
import { cryptoRowSchema } from '../../types/schema.ts'

type CryptoRow = z.infer<typeof cryptoRowSchema>
type CryptoFieldsPreset = Record<keyof CryptoRow, boolean>

const minimalFields: CryptoFieldsPreset = {
  rank: true,
  name: true,
  symbol: true,
  image: true,
  price: true,
  ch24h: true,
  ch24h_direction: true,
  ch7d: true,
  ch7d_direction: true,
  marketCap: true,
  volume24h: true,
  spark: true,
  isFavorite: true,
  site: false,
  unlockedMarketCap: false,
  fdv: false,
  volMarketCapRatio: false,
  totalSupply: false,
  maxSupply: false,
  circulatingSupply: false,
  socialNetworks: false,
  contracts: false,
  explorers: false,
  wallets: false,
  ucid: false,
  allTimeHigh: false,
  allTimeLow: false,
}

export const cryptoFieldsPresets = {
  base: {
    ...minimalFields,
  } satisfies CryptoFieldsPreset,
  top: {
    ...minimalFields,
  } satisfies CryptoFieldsPreset,
  favorite: {
    ...minimalFields,
  } satisfies CryptoFieldsPreset,
  full: {
    rank: true,
    name: true,
    symbol: true,
    image: true,
    price: true,
    ch24h: true,
    ch24h_direction: true,
    ch7d: true,
    ch7d_direction: true,
    marketCap: true,
    volume24h: true,
    spark: true,
    isFavorite: true,
    site: true,
    unlockedMarketCap: true,
    fdv: true,
    volMarketCapRatio: true,
    totalSupply: true,
    maxSupply: true,
    circulatingSupply: true,
    socialNetworks: true,
    contracts: true,
    explorers: true,
    wallets: true,
    ucid: true,
    allTimeHigh: true,
    allTimeLow: true,
  } satisfies CryptoFieldsPreset,
} as const
