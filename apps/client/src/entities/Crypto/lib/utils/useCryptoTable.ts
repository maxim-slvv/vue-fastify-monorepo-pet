import { ref, onMounted, onBeforeUnmount, watch, type Ref } from 'vue'
import type { ICryptoServerRow, ICryptoInternalRow } from '@/entities/Crypto/types'
import type { PaginationMeta } from '@/shared/api'
import { createCryptoWebSocket, processBatchUpdates } from './websocket-utils'
import { updateSparklineData } from './sparkline-utils'

export interface CryptoTableOptions {
  onUnfavorite?: (symbol: string) => void
}

export interface CryptoQueryResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isLoading: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  refetch: () => void
}

/**
 * Универсальный хук для управления таблицами с crypto данными
 * Включает: WebSocket подключение, кеширование, пагинацию, подписки
 */
export function useCryptoTable(
  queryHook: () => CryptoQueryResult,
  paramsComputed: Ref<Record<string, string>>,
  options: CryptoTableOptions = {},
) {
  const rows = ref<ICryptoServerRow[]>([])
  const ws = createCryptoWebSocket()
  const subscribedSymbols = ref<string[]>([])
  const meta = ref<PaginationMeta | null>(null)
  const pagesCache = ref<Record<string, ICryptoServerRow[]>>({})

  const { data, isLoading, error, refetch } = queryHook()

  // Watch для основных данных с кешированием и подписками
  watch(
    data,
    (newData) => {
      if (newData) {
        rows.value = newData.data
        meta.value = newData.meta

        // Создаем ключ кеша на основе всех параметров запроса
        const cacheKey = JSON.stringify(paramsComputed.value)
        pagesCache.value[cacheKey] = newData.data

        // Управляем WebSocket подписками
        manageSubscriptions(newData.data.map((row: ICryptoServerRow) => row.symbol.toUpperCase()))
      }
    },
    { immediate: true },
  )

  // Watch для изменений параметров (кеш)
  watch(paramsComputed, () => {
    const cacheKey = JSON.stringify(paramsComputed.value)
    if (pagesCache.value[cacheKey]) {
      const cached = pagesCache.value[cacheKey]
      rows.value = cached
      manageSubscriptions(cached.map((r) => r.symbol.toUpperCase()))
    }
  })

  /**
   * Управляет подписками WebSocket на основе новых символов
   */
  function manageSubscriptions(nextSymbols: string[]): void {
    const prevSymbols = subscribedSymbols.value

    const prevSet = new Set(prevSymbols)
    const nextSet = new Set(nextSymbols)

    const toSubscribe = nextSymbols.filter((s) => !prevSet.has(s))
    const toUnsubscribe = prevSymbols.filter((s) => !nextSet.has(s))

    if (toUnsubscribe.length) ws.unsubscribeFromSymbols(toUnsubscribe)
    if (toSubscribe.length) ws.subscribeToSymbols(toSubscribe)

    subscribedSymbols.value = nextSymbols
  }

  function connect(): void {
    ws.connect()
    if (!ws.socket) return

    ws.socket.on('ticker:batch', (batch: ICryptoInternalRow[]) => {
      rows.value = processBatchUpdates(rows.value, batch, updateSparklineData)
    })
  }

  function disconnect(): void {
    ws.disconnect()
  }

  function removeFavorite(symbol: string): void {
    if (options.onUnfavorite) {
      options.onUnfavorite(symbol)
    }
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
    removeFavorite,
    refetch,
  }
}
