import type { FastifyInstance } from 'fastify'
import { InMemoryCryptoRepository } from './store/selectors.ts'
import { DefaultCryptoService } from './service/index.ts'

export async function registerCryptoRoutes(app: FastifyInstance): Promise<void> {
  const service = new DefaultCryptoService(new InMemoryCryptoRepository())

  app.get('/api/crypto', async () => service.list())
}
