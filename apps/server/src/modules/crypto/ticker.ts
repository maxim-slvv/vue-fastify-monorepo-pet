import type { Namespace } from 'socket.io'
import { InMemoryCryptoRepository } from './repository.ts'
import { DefaultCryptoService } from './service.ts'

export function startCryptoTicker(io: Namespace): void {
  const service = new DefaultCryptoService(new InMemoryCryptoRepository())

  io.on('connection', (socket) => {
    const safeEmit = (event: string, payload: unknown) => {
      try {
        socket.emit(event, payload)
      } catch {
        // logger
      }
    }

    service
      .list()
      .then((rows) => {
        // Первичная отправка для общего потока
        safeEmit('ticker:all', rows)
      })
      .catch(() => {})

    // Подписка/отписка на комнаты-символы
    socket.on('subscribe', (symbols: string | string[]) => {
      const list = Array.isArray(symbols) ? symbols : [symbols]
      list.forEach((s) => {
        if (typeof s === 'string' && s.trim()) socket.join(s.trim().toUpperCase())
      })
    })

    socket.on('unsubscribe', (symbols: string | string[]) => {
      const list = Array.isArray(symbols) ? symbols : [symbols]
      list.forEach((s) => {
        if (typeof s === 'string' && s.trim()) socket.leave(s.trim().toUpperCase())
      })
    })

    const interval = setInterval(async () => {
      try {
        const updated = await service.tick()
        io.emit('ticker:all', updated)
        for (const row of updated) {
          io.to(row.symbol).emit('ticker', row)
        }
      } catch {
        // logger
      }
    }, 1500)

    socket.on('disconnect', () => {
      clearInterval(interval)
    })
  })
}
