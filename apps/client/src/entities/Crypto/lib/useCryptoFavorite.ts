import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type { ICryptoServerRow, CryptoFavoriteResponse } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'
import { useCryptoToggleFavorite } from './useCryptoToggleFavorite'

export function useCryptoFavorite() {
  const rows = ref<CryptoFavoriteResponse>([])
  const isLoading = ref(true)
  let socket: Socket | null = null

  const { toggleFavorite } = useCryptoToggleFavorite(rows)

  async function loadInitial(): Promise<void> {
    const response = await fetch(`${API_URL}/api/crypto/favorite`)
    if (!response.ok) throw new Error(`Failed to load /api/crypto/favorite: ${response.status}`)
    rows.value = (await response.json()) as CryptoFavoriteResponse
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })

    // Update favorite list
    socket.on('ticker:favorite', (data: CryptoFavoriteResponse) => {
      rows.value = data
    })

    // Point updates by symbols
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

  // Follow changes in the symbol composition and recreate subscriptions
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

  onMounted(async () => {
    try {
      await loadInitial()
    } catch (error) {
      console.error(error)
    }
    connect()
  })

  onBeforeUnmount(() => {
    disconnect()
  })

  return { rows, isLoading, connect, disconnect, toggleFavorite }
}
