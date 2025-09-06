import { z } from 'zod'

export const IMAGE_SYMBOLS = [
  'ADA',
  'BCH',
  'BTC',
  'DOGE',
  'ETH',
  'LTC',
  'MAGIC',
  'MEME',
  'PENGU',
  'PEPE',
  'POPCAT',
  'PROVE',
  'RAD',
  'SHIB',
  'SOL',
  'SUI',
  'TON',
  'TRUMP',
  'UNI',
  'USDT',
  'WIF',
  'XLM',
] as const

export const cryptoSymbolSchema = z.enum(IMAGE_SYMBOLS)

export const cryptoRowSchema = z.object({
  rank: z.number(),
  name: z.string(),
  symbol: cryptoSymbolSchema,
  image: z.string().regex(/^\/cdn\/image\/[A-Z]+\.png$/, 'image must be like /cdn/image/BTC.png'),
  price: z.string(),
  ch24h: z.string(),
  ch24h_direction: z.enum(['up', 'down']),
  ch7d: z.string(),
  ch7d_direction: z.enum(['up', 'down']),
  marketCap: z.string(),
  volume24h: z.string(),
  spark: z.array(z.number()),
  isFavorite: z.boolean().optional(),
})

//?-------------------------- For Swagger --------------------------

type CryptoRow = z.infer<typeof cryptoRowSchema>

export const cryptoFieldExamples: { [K in keyof CryptoRow]-?: CryptoRow[K] } = {
  rank: 1,
  name: 'Bitcoin',
  symbol: 'BTC',
  image: '/cdn/image/BTC.png',
  price: '$50,451.51',
  ch24h: '0.43%',
  ch24h_direction: 'down',
  ch7d: '0.85%',
  ch7d_direction: 'down',
  marketCap: '$766,432,564,346',
  volume24h: '$38,544,965,954',
  spark: [1, 2, 3, 4, 5],
  isFavorite: true,
}

//?-------------------------- Schemas --------------------------

export const favoriteParamsSchema = z.object({ symbol: cryptoSymbolSchema })
export const favoriteBodySchema = z.object({ isFavorite: z.boolean() })

export type { z }
