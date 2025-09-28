import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { QueryHook } from '@/shared/lib/query/vue-query-types'
import { api, invalidateQueries } from '@/shared/api'
import type {
  CryptoListRequest,
  CryptoListResponse,
  CryptoTopRequest,
  CryptoTopResponse,
  CryptoFavoriteRequest,
  CryptoFavoriteResponse,
  CryptoBySymbolRequest,
  CryptoBySymbolResponse,
  ICryptoServerRow,
} from '../types'
import type { PaginatedListResponse } from '@/shared/api'
import { computed, unref } from 'vue'

export const CRYPTO_QUERY_KEYS = {
  list: ['crypto', 'list'],
  top: ['crypto', 'top'],
  favorite: ['crypto', 'favorite'],
  bySymbol: (symbol: string, period?: string) => ['crypto', 'bySymbol', symbol, period],
} as const

export const useCryptoList: QueryHook<
  CryptoListRequest,
  PaginatedListResponse<ICryptoServerRow>
> = ({ params, options, enabled = true }) => {
  // да, тут нельзя просто так создать:
  // const currentParams = unref(params) - вычисляется один раз при создании query
  // useQuery и queryFn не увидят изменений и не сделают новые запросы

  return useQuery({
    queryKey: computed(() => [...CRYPTO_QUERY_KEYS.list, unref(params)]),
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoListResponse>('/api/crypto', {
        signal,
        params: unref(params),
      })
      return response.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useCryptoTop: QueryHook<CryptoTopRequest, PaginatedListResponse<ICryptoServerRow>> = ({
  params,
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: computed(() => [...CRYPTO_QUERY_KEYS.top, unref(params)]),
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoTopResponse>('/api/crypto/top', {
        signal,
        params: unref(params),
      })
      return response.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useCryptoFavorite: QueryHook<
  CryptoFavoriteRequest,
  PaginatedListResponse<ICryptoServerRow>
> = ({ params, options, enabled = true }) => {
  return useQuery({
    queryKey: computed(() => [...CRYPTO_QUERY_KEYS.favorite, unref(params)]),
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoFavoriteResponse>('/api/crypto/favorite', {
        signal,
        params: unref(params),
      })
      return response.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useCryptoBySymbol: QueryHook<CryptoBySymbolRequest, CryptoBySymbolResponse> = ({
  params,
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: computed(() => {
      const currentParams = unref(params) as CryptoBySymbolRequest
      return [
        ...CRYPTO_QUERY_KEYS.bySymbol(currentParams?.symbol, currentParams?.period),
        unref(params),
      ]
    }),
    queryFn: async ({ signal }) => {
      const currentParams = unref(params) as CryptoBySymbolRequest
      const response = await api.get<CryptoBySymbolResponse>(
        `/api/crypto/${currentParams?.symbol}`,
        {
          signal,
          params: currentParams?.period ? { period: currentParams.period } : undefined,
        },
      )
      return response.data
    },
    enabled: computed(() => {
      return enabled && !!(unref(params) as CryptoBySymbolRequest)?.symbol
    }),
    ...options,
  })
}

export const invalidateCryptoList = () => {
  invalidateQueries(CRYPTO_QUERY_KEYS.list)
}

export const invalidateCryptoTop = () => {
  invalidateQueries(CRYPTO_QUERY_KEYS.top)
}

export const invalidateCryptoFavorite = () => {
  invalidateQueries(CRYPTO_QUERY_KEYS.favorite)
}

export const invalidateCryptoBySymbol = (symbol: string, period?: string) => {
  const queryKey = period
    ? CRYPTO_QUERY_KEYS.bySymbol(symbol, period)
    : ['crypto', 'bySymbol', symbol]
  invalidateQueries(queryKey as readonly string[])
}
