import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MutationHook } from '@/shared/lib/query/vue-query-types'
import { api, invalidateQueries } from '@/shared/api'
import type { ICryptoServerRow } from '../types'

export interface SetFavoriteRequest {
  symbol: string
  isFavorite: boolean
}

export interface SetFavoriteResponse {
  success: boolean
  symbol: string
  isFavorite: boolean
}

const updateFavoriteInArray = (
  array: ICryptoServerRow[],
  symbol: string,
  isFavorite: boolean,
): ICryptoServerRow[] => {
  return array.map((item) => (item.symbol === symbol ? { ...item, isFavorite } : item))
}

export const useSetCryptoFavorite: MutationHook<SetFavoriteRequest, SetFavoriteResponse> = ({
  onSuccess,
  onError,
  onSettled,
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: SetFavoriteRequest) => {
      const response = await api.post<SetFavoriteResponse>(
        `/api/crypto/favorite/${params.symbol}`,
        { isFavorite: params.isFavorite },
      )
      return response
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ['crypto', 'list'] })
      await queryClient.cancelQueries({ queryKey: ['crypto', 'top'] })
      await queryClient.cancelQueries({ queryKey: ['crypto', 'favorite'] })

      const previousList = queryClient.getQueryData<ICryptoServerRow[]>(['crypto', 'list'])
      const previousTop = queryClient.getQueryData<ICryptoServerRow[]>(['crypto', 'top'])
      const previousFavorite = queryClient.getQueryData<ICryptoServerRow[]>(['crypto', 'favorite'])

      queryClient.setQueryData<ICryptoServerRow[]>(['crypto', 'list'], (old) => {
        if (!old || !Array.isArray(old)) return old
        return updateFavoriteInArray(old, variables.symbol, variables.isFavorite)
      })

      queryClient.setQueryData<ICryptoServerRow[]>(['crypto', 'top'], (old) => {
        if (!old || !Array.isArray(old)) return old
        return updateFavoriteInArray(old, variables.symbol, variables.isFavorite)
      })

      queryClient.setQueryData<ICryptoServerRow[]>(['crypto', 'favorite'], (old) => {
        if (!old || !Array.isArray(old)) return old

        if (variables.isFavorite) {
          const listData = queryClient.getQueryData<ICryptoServerRow[]>(['crypto', 'list'])
          const itemToAdd = Array.isArray(listData)
            ? listData.find((item) => item.symbol === variables.symbol)
            : null
          if (itemToAdd && !old.find((item) => item.symbol === variables.symbol)) {
            return [...old, { ...itemToAdd, isFavorite: true }]
          }
        } else {
          return old.filter((item) => item.symbol !== variables.symbol)
        }
        return old
      })

      return { previousList, previousTop, previousFavorite }
    },
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables)
    },
    onError: (error, variables, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(['crypto', 'list'], context.previousList)
      }
      if (context?.previousTop) {
        queryClient.setQueryData(['crypto', 'top'], context.previousTop)
      }
      if (context?.previousFavorite) {
        queryClient.setQueryData(['crypto', 'favorite'], context.previousFavorite)
      }
      onError?.(error, variables, context)
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context)
    },
  })
}

export const invalidateCryptoFavorites = () => {
  invalidateQueries(['crypto', 'favorite'])
}
