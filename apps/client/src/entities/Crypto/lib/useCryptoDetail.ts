import { ref, onMounted, onBeforeUnmount, watch, computed, type Ref } from 'vue'
import type {
  ICryptoServerRow,
  ICryptoInternalRow,
  CryptoTimePeriod,
} from '@/entities/Crypto/types'
import { useCryptoToggleFavorite } from './utils/useCryptoToggleFavorite'
import { useCryptoBySymbol } from '../api/queries'
import { createCryptoWebSocket } from './utils/websocket-utils'
import { updateSparklineData } from './utils/sparkline-utils'
import { processSingleUpdate } from './utils/websocket-utils'

export function useCryptoDetail(symbol: string, period?: Ref<CryptoTimePeriod>) {
  const cryptoData = ref<ICryptoServerRow | null>(null)
  const ws = createCryptoWebSocket()

  const { data, isLoading, error, refetch } = useCryptoBySymbol({
    params: computed(() => ({
      symbol: symbol.toUpperCase(),
      period: period?.value,
    })),
  })

  const { toggleFavorite } = useCryptoToggleFavorite(
    computed(() => (cryptoData.value ? [cryptoData.value] : [])),
  )

  watch(
    data,
    (newData) => {
      if (newData) {
        cryptoData.value = newData
      }
    },
    { immediate: true },
  )

  function connect(): void {
    ws.connect()
    if (!ws.socket) return

    ws.socket.on('ticker:batch', (batch: ICryptoInternalRow[]) => {
      if (!cryptoData.value) return

      const updated = processSingleUpdate(cryptoData.value, batch, updateSparklineData)
      if (updated) {
        cryptoData.value = updated
      }
    })

    ws.subscribeToSymbols([symbol])
  }

  function disconnect(): void {
    ws.unsubscribeFromSymbols([symbol])
    ws.disconnect()
  }

  onMounted(() => {
    connect()
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    cryptoData,
    isLoading,
    error,
    toggleFavorite,
    refetch,
  }
}
