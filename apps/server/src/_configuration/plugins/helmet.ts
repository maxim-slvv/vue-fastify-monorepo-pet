import type { FastifyInstance } from 'fastify'
import helmet from '@fastify/helmet'
import { loadConfig } from '../config/loadConfig.ts'

export async function registerHelmet(app: FastifyInstance): Promise<void> {
  const cfg = loadConfig(process.env)
  await app.register(helmet, {
    crossOriginResourcePolicy: { policy: cfg.HELMET_CORP },
    crossOriginEmbedderPolicy: cfg.NODE_ENV === 'production',
  })
}
