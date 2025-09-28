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

export const timePeriodSchema = z.enum(['24h', '7d', '14d', '30d', '60d', '200d', '1y'])

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
  ch14d: z.string(),
  ch14d_direction: z.enum(['up', 'down']),
  ch30d: z.string(),
  ch30d_direction: z.enum(['up', 'down']),
  ch60d: z.string(),
  ch60d_direction: z.enum(['up', 'down']),
  ch200d: z.string(),
  ch200d_direction: z.enum(['up', 'down']),
  ch1y: z.string(),
  ch1y_direction: z.enum(['up', 'down']),
  marketCap: z.string(),
  volume24h: z.string(),
  spark: z.object({
    points: z.array(z.number()),
    timestamps: z.array(z.number()),
    period: z.string(),
    pointsPerDay: z.number(),
    totalDays: z.number(),
    resolution: z.string(),
  }),
  isFavorite: z.boolean().optional(),
  site: z.string().url().optional(),
  unlockedMarketCap: z.string().optional(),
  fdv: z.string().optional(),
  volMarketCapRatio: z.string().optional(),
  totalSupply: z.string().optional(),
  maxSupply: z.string().optional(),
  circulatingSupply: z.string().optional(),
  socialNetworks: z
    .object({
      twitter: z.string().url().optional(),
      telegram: z.string().url().optional(),
      discord: z.string().url().optional(),
      reddit: z.string().url().optional(),
    })
    .optional(),
  contracts: z
    .array(
      z.object({
        platform: z.string(),
        address: z.string(),
      }),
    )
    .optional(),
  explorers: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    )
    .optional(),
  wallets: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    )
    .optional(),
  ucid: z.string().optional(),
  allTimeHigh: z
    .object({
      price: z.number(),
      date: z.string(),
    })
    .optional(),
  allTimeLow: z
    .object({
      price: z.number(),
      date: z.string(),
    })
    .optional(),
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
  ch14d: '2.15%',
  ch14d_direction: 'up',
  ch30d: '5.32%',
  ch30d_direction: 'up',
  ch60d: '12.45%',
  ch60d_direction: 'up',
  ch200d: '45.67%',
  ch200d_direction: 'up',
  ch1y: '89.23%',
  ch1y_direction: 'up',
  marketCap: '$766,432,564,346',
  volume24h: '$38,544,965,954',
  spark: {
    points: [1, 2, 3, 4, 5],
    timestamps: [1640995200000, 1640995500000, 1640995800000, 1640996100000, 1640996400000],
    period: '24h',
    pointsPerDay: 288,
    totalDays: 1,
    resolution: '5min',
  },
  isFavorite: true,
  site: 'https://bitcoin.org',
  unlockedMarketCap: '$766,432,564,346',
  fdv: '$766,432,564,346',
  volMarketCapRatio: '5.02%',
  totalSupply: '19,789,431 BTC',
  maxSupply: '21,000,000 BTC',
  circulatingSupply: '19,789,431 BTC',
  socialNetworks: {
    twitter: 'https://twitter.com/bitcoin',
    telegram: 'https://t.me/BitcoinCore',
    discord: 'https://discord.gg/bitcoin',
    reddit: 'https://reddit.com/r/bitcoin',
  },
  contracts: [
    {
      platform: 'Bitcoin',
      address: 'native',
    },
  ],
  explorers: [
    {
      name: 'Blockchain.info',
      url: 'https://blockchain.info',
    },
    {
      name: 'Blockchair',
      url: 'https://blockchair.com/bitcoin',
    },
  ],
  wallets: [
    {
      name: 'Bitcoin Core',
      url: 'https://bitcoincore.org',
    },
    {
      name: 'Electrum',
      url: 'https://electrum.org',
    },
  ],
  ucid: 'bitcoin-btc-1',
  allTimeHigh: {
    price: 73738,
    date: '2024-03-14',
  },
  allTimeLow: {
    price: 0.0495,
    date: '2010-10-29',
  },
}

//?-------------------------- Schemas --------------------------

export const favoriteParamsSchema = z.object({ symbol: cryptoSymbolSchema })
export const favoriteBodySchema = z.object({ isFavorite: z.boolean() })
export const coinParamsSchema = z.object({ symbol: cryptoSymbolSchema })
export const periodQuerySchema = z.object({ period: timePeriodSchema.default('7d') })

export type { z }
