import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'
import { useCryptoToggleFavorite } from './useCryptoToggleFavorite'
import { useCryptoFavorite as useCryptoFavoriteQuery } from '../api/queries'

export function useCryptoFavorite() {
  const rows = ref<ICryptoServerRow[]>([])
  let socket: Socket | null = null

  const { data, isLoading, error, refetch } = useCryptoFavoriteQuery({})

  const { toggleFavorite, isLoading: isMutating } = useCryptoToggleFavorite(rows, {
    onUnfavorite: (symbol: string) => {
      rows.value = rows.value.filter((item) => item.symbol !== symbol)
    },
  })

  watch(
    data,
    (newData) => {
      if (newData) {
        if (!isMutating.value) {
          rows.value = newData
        }
      }
    },
    { immediate: true },
  )

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })

    socket.on('ticker:favorite', (data: ICryptoServerRow[]) => {
      rows.value = data
    })

    socket.on('ticker', (data: ICryptoServerRow) => {
      const index = rows.value.findIndex((r) => r.symbol === data.symbol)
      if (index !== -1) {
        rows.value = [
          ...rows.value.slice(0, index),
          { ...rows.value[index], ...data },
          ...rows.value.slice(index + 1),
        ]
      }
    })

    subscribeAll()
  }

  function disconnect(): void {
    if (!socket) return
    unsubscribeAll()
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }

  function subscribeAll(): void {
    if (!socket) return
    const symbols = rows.value.map((r) => r.symbol)
    if (symbols.length) socket.emit('subscribe', symbols)
  }

  function unsubscribeAll(): void {
    if (!socket) return
    const symbols = rows.value.map((r) => r.symbol)
    if (symbols.length) socket.emit('unsubscribe', symbols)
  }

  watch(
    () =>
      rows.value
        .map((r) => r.symbol)
        .sort()
        .join(','),
    () => {
      if (!socket) return
      unsubscribeAll()
      subscribeAll()
    },
  )

  onMounted(() => {
    connect()
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    rows,
    isLoading,
    error,
    connect,
    disconnect,
    toggleFavorite,
    refetch,
  }
}
