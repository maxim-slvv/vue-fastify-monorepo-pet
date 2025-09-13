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
  ICryptoServerRow,
} from '../types'
import type { PaginatedListResponse } from '@/shared/api'
import { computed, unref } from 'vue'

export const CRYPTO_QUERY_KEYS = {
  list: ['crypto', 'list'],
  top: ['crypto', 'top'],
  favorite: ['crypto', 'favorite'],
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

export const invalidateCryptoList = () => {
  invalidateQueries(CRYPTO_QUERY_KEYS.list)
}

export const invalidateCryptoTop = () => {
  invalidateQueries(CRYPTO_QUERY_KEYS.top)
}

export const invalidateCryptoFavorite = () => {
  invalidateQueries(CRYPTO_QUERY_KEYS.favorite)
}
