import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { createFullSchema } from '../../_configuration/openapi/zod.ts'

export function registerMutationRoute<
  ParamsSchema extends z.ZodTypeAny | undefined,
  BodySchema extends z.ZodTypeAny | undefined,
  ReplySchema extends z.ZodTypeAny,
>(
  app: FastifyInstance,
  opts: {
    method: 'post' | 'put' | 'patch' | 'delete'
    path: string
    params?: { schema: ParamsSchema; name: string }
    body?: { schema: BodySchema; name: string }
    reply: { schema: ReplySchema; name: string }
    handler: (args: {
      params: ParamsSchema extends z.ZodTypeAny ? z.infer<ParamsSchema> : undefined
      body: BodySchema extends z.ZodTypeAny ? z.infer<BodySchema> : undefined
    }) => Promise<z.infer<ReplySchema>>
  },
) {
  const schema = createFullSchema(opts.params as never, opts.body as never, opts.reply as never)

  app[opts.method](opts.path, { schema }, async (req) => {
    const params = opts.params ? (opts.params.schema as z.ZodTypeAny).parse(req.params) : undefined
    const body = opts.body ? (opts.body.schema as z.ZodTypeAny).parse(req.body) : undefined
    return opts.handler({ params, body } as never)
  })
}
