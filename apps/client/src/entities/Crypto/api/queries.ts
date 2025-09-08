import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { QueryHook } from '@/shared/lib/query/vue-query-types'
import { api, invalidateQueries } from '@/shared/api'
import type { CryptoListResponse, CryptoTopResponse, CryptoFavoriteResponse } from '../types'

const CRYPTO_QUERY_KEYS = {
  list: ['crypto', 'list'],
  top: ['crypto', 'top'],
  favorite: ['crypto', 'favorite'],
} as const

export const useCryptoList: QueryHook<void, CryptoListResponse> = ({ options, enabled = true }) => {
  return useQuery({
    queryKey: CRYPTO_QUERY_KEYS.list,
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoListResponse>('/api/crypto', {
        signal,
      })
      return response.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useCryptoTop: QueryHook<void, CryptoTopResponse> = ({ options, enabled = true }) => {
  return useQuery({
    queryKey: CRYPTO_QUERY_KEYS.top,
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoTopResponse>('/api/crypto/top', {
        signal,
      })
      return response.data
    },
    placeholderData: keepPreviousData,
    enabled,
    ...options,
  })
}

export const useCryptoFavorite: QueryHook<void, CryptoFavoriteResponse> = ({
  options,
  enabled = true,
}) => {
  return useQuery({
    queryKey: CRYPTO_QUERY_KEYS.favorite,
    queryFn: async ({ signal }) => {
      const response = await api.get<CryptoFavoriteResponse>('/api/crypto/favorite', {
        signal,
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
