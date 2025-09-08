import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MutationHook } from '@/shared/lib/query/vue-query-types'
import { api, invalidateQueries } from '@/shared/api'

export interface SetFavoriteRequest {
  symbol: string
  isFavorite: boolean
}

export interface SetFavoriteResponse {
  success: boolean
  symbol: string
  isFavorite: boolean
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['crypto', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['crypto', 'top'] })
      queryClient.invalidateQueries({ queryKey: ['crypto', 'favorite'] })

      onSuccess?.(data, variables)
    },
    onError: (error, variables, context) => {
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
