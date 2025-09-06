import type { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

export async function registerSwagger(app: FastifyInstance): Promise<void> {
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Crypto Market API',
        description: '',
        version: '1.0.0',
      },
      tags: [{ name: 'crypto', description: 'Crypto endpoints' }],
    },
  })

  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
  })
}
