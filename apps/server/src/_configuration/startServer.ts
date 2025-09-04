import type { FastifyInstance } from 'fastify'
import { loadConfig } from './config/loadConfig.ts'

export function startServer(app: FastifyInstance): void {
  const cfg = loadConfig(process.env)
  const port = Number(cfg.PORT)
  const host = cfg.HOST

  app
    .listen({ port, host })
    .then((address) => {
      app.log.info(`server listening on ${address}`)
    })
    .catch((err) => {
      app.log.error(err)
      process.exit(1)
    })

  const shutdown = async (signal: string) => {
    try {
      app.log.info(`Received ${signal}. Shutting down...`)
      await app.close()
      process.exit(0)
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }

  process.on('SIGINT', () => void shutdown('SIGINT'))
  process.on('SIGTERM', () => void shutdown('SIGTERM'))
}
