import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type { CryptoListResponse } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'
import { useCryptoToggleFavorite } from './useCryptoToggleFavorite'

// All coins
export function useCryptoTicker() {
  const rows = ref<CryptoListResponse>([])
  const isLoading = ref(true)
  let socket: Socket | null = null

  const { toggleFavorite } = useCryptoToggleFavorite(rows)

  async function loadInitial(): Promise<void> {
    const response = await fetch(`${API_URL}/api/crypto`)
    if (!response.ok) throw new Error(`Failed to load /api/crypto: ${response.status}`)
    rows.value = (await response.json()) as CryptoListResponse
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }

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
