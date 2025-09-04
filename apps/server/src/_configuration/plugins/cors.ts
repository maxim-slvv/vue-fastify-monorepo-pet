import type { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'
import { loadConfig } from '../config/loadConfig.ts'

export async function registerCors(app: FastifyInstance): Promise<void> {
  const cfg = loadConfig(process.env)
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
}
