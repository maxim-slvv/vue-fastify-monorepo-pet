import { type Socket, io } from 'socket.io-client'
import type { ICryptoInternalRow, ICryptoServerRow } from '../../types'
import { API_URL } from '@/shared/config/api'

export interface WebSocketConnection {
  socket: Socket | null
  connect: () => void
  disconnect: () => void
  subscribeToSymbols: (symbols: string[]) => void
  unsubscribeFromSymbols: (symbols: string[]) => void
}

/**
 * WS подключение для crypto данных
 */
export function createCryptoWebSocket(): WebSocketConnection {
  let socket: Socket | null = null

  function connect(): void {
    if (socket) return
    socket = io(`${API_URL}/crypto-v1`, { transports: ['websocket'] })
  }

  function disconnect(): void {
    if (!socket) return
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }

  function subscribeToSymbols(symbols: string[]): void {
    if (!socket || symbols.length === 0) return
    socket.emit(
      'subscribe',
      symbols.map((s) => s.toUpperCase()),
    )
  }

  function unsubscribeFromSymbols(symbols: string[]): void {
    if (!socket || symbols.length === 0) return
    socket.emit(
      'unsubscribe',
      symbols.map((s) => s.toUpperCase()),
    )
  }

  return {
    get socket() {
      return socket
    },
    connect,
    disconnect,
    subscribeToSymbols,
    unsubscribeFromSymbols,
  }
}

/**
 * Batch обновления для массива строк криптовалют
 */
export function processBatchUpdates(
  rows: ICryptoServerRow[],
  batch: ICryptoInternalRow[],
  updateSparkline: (row: ICryptoServerRow, update: ICryptoInternalRow) => ICryptoServerRow,
): ICryptoServerRow[] {
  if (!Array.isArray(batch) || batch.length === 0) return rows

  const bySymbol = new Map(batch.map((r) => [r.symbol, r]))

  return rows.map((row) => {
    if (bySymbol.has(row.symbol)) {
      const update = bySymbol.get(row.symbol)!
      return updateSparkline(row, update)
    }
    return row
  })
}

/**
 * Одиночное обновление для страницы деталей крипты
 */
export function processSingleUpdate(
  cryptoData: ICryptoServerRow,
  batch: ICryptoInternalRow[],
  updateSparkline: (row: ICryptoServerRow, update: ICryptoInternalRow) => ICryptoServerRow,
): ICryptoServerRow | null {
  if (!Array.isArray(batch) || batch.length === 0) return null

  const update = batch.find((item) => item.symbol === cryptoData.symbol)
  if (!update) return null

  return updateSparkline(cryptoData, update)
}
