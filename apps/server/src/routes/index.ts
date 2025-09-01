import type { FastifyInstance } from 'fastify'
import { registerCryptoRoutes } from '../modules/crypto/routes.ts'

export async function initializeRoutes(app: FastifyInstance): Promise<void> {
  await registerCryptoRoutes(app)
}
