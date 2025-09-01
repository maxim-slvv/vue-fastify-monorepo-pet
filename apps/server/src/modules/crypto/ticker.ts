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
      .then((rows) => safeEmit('ticker', rows))
      .catch(() => {})

    const interval = setInterval(async () => {
      try {
        const updated = await service.tick()
        io.emit('ticker', updated)
      } catch {
        // logger
      }
    }, 1500)

    socket.on('disconnect', () => {
      clearInterval(interval)
    })
  })
}
