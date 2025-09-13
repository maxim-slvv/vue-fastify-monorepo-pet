import type { PaginationParams, PaginationMeta } from './types.ts'
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  DEFAULT_ORDER,
  DEFAULT_SORT_FIELD,
  ORDER_DESC,
} from './constants.ts'

export function createPaginationMeta(params: PaginationParams, total: number): PaginationMeta {
  const page = params.page || DEFAULT_PAGE
  const limit = params.limit || DEFAULT_LIMIT
  const totalPages = Math.ceil(total / limit)

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

export function applyPagination<T>(
  data: T[],
  params: PaginationParams,
): { items: T[]; total: number } {
  const total = data.length

  if (!params.page && !params.limit) {
    return { items: data, total }
  }

  const page = params.page || DEFAULT_PAGE
  const limit = params.limit || DEFAULT_LIMIT
  const offset = (page - 1) * limit
  const items = data.slice(offset, offset + limit)

  return { items, total }
}

export function applySorting<T extends Record<string, string | number | boolean | Date>>(
  data: T[],
  params: Pick<PaginationParams, 'sort' | 'order'>,
): T[] {
  const sortField = params.sort || (params.order ? DEFAULT_SORT_FIELD : null)

  if (!sortField) return data

  return [...data].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    let comparison = 0

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const aNumeric = extractNumericValue(aValue)
      const bNumeric = extractNumericValue(bValue)

      if (aNumeric !== null && bNumeric !== null) {
        comparison = aNumeric - bNumeric
      } else {
        comparison = aValue.localeCompare(bValue)
      }
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime()
    } else {
      const aStr = String(aValue)
      const bStr = String(bValue)
      comparison = aStr.localeCompare(bStr)
    }

    return (params.order || DEFAULT_ORDER) === ORDER_DESC ? -comparison : comparison
  })
}

function extractNumericValue(value: string): number | null {
  const cleaned = value
    .replace(/[$€£¥₹]/g, '') // Remove currency symbols
    .replace(/,/g, '') // Remove thousand separators
    .replace(/\s/g, '') // Remove spaces
    .replace(/[^\d.-]/g, '') // Keep only digits, dots, and minus signs

  const match = cleaned.match(/-?\d+(?:\.\d+)?/)
  if (!match) return null

  const parsed = parseFloat(match[0])
  return isNaN(parsed) ? null : parsed
}

export function applySearch<T extends Record<string, string | number | boolean | Date>>(
  data: T[],
  params: Pick<PaginationParams, 'search'>,
): T[] {
  if (!params.search) return data

  const searchTerm = params.search.toLowerCase().trim()
  if (!searchTerm) return data

  return data.filter((item) => {
    return Object.values(item).some((value) => {
      if (value === null || value === undefined) return false
      const stringValue = String(value).toLowerCase()
      return stringValue.includes(searchTerm)
    })
  })
}

export function isPaginationRequested(params: PaginationParams): boolean {
  return !!(params.page || params.limit)
}
