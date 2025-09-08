import { z } from 'zod'
import { paginationParamsSchema, paginationMetaSchema } from './schemas.ts'

export type PaginationParams = z.infer<typeof paginationParamsSchema>

export type PaginationMeta = z.infer<typeof paginationMetaSchema>

export type PaginatedResponse<T> = {
  data: T
  meta: PaginationMeta
}

export interface PaginatedRepository<T> {
  getAll(): Promise<T[]>
}
