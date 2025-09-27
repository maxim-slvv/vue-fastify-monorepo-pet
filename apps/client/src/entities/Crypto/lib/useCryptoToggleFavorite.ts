import type { Ref } from 'vue'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { useSetCryptoFavorite } from '../api/mutations'
import { invalidateCryptoList, invalidateCryptoTop, invalidateCryptoFavorite } from '../api/queries'

interface UseCryptoToggleFavoriteOptions {
  onUnfavorite?: (symbol: string) => void
}

export function useCryptoToggleFavorite(
  rows?: Ref<ICryptoServerRow[]>,
  options?: UseCryptoToggleFavoriteOptions,
) {
  const setFavoriteMutation = useSetCryptoFavorite({
    onSuccess: () => {
      invalidateCryptoList()
      invalidateCryptoTop()
      invalidateCryptoFavorite()
    },
    onError: (error, variables) => {
      console.error('Error toggling favorite:', error)

      //* Откатываем локальное состояние при ошибке
      if (rows) {
        if (!variables.isFavorite && options?.onUnfavorite) {
          //* Если мы пытались убрать из избранного, но произошла ошибка,
          //* нужно восстановить элемент в массиве
          //TODO: Здесь нужна более сложная логика восстановления из кэша TanStack Query
          console.warn('Failed to remove from favorites, element should be restored')
        } else {
          //* Обычный откат для изменения состояния
          const index = rows.value.findIndex((r) => r.symbol === variables.symbol)
          if (index !== -1) {
            rows.value = [
              ...rows.value.slice(0, index),
              { ...rows.value[index], isFavorite: !variables.isFavorite },
              ...rows.value.slice(index + 1),
            ]
          }
        }
      }
    },
  })

  async function toggleFavorite(symbol: string, isFavorite: boolean): Promise<void> {
    if (!isFavorite && options?.onUnfavorite) {
      options.onUnfavorite(symbol)
    } else {
      if (rows) {
        const index = rows.value.findIndex((r) => r.symbol === symbol)
        if (index !== -1) {
          rows.value = [
            ...rows.value.slice(0, index),
            { ...rows.value[index], isFavorite },
            ...rows.value.slice(index + 1),
          ]
        }
      }
    }

    setFavoriteMutation.mutate({ symbol, isFavorite })
  }

  return {
    toggleFavorite,
    isLoading: setFavoriteMutation.isPending,
    error: setFavoriteMutation.error,
  }
}
