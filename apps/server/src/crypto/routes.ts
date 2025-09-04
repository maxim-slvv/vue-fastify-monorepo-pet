import type { FastifyInstance } from 'fastify'

import { InMemoryCryptoRepository } from './store/repository.ts'
import { DefaultCryptoService } from './service/index.ts'
import { favoriteBodySchema, favoriteParamsSchema } from './types/index.ts'

export async function registerCryptoRoutes(app: FastifyInstance): Promise<void> {
  const service = new DefaultCryptoService(new InMemoryCryptoRepository())

  app.get('/api/crypto', async () => service.list())
  app.get('/api/crypto/top', async () => service.listTop())
  app.get('/api/crypto/favorite', async () => service.listFavorite())

  app.post<{ Params: { symbol: string }; Body: { isFavorite: boolean } }>(
    '/api/crypto/favorite/:symbol',
    async (req) => {
      const { symbol } = favoriteParamsSchema.parse(req.params)
      const { isFavorite } = favoriteBodySchema.parse(req.body)
      return service.setFavorite(symbol, isFavorite)
    },
  )
}
