import { computed, unref, type Ref } from 'vue'
import type { CryptoTimePeriod } from '@/entities/Crypto/types'
import { useCryptoToggleFavorite } from './utils/useCryptoToggleFavorite'
import { useCryptoList } from '../api/queries'
import { useSearchSort } from '@/shared/api/search/useSearchSort'
import { useCryptoTable } from './utils/useCryptoTable'

export function useCryptoTop(period?: Ref<CryptoTimePeriod>) {
  const { searchValue, sortField, sortOrder, page, limit } = useSearchSort()

  const paramsComputed = computed(() => {
    const params: Record<string, string> = {}
    const search = unref(searchValue)
    const sort = unref(sortField)
    const order = unref(sortOrder)
    const currentPage = unref(page)
    const currentLimit = unref(limit)
    const currentPeriod = period ? unref(period) : undefined

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
    if (currentPeriod) {
      params.period = currentPeriod
    }
    return params
  })

  const table = useCryptoTable(() => useCryptoList({ params: paramsComputed }), paramsComputed)

  const { toggleFavorite } = useCryptoToggleFavorite(table.rows)

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
