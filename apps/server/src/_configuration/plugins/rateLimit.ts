import type { FastifyInstance } from 'fastify'
import rateLimit from '@fastify/rate-limit'
import { loadConfig } from '../config/loadConfig.ts'

export async function registerRateLimit(app: FastifyInstance): Promise<void> {
  const cfg = loadConfig(process.env)
  await app.register(rateLimit, {
    max: Number(cfg.RATE_LIMIT_MAX),
    timeWindow: cfg.RATE_LIMIT_WINDOW,
  })
}
