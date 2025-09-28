import type { Namespace } from 'socket.io'
import { cryptoRepository } from './store/repository.ts'
import { DefaultCryptoService } from './service/index.ts'

export function startCryptoTicker(io: Namespace): void {
  const service = new DefaultCryptoService(cryptoRepository)

  io.on('connection', (socket) => {
    const safeEmit = (event: string, payload: unknown) => {
      try {
        socket.emit(event, payload)
      } catch {
        // logger
      }
    }

    // Подписка/отписка на комнаты-символы
    socket.on('subscribe', (symbols: string | string[]) => {
      const list = Array.isArray(symbols) ? symbols : [symbols]
      list.forEach((s) => {
        if (typeof s !== 'string') return
        const room = s.trim().toUpperCase()
        if (!room) return
        socket.join(room)
        // Если подписались на TOP/FAVORITE — отправим текущий снапшот сразу
        if (room === 'TOP') {
          service
            .listTop()
            .then((rows) => safeEmit('ticker:top', rows))
            .catch(() => {})
        }
        if (room === 'FAVORITE') {
          service
            .listFavorite()
            .then((rows) => safeEmit('ticker:favorite', rows))
            .catch(() => {})
        }
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
        io.emit('ticker:batch', updated)
        const [top, fav] = await Promise.all([service.listTop(), service.listFavorite()])
        io.to('TOP').emit('ticker:top', top)
        io.to('FAVORITE').emit('ticker:favorite', fav)
      } catch {
        // logger
      }
    }, 1500)

    socket.on('disconnect', () => {
      clearInterval(interval)
    })
  })
}
