import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'
import { useCryptoToggleFavorite } from './useCryptoToggleFavorite'
import { useCryptoBySymbol } from '../api/queries'

export function useCryptoDetail(symbol: string) {
  const cryptoData = ref<ICryptoServerRow | null>(null)
  let socket: Socket | null = null

  const { data, isLoading, error, refetch } = useCryptoBySymbol({
    params: computed(() => ({ symbol: symbol.toUpperCase() })),
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
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })

    socket.on('ticker:batch', (batch: ICryptoServerRow[]) => {
      if (!Array.isArray(batch) || batch.length === 0 || !cryptoData.value) return

      const update = batch.find((item) => item.symbol === cryptoData.value!.symbol)
      if (update) {
        cryptoData.value = { ...cryptoData.value, ...update }
      }
    })

    socket.emit('subscribe', [symbol.toUpperCase()])
  }

  function disconnect(): void {
    if (!socket) return
    socket.emit('unsubscribe', [symbol.toUpperCase()])
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
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
