import type { PaginatedListResponse, WithPagination } from '@/shared/api'

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
}

export type CryptoListRequest = WithPagination
export type CryptoTopRequest = WithPagination
export type CryptoFavoriteRequest = WithPagination

export type CryptoListResponse = PaginatedListResponse<ICryptoServerRow>
export type CryptoTopResponse = PaginatedListResponse<ICryptoServerRow>
export type CryptoFavoriteResponse = PaginatedListResponse<ICryptoServerRow>
