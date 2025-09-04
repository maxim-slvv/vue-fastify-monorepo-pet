import { io, Socket } from 'socket.io-client'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { CryptoTableRow } from './../types'
import { API_URL } from '@/shared/config/api'

// Одна монета
export function useCryptoTickerBySymbol(symbol: string) {
  const row = ref<CryptoTableRow | null>(null)
  let socket: Socket | null = null

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })
    socket.emit('subscribe', symbol)
    socket.on('ticker', (data: CryptoTableRow) => {
      if (data?.symbol === symbol) row.value = data
    })
  }

  function disconnect(): void {
    if (!socket) return
    socket.emit('unsubscribe', symbol)
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }

  onMounted(connect)
  onBeforeUnmount(disconnect)

  return { row, connect, disconnect }
}
