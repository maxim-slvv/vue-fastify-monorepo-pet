import type { PaginatedListResponse, WithPagination } from '@/shared/api'

export type CryptoTimePeriod = '24h' | '7d' | '14d' | '30d' | '60d' | '200d' | '1y'

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
  marketCap: string
  volume24h: string
  spark: number[]
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
  | 'marketCap'
  | 'volume24h'
  | 'spark'
  | 'isFavorite'
>

export type CryptoListRequest = WithPagination
export type CryptoTopRequest = WithPagination
export type CryptoFavoriteRequest = WithPagination

export type CryptoBySymbolRequest = { symbol: string }
export type CryptoBySymbolResponse = ICryptoServerRow

export type CryptoListResponse = PaginatedListResponse<ICryptoBaseRow>
export type CryptoTopResponse = PaginatedListResponse<ICryptoBaseRow>
export type CryptoFavoriteResponse = PaginatedListResponse<ICryptoBaseRow>
