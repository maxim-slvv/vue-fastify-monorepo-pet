import { z } from 'zod'
import type { FastifyApp, SingleRouteOptions, RouteRegister } from './types.ts'

export function registerSingleRoute<
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
>(app: FastifyApp, opts: SingleRouteOptions<RowShape, Row>): void {
  const singleSchema = opts.resource.singleSchemaByPreset(opts.preset)
  const singleExample = opts.resource.examplesByPreset(opts.preset, 1)[0]

  const routeOptions = {
    schema: {
      params: opts.paramsSchema,
      response: {
        200: singleSchema,
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
      examples: [
        {
          response: {
            200: singleExample,
          },
        },
      ],
    },
  }

  let register: RouteRegister
  if (typeof opts.method === 'function') {
    register = opts.method
  } else {
    const methodName = opts.method.toLowerCase()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register = (app as any)[methodName].bind(app) as RouteRegister
  }

  //------------------------------------------------------------------------------------------------

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrappedHandler = async (req: any, reply: any) => {
    const item = await opts.handler(req)

    if (!item) {
      reply.status(404)
      return { error: 'Not Found', message: opts.notFoundMessage || 'Item not found' }
    }

    return item
  }

  register(opts.path, routeOptions, wrappedHandler)
}
