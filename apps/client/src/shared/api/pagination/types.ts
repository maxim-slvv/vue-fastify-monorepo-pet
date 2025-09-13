export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginationRequest {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}

export interface PaginatedResponse<T> {
  data: T
  meta: PaginationMeta
}

export type PaginatedListResponse<T> = PaginatedResponse<T[]>

export type WithPagination<T = object> = T & PaginationRequest
