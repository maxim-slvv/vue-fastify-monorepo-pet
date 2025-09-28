import { ref, onMounted, onBeforeUnmount, watch, computed, type Ref } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type {
  ICryptoServerRow,
  ICryptoInternalRow,
  CryptoTimePeriod,
} from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'
import { useCryptoToggleFavorite } from './useCryptoToggleFavorite'
import { useCryptoBySymbol } from '../api/queries'

export function useCryptoDetail(symbol: string, period?: Ref<CryptoTimePeriod>) {
  const cryptoData = ref<ICryptoServerRow | null>(null)
  let socket: Socket | null = null

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
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })

    socket.on('ticker:batch', (batch: ICryptoInternalRow[]) => {
      if (!Array.isArray(batch) || batch.length === 0 || !cryptoData.value) return

      const update = batch.find((item) => item.symbol === cryptoData.value!.symbol)
      if (update && update.spark && cryptoData.value.spark) {
        const lastDay = update.spark[update.spark.length - 1] || []
        const newPoint = lastDay[lastDay.length - 1]

        if (newPoint !== undefined) {
          const currentPoints = cryptoData.value.spark.points
          const updatedPoints = [...currentPoints.slice(1), newPoint]

          const currentTimestamps = cryptoData.value.spark.timestamps
          const newTimestamp = Date.now()
          const updatedTimestamps = [...currentTimestamps.slice(1), newTimestamp]

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { spark: _, ...updateWithoutSpark } = update
          cryptoData.value = {
            ...cryptoData.value,
            ...updateWithoutSpark,
            spark: {
              ...cryptoData.value.spark,
              points: updatedPoints,
              timestamps: updatedTimestamps,
            },
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { spark: _, ...updateWithoutSpark } = update
          cryptoData.value = { ...cryptoData.value, ...updateWithoutSpark }
        }
      } else if (update) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { spark: _, ...updateWithoutSpark } = update
        cryptoData.value = { ...cryptoData.value, ...updateWithoutSpark }
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
