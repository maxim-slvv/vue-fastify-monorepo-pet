import { z } from 'zod'
import { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT, ORDER_ASC, ORDER_DESC } from './constants.ts'

export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: dataSchema,
    meta: paginationMetaSchema,
  })
}

export const paginationParamsSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(MAX_LIMIT).optional(),
  sort: z.string().optional(),
  order: z.enum([ORDER_ASC, ORDER_DESC]).optional(),
})

export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
})

export const getDefaultPaginationMeta = (total: number) => ({
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
  total: total,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
})
