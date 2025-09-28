import { computed, unref } from 'vue'
import { useCryptoToggleFavorite } from './utils/useCryptoToggleFavorite'
import { useCryptoFavorite as useCryptoFavoriteQuery } from '../api/queries'
import { useSearchSort } from '@/shared/api/search/useSearchSort'
import { useCryptoTable } from './utils/useCryptoTable'

export function useCryptoFavorite() {
  const { searchValue, sortField, sortOrder, page, limit } = useSearchSort()

  const paramsComputed = computed(() => {
    const params: Record<string, string> = {}
    const search = unref(searchValue)
    const sort = unref(sortField)
    const order = unref(sortOrder)
    const currentPage = unref(page)
    const currentLimit = unref(limit)

    params.page = currentPage.toString()
    params.limit = currentLimit.toString()

    if (search && search.trim()) {
      params.search = search.trim()
    }
    if (sort && sort.trim()) {
      params.sort = sort.trim()
    }
    if (order) {
      params.order = order
    }
    return params
  })

  const table = useCryptoTable(
    () => useCryptoFavoriteQuery({ params: paramsComputed }),
    paramsComputed,
    {
      onUnfavorite: (symbol: string) => {
        table.rows.value = table.rows.value.filter((item) => item.symbol !== symbol)
      },
    },
  )

  const { toggleFavorite } = useCryptoToggleFavorite(table.rows, {
    onUnfavorite: table.removeFavorite,
  })

  return {
    rows: table.rows,
    meta: table.meta,
    pagesCache: table.pagesCache,
    isLoading: table.isLoading,
    error: table.error,
    connect: table.connect,
    disconnect: table.disconnect,
    toggleFavorite,
    refetch: table.refetch,
  }
}
