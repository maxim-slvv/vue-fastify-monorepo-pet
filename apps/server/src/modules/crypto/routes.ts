import type { FastifyInstance } from 'fastify'
import { InMemoryCryptoRepository } from './repository.ts'
import { DefaultCryptoService } from './service.ts'

export async function registerCryptoRoutes(app: FastifyInstance): Promise<void> {
  const service = new DefaultCryptoService(new InMemoryCryptoRepository())

  app.get('/api/crypto', async () => service.list())
}
