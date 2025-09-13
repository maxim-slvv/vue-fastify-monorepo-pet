export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
  ORDER: 'asc' as const,
  SORT_FIELD: 'rank' as const,
} as const

export const SORT_ORDERS = {
  ASC: 'asc' as const,
  DESC: 'desc' as const,
} as const

export const DEFAULT_PAGE = PAGINATION_DEFAULTS.PAGE
export const DEFAULT_LIMIT = PAGINATION_DEFAULTS.LIMIT
export const MAX_LIMIT = PAGINATION_DEFAULTS.MAX_LIMIT
export const DEFAULT_ORDER = PAGINATION_DEFAULTS.ORDER
export const DEFAULT_SORT_FIELD = PAGINATION_DEFAULTS.SORT_FIELD
export const ORDER_ASC = SORT_ORDERS.ASC
export const ORDER_DESC = SORT_ORDERS.DESC
