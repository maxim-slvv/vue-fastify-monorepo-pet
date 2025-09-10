import type { PaginatedListResponse, WithPagination } from '@/shared/api'

export interface NewsRow {
  id: string
  title: string
  summary: string
  publishedAt: string
  source: string
  url: string
  verified?: boolean
  sourceAvatar?: string
  image?: string
  tags: string[]
  isFeatured?: boolean
  reactions?: { type: 'LIKE' | 'GOOD' | 'FIRE' | 'BULL' | 'CELEBRATION' | 'FOMO'; count: number }[]
  toolbar?: { views?: string | number; comments?: number; reposts?: number; smiles?: number }
}

export type NewsListRequest = WithPagination
export type NewsBriefRequest = WithPagination

export type NewsListResponse = PaginatedListResponse<NewsRow>
export type NewsBriefResponse = PaginatedListResponse<NewsRow>
