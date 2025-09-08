import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type { CryptoListResponse } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'
import { useCryptoToggleFavorite } from './useCryptoToggleFavorite'
import { useCryptoList } from '../api/queries'

// All coins with TanStack Query + WebSocket updates
export function useCryptoTicker() {
  const rows = ref<CryptoListResponse>([])
  let socket: Socket | null = null

  const { data, isLoading, error, refetch } = useCryptoList({})
  const { toggleFavorite } = useCryptoToggleFavorite(rows)

  watch(
    data,
    (newData) => {
      if (newData) {
        rows.value = newData
      }
    },
    { immediate: true },
  )

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })
    socket.on('ticker:all', (data: CryptoListResponse) => {
      rows.value = data
    })
  }

  function disconnect(): void {
    if (!socket) return
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
    rows,
    isLoading,
    error,
    connect,
    disconnect,
    toggleFavorite,
    refetch,
  }
}
