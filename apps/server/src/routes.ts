import type { FastifyInstance } from 'fastify'
import { registerCryptoRoutes } from './crypto/routes.ts'
import { registerNewsRoutes } from './news/routes.ts'

export async function initializeRoutes(app: FastifyInstance): Promise<void> {
  await registerCryptoRoutes(app)
  await registerNewsRoutes(app)
}
