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

const CRYPTO_QUERY_KEYS = {
  list: ['crypto', 'list'],
  top: ['crypto', 'top'],
  favorite: ['crypto', 'favorite'],
} as const

export const useCryptoList: QueryHook<CryptoListRequest, ICryptoServerRow[]> = ({
  params,
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: [...CRYPTO_QUERY_KEYS.list, params],
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoListResponse>('/api/crypto', {
        signal,
        params,
      })

      return response.data.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useCryptoTop: QueryHook<CryptoTopRequest, ICryptoServerRow[]> = ({
  params,
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: [...CRYPTO_QUERY_KEYS.top, params],
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoTopResponse>('/api/crypto/top', {
        signal,
        params,
      })
      return response.data.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useCryptoFavorite: QueryHook<CryptoFavoriteRequest, ICryptoServerRow[]> = ({
  params,
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: [...CRYPTO_QUERY_KEYS.favorite, params],
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoFavoriteResponse>('/api/crypto/favorite', {
        signal,
        params,
      })
      return response.data.data
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
