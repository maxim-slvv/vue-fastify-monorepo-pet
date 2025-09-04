import type { FastifyInstance } from 'fastify'
import { initIO } from '../_common/ws/io.ts'
import { WS_NAMESPACES } from '../_common/ws/namespaces.ts'
import { startCryptoTicker } from '../crypto/tickers.ts'
import { loadConfig } from './config/loadConfig.ts'

export function initializeSockets(app: FastifyInstance): void {
  const cfg = loadConfig(process.env)
  const io = initIO(app.server, {
    cors: {
      origin: (origin, cb) => cb(null, cfg.corsOrigins(origin ?? '')),
      credentials: true,
    },
  })
  const nsp = io.of(WS_NAMESPACES.CRYPTO_V1)
  startCryptoTicker(nsp)
}
