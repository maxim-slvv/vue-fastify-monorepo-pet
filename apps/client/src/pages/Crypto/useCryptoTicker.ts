import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io, type Socket } from 'socket.io-client'
import { CryptoTableRow } from './types'

const API_URL = (import.meta as unknown as ImportMeta).env?.VITE_API_URL ?? 'http://localhost:3000'

export function useCryptoTicker() {
  const rows = ref<CryptoTableRow[]>([])
  let socket: Socket | null = null

  async function loadInitial(): Promise<void> {
    const response = await fetch(`${API_URL}/api/crypto`)
    if (!response.ok) throw new Error(`Failed to load /api/crypto: ${response.status}`)
    rows.value = (await response.json()) as CryptoTableRow[]
  }

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })
    socket.on('ticker', (data: CryptoTableRow[]) => {
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

  return { rows, connect, disconnect }
}
