import { ref, onMounted, onBeforeUnmount, watch, computed, unref } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'
import { useCryptoToggleFavorite } from './useCryptoToggleFavorite'
import { useCryptoList } from '../api/queries'
import type { PaginationMeta } from '@/shared/api'
import { useSearchSort } from '@/shared/api/search/useSearchSort'

export function useCryptoTop() {
  const rows = ref<ICryptoServerRow[]>([])
  let socket: Socket | null = null
  const subscribedSymbols = ref<string[]>([])
  const meta = ref<PaginationMeta | null>(null)
  const pagesCache = ref<Record<string, ICryptoServerRow[]>>({})

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

  const { data, isLoading, error, refetch } = useCryptoList({ params: paramsComputed })
  const { toggleFavorite, isLoading: isMutating } = useCryptoToggleFavorite(rows)

  watch(
    data,
    (newData) => {
      if (newData) {
        if (!isMutating.value) {
          rows.value = newData.data
          meta.value = newData.meta
          // Создаем ключ кеша на основе всех параметров запроса
          const cacheKey = JSON.stringify(paramsComputed.value)
          pagesCache.value[cacheKey] = newData.data

          // Подписываемся только на символы текущей страницы
          const nextSymbols = newData.data.map((row) => row.symbol.toUpperCase())
          const prevSymbols = subscribedSymbols.value

          const prevSet = new Set(prevSymbols)
          const nextSet = new Set(nextSymbols)

          const toSubscribe = nextSymbols.filter((s) => !prevSet.has(s))
          const toUnsubscribe = prevSymbols.filter((s) => !nextSet.has(s))

          if (toUnsubscribe.length) unsubscribeFromSymbols(toUnsubscribe)
          if (toSubscribe.length) subscribeToSymbols(toSubscribe)

          subscribedSymbols.value = nextSymbols
        }
      }
    },
    { immediate: true },
  )

  watch([page, limit, searchValue, sortField, sortOrder], () => {
    const cacheKey = JSON.stringify(paramsComputed.value)
    if (pagesCache.value[cacheKey]) {
      // показываем fallback и подписываемся на нужные символы
      const cached = pagesCache.value[cacheKey]
      rows.value = cached
      const symbols = cached.map((r) => r.symbol.toUpperCase())
      const prevSymbols = subscribedSymbols.value
      const prevSet = new Set(prevSymbols)
      const nextSet = new Set(symbols)
      const toSubscribe = symbols.filter((s) => !prevSet.has(s))
      const toUnsubscribe = prevSymbols.filter((s) => !nextSet.has(s))
      if (toUnsubscribe.length) unsubscribeFromSymbols(toUnsubscribe)
      if (toSubscribe.length) subscribeToSymbols(toSubscribe)
      subscribedSymbols.value = symbols
    }
  })

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })
    // Слушаем батч-обновления
    socket.on('ticker:batch', (batch: ICryptoServerRow[]) => {
      if (!Array.isArray(batch) || batch.length === 0) return
      const bySymbol = new Map(batch.map((r) => [r.symbol, r]))
      rows.value = rows.value.map((row) =>
        bySymbol.has(row.symbol) ? { ...row, ...bySymbol.get(row.symbol)! } : row,
      )
    })
  }

  function disconnect(): void {
    if (!socket) return
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }

  function subscribeToSymbols(symbols: string[]): void {
    if (!socket || symbols.length === 0) return
    socket.emit(
      'subscribe',
      symbols.map((s) => s.toUpperCase()),
    )
  }

  function unsubscribeFromSymbols(symbols: string[]): void {
    if (!socket || symbols.length === 0) return
    socket.emit(
      'unsubscribe',
      symbols.map((s) => s.toUpperCase()),
    )
  }

  onMounted(() => {
    connect()
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    rows,
    meta,
    pagesCache,
    isLoading,
    error,
    connect,
    disconnect,
    toggleFavorite,
    refetch,
  }
}
