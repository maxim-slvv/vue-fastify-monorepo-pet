import type { FastifyInstance } from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyCors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { loadConfig } from './loadConfig.ts'

export async function registerPlugins(app: FastifyInstance): Promise<void> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const cfg = loadConfig(process.env)

  await app.register(fastifyStatic, {
    root: join(__dirname, '..', '..', 'public', 'cdn'),
    prefix: '/cdn/',
    list: false,
    decorateReply: false,
  })

  await app.register(fastifyCors, {
    origin: (origin, cb) => {
      try {
        const allowed = cfg.corsOrigins(origin ?? '')
        cb(null, allowed)
      } catch (err) {
        cb(err as Error, false)
      }
    },
    credentials: true,
  })

  await app.register(helmet, {
    crossOriginResourcePolicy: { policy: cfg.HELMET_CORP },
    crossOriginEmbedderPolicy: cfg.NODE_ENV === 'production',
  })

  await app.register(rateLimit, {
    max: Number(cfg.RATE_LIMIT_MAX),
    timeWindow: cfg.RATE_LIMIT_WINDOW,
  })
}
