import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DefaultNewsService } from './service/index.ts'
import { InMemoryNewsRepository } from './store/repository.ts'
import { registerListRoute, makeResource } from '../_common/resource/index.ts'

import { newsFieldExamples, newsRowSchema } from './types.ts'
import { newsFieldsPresets } from './store/selectors/index.ts'

export async function registerNewsRoutes(app: FastifyInstance): Promise<void> {
  const newsResource = makeResource({
    entity: 'news',
    rowSchema: newsRowSchema,
    fieldExamples: newsFieldExamples,
    presets: newsFieldsPresets,
  })

  const service = new DefaultNewsService(new InMemoryNewsRepository())

  const zapp = app.withTypeProvider<ZodTypeProvider>()

  registerListRoute(zapp as unknown as FastifyInstance, {
    path: '/api/news',
    resource: newsResource,
    preset: 'base',
    handler: () => service.list(),
  })

  registerListRoute(zapp as unknown as FastifyInstance, {
    path: '/api/news/brief',
    resource: newsResource,
    preset: 'brief',
    handler: () => service.listBrief(),
  })

  registerListRoute(zapp as unknown as FastifyInstance, {
    path: '/api/news/featured',
    resource: newsResource,
    preset: 'featured',
    handler: () => service.listFeatured(),
  })
}
