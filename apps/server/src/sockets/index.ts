import type { FastifyInstance } from 'fastify'
import { Server as SocketIOServer } from 'socket.io'
import { startCryptoTicker } from '../modules/crypto/ticker.ts'

export function initializeSockets(app: FastifyInstance): void {
  const io = new SocketIOServer(app.server, {
    cors: {
      origin: true,
      credentials: true,
    },
  })

  const nsp = io.of('/crypto-v1')
  startCryptoTicker(nsp)
}
