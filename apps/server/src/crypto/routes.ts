import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { InMemoryCryptoRepository } from './store/repository.ts'
import { DefaultCryptoService } from './service/index.ts'
import { registerListRoute } from '../_common/resource/index.ts'
import { makeResource } from '../_common/resource/index.ts'

import { cryptoFieldExamples } from './types/schema.ts'
import {
  cryptoRowSchema,
  favoriteParamsSchema,
  favoriteBodySchema,
  IMAGE_SYMBOLS,
} from './types.ts'
import { cryptoFieldsPresets } from './store/selectors.ts'

export async function registerCryptoRoutes(app: FastifyInstance): Promise<void> {
  const cryptoResource = makeResource({
    entity: 'crypto',
    rowSchema: cryptoRowSchema,
    fieldExamples: cryptoFieldExamples,
    presets: cryptoFieldsPresets,
  })

  const service = new DefaultCryptoService(new InMemoryCryptoRepository())

  const zapp = app.withTypeProvider<ZodTypeProvider>()

  registerListRoute(zapp as unknown as FastifyInstance, {
    path: '/api/crypto',
    resource: cryptoResource,
    preset: 'base',
    handler: () => service.list(),
  })

  registerListRoute(zapp as unknown as FastifyInstance, {
    path: '/api/crypto/top',
    resource: cryptoResource,
    preset: 'top',
    handler: () => service.listTop(),
  })

  registerListRoute(zapp as unknown as FastifyInstance, {
    path: '/api/crypto/favorite',
    resource: cryptoResource,
    preset: 'favorite',
    handler: () => service.listFavorite(),
  })

  zapp.post<{ Params: { symbol: string }; Body: { isFavorite: boolean } }>(
    '/api/crypto/favorite/:symbol',
    {
      preValidation: (req, reply, done) => {
        try {
          favoriteParamsSchema.parse(req.params)
          done()
        } catch {
          reply.code(400).send({
            message: `Invalid symbol. Allowed symbols: ${['BTC', 'ETH', 'USDT', 'SOL', 'DOGE', 'ADA', 'XLM', 'LTC', 'BCH', 'MEME', 'PENGU', 'PEPE', 'POPCAT', 'PROVE', 'RAD', 'SHIB', 'SUI', 'TON', 'TRUMP', 'UNI', 'WIF', 'MAGIC'].join(', ')}`,
          })
        }
      },
      schema: {
        params: {
          type: 'object',
          properties: { symbol: { type: 'string', enum: IMAGE_SYMBOLS as unknown as string[] } },
          required: ['symbol'],
        },
        body: {
          type: 'object',
          properties: { isFavorite: { type: 'boolean' } },
          required: ['isFavorite'],
        },
        response: { 200: { type: 'array', items: { type: 'object' } } },
      },
    },
    async (req) => {
      const { symbol } = favoriteParamsSchema.parse(req.params)
      const { isFavorite } = favoriteBodySchema.parse(req.body)
      return service.setFavorite(symbol, isFavorite)
    },
  )
}
