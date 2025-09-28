import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { cryptoRepository } from './store/repository.ts'
import { DefaultCryptoService } from './service/index.ts'
import {
  registerListRoute,
  registerActionRoute,
  registerSingleRoute,
} from '../_common/resource/index.ts'
import { makeResource } from '../_common/resource/index.ts'

import { cryptoFieldExamples } from './types/schema.ts'
import {
  cryptoRowSchema,
  favoriteParamsSchema,
  favoriteBodySchema,
  coinParamsSchema,
} from './types.ts'
import { cryptoFieldsPresets } from './store/selectors/index.ts'

export async function registerCryptoRoutes(app: FastifyInstance): Promise<void> {
  const cryptoResource = makeResource({
    entity: 'crypto',
    rowSchema: cryptoRowSchema,
    fieldExamples: cryptoFieldExamples,
    presets: cryptoFieldsPresets,
  })

  const service = new DefaultCryptoService(cryptoRepository)

  const zapp = app.withTypeProvider<ZodTypeProvider>()

  registerListRoute(zapp, {
    method: 'GET',
    path: '/api/crypto',
    resource: cryptoResource,
    preset: 'base',
    handler: async (params) => {
      const period = params?.period || '7d'
      const result = await service.list(period)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result as any[]
    },
  })

  registerListRoute(zapp, {
    method: 'GET',
    path: '/api/crypto/top',
    resource: cryptoResource,
    preset: 'top',
    handler: async (params) => {
      const period = params?.period || '7d'
      const result = await service.listTop(period)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result as any[]
    },
  })

  registerListRoute(zapp, {
    method: 'GET',
    path: '/api/crypto/favorite',
    resource: cryptoResource,
    preset: 'favorite',
    handler: async (params) => {
      const period = params?.period || '7d'
      const result = await service.listFavorite(period)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result as any[]
    },
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

  registerSingleRoute(zapp, {
    method: 'GET',
    path: '/api/crypto/:symbol',
    resource: cryptoResource,
    preset: 'full',
    paramsSchema: coinParamsSchema,
    handler: async (req) => {
      const { symbol } = coinParamsSchema.parse(req.params)
      const period = req.query?.period || '7d'
      const result = await service.getBySymbol(symbol, period)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result as any
    },
    notFoundMessage: 'Coin not found',
  })
}
