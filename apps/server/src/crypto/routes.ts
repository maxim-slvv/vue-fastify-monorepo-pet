import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { InMemoryCryptoRepository } from './store/repository.ts'
import { DefaultCryptoService } from './service/index.ts'
import { registerListRoute, registerActionRoute } from '../_common/resource/index.ts'
import { makeResource } from '../_common/resource/index.ts'

import { cryptoFieldExamples } from './types/schema.ts'
import { cryptoRowSchema, favoriteParamsSchema, favoriteBodySchema } from './types.ts'
import { cryptoFieldsPresets } from './store/selectors/index.ts'

export async function registerCryptoRoutes(app: FastifyInstance): Promise<void> {
  const cryptoResource = makeResource({
    entity: 'crypto',
    rowSchema: cryptoRowSchema,
    fieldExamples: cryptoFieldExamples,
    presets: cryptoFieldsPresets,
  })

  const service = new DefaultCryptoService(new InMemoryCryptoRepository())

  const zapp = app.withTypeProvider<ZodTypeProvider>()

  registerListRoute(zapp, {
    method: 'GET',
    path: '/api/crypto',
    resource: cryptoResource,
    preset: 'base',
    handler: () => service.list(),
  })

  registerListRoute(zapp, {
    method: 'GET',
    path: '/api/crypto/top',
    resource: cryptoResource,
    preset: 'top',
    handler: () => service.listTop(),
  })

  registerListRoute(zapp, {
    method: 'GET',
    path: '/api/crypto/favorite',
    resource: cryptoResource,
    preset: 'favorite',
    handler: () => service.listFavorite(),
  })

  registerActionRoute(zapp, {
    method: 'POST',
    path: '/api/crypto/favorite/:symbol',
    paramsSchema: favoriteParamsSchema,
    bodySchema: favoriteBodySchema,
    handler: async (req) => {
      const { symbol } = favoriteParamsSchema.parse(req.params)
      const { isFavorite } = favoriteBodySchema.parse(req.body)
      return service.setFavorite(symbol, isFavorite)
    },
  })
}
