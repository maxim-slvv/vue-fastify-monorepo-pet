import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { io, type Socket } from 'socket.io-client'
import type { CryptoTableRow } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'

export function useCryptoFavorite() {
  const rows = ref<CryptoTableRow[]>([])
  const isLoading = ref(true)
  let socket: Socket | null = null

  async function loadInitial(): Promise<void> {
    const response = await fetch(`${API_URL}/api/crypto/favorite`)
    if (!response.ok) throw new Error(`Failed to load /api/crypto/favorite: ${response.status}`)
    rows.value = (await response.json()) as CryptoTableRow[]
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })

    // Обновление общего списка избранного
    socket.on('ticker:favorite', (data: CryptoTableRow[]) => {
      rows.value = data
    })

    // Точечные обновления по символам
    socket.on('ticker', (data: CryptoTableRow) => {
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

  // Следим за изменением состава символов и пересоздаем подписки
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

  return { rows, isLoading, connect, disconnect }
}
