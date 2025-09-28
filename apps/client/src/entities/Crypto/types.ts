import type { PaginatedListResponse, WithPagination } from '@/shared/api'

export type CryptoTimePeriod = '24h' | '7d' | '14d' | '30d' | '60d' | '200d' | '1y'

export interface RichSparkline {
  points: number[]
  timestamps: number[]
  period: string
  pointsPerDay: number
  totalDays: number
  resolution: string
}

export interface ICryptoServerRow {
  rank: number
  name: string
  symbol: string
  image: string
  price: string
  ch24h: string
  ch24h_direction: 'up' | 'down'
  ch7d: string
  ch7d_direction: 'up' | 'down'
  ch14d: string
  ch14d_direction: 'up' | 'down'
  ch30d: string
  ch30d_direction: 'up' | 'down'
  ch60d: string
  ch60d_direction: 'up' | 'down'
  ch200d: string
  ch200d_direction: 'up' | 'down'
  ch1y: string
  ch1y_direction: 'up' | 'down'
  marketCap: string
  volume24h: string
  spark: RichSparkline
  isFavorite?: boolean
  //--------------------------------
  site?: string
  unlockedMarketCap?: string
  fdv?: string
  volMarketCapRatio?: string
  totalSupply?: string
  maxSupply?: string
  circulatingSupply?: string
  socialNetworks?: {
    twitter?: string
    telegram?: string
    discord?: string
    reddit?: string
  }
  contracts?: {
    platform: string
    address: string
  }[]
  explorers?: {
    name: string
    url: string
  }[]
  wallets?: {
    name: string
    url: string
  }[]
  ucid?: string
  allTimeHigh?: {
    price: number
    date: string
  }
  allTimeLow?: {
    price: number
    date: string
  }
}

export interface ICryptoInternalRow extends Omit<ICryptoServerRow, 'spark'> {
  spark: number[][]
}

export type ICryptoBaseRow = Pick<
  ICryptoServerRow,
  | 'rank'
  | 'name'
  | 'symbol'
  | 'image'
  | 'price'
  | 'ch24h'
  | 'ch24h_direction'
  | 'ch7d'
  | 'ch7d_direction'
  | 'ch14d'
  | 'ch14d_direction'
  | 'ch30d'
  | 'ch30d_direction'
  | 'ch60d'
  | 'ch60d_direction'
  | 'ch200d'
  | 'ch200d_direction'
  | 'ch1y'
  | 'ch1y_direction'
  | 'marketCap'
  | 'volume24h'
  | 'spark'
  | 'isFavorite'
>

export type CryptoListRequest = WithPagination & { period?: CryptoTimePeriod }
export type CryptoTopRequest = WithPagination & { period?: CryptoTimePeriod }
export type CryptoFavoriteRequest = WithPagination & { period?: CryptoTimePeriod }

export type CryptoBySymbolRequest = { symbol: string; period?: CryptoTimePeriod }
export type CryptoBySymbolResponse = ICryptoServerRow

export type CryptoListResponse = PaginatedListResponse<ICryptoBaseRow>
export type CryptoTopResponse = PaginatedListResponse<ICryptoBaseRow>
export type CryptoFavoriteResponse = PaginatedListResponse<ICryptoBaseRow>
