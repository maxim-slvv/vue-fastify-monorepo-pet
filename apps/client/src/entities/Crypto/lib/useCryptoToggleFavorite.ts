import type { Ref } from 'vue'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { useSetCryptoFavorite } from '../api/mutations'

export function useCryptoToggleFavorite(rows?: Ref<ICryptoServerRow[]>) {
  const setFavoriteMutation = useSetCryptoFavorite({
    onSuccess: (data, variables) => {
      if (rows) {
        const index = rows.value.findIndex((r) => r.symbol === variables.symbol)
        if (index !== -1) {
          rows.value = [
            ...rows.value.slice(0, index),
            { ...rows.value[index], isFavorite: variables.isFavorite },
            ...rows.value.slice(index + 1),
          ]
        }
      }
    },
    onError: (error) => {
      console.error('Error toggling favorite:', error)
    },
  })

  async function toggleFavorite(symbol: string, isFavorite: boolean): Promise<void> {
    setFavoriteMutation.mutate({ symbol, isFavorite })
  }

  return {
    toggleFavorite,
    isLoading: setFavoriteMutation.isPending,
    error: setFavoriteMutation.error,
  }
}
