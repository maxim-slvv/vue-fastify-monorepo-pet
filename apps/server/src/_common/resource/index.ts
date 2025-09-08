import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { createResponseWithExample } from '../../_configuration/openapi/zod.ts'

export interface ResourceConfig<
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
> {
  entity: string
  rowSchema: z.ZodObject<RowShape>
  fieldExamples: { [K in keyof Row]-?: Row[K] }
  presets: Record<string, Partial<Record<keyof Row, boolean>>>
}

export function makeResource<
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
>(cfg: ResourceConfig<RowShape, Row>) {
  return {
    entity: cfg.entity,
    schemaByPreset(preset: keyof typeof cfg.presets) {
      const mask: Partial<Record<keyof Row, true>> = {}
      ;(Object.entries(cfg.presets[preset as string]) as Array<[keyof Row, boolean]>).forEach(
        ([k, include]) => {
          if (include) mask[k] = true
        },
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return z.array(cfg.rowSchema.pick(mask as any))
    },
    examplesByPreset(preset: keyof typeof cfg.presets, count = 1, overrides?: Partial<Row>) {
      const list: Partial<Row>[] = []
      for (let i = 0; i < count; i += 1) {
        const example: Partial<Row> = {}
        ;(Object.entries(cfg.presets[preset as string]) as Array<[keyof Row, boolean]>).forEach(
          ([k, include]) => {
            if (include) example[k] = ({ ...cfg.fieldExamples, ...(overrides ?? {}) } as Row)[k]
          },
        )
        list.push(example)
      }
      return list
    },
  }
}

type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteRegister = (path: string, options: any, handler: any) => void

export function registerListRoute<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  App extends FastifyInstance<any, any, any, any, any>,
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
>(
  app: App,
  opts: {
    path: string
    resource: ReturnType<typeof makeResource<RowShape, Row>>
    preset: string

    handler: () => Promise<unknown[]>
    method: MethodName | RouteRegister
  },
) {
  const arraySchema = opts.resource.schemaByPreset(opts.preset)
  const examples = opts.resource.examplesByPreset(opts.preset, 1)
  const routeOptions = { schema: createResponseWithExample(arraySchema, examples) }

  let register: RouteRegister
  if (typeof opts.method === 'function') {
    register = opts.method
  } else {
    const name = opts.method.toLowerCase()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register = (app as any)[name].bind(app) as RouteRegister
  }

  register(opts.path, routeOptions, opts.handler)
}

export function registerActionRoute<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  App extends FastifyInstance<any, any, any, any, any>,
>(
  app: App,
  opts: {
    path: string

    paramsSchema?: z.ZodTypeAny

    bodySchema?: z.ZodTypeAny

    responseSchema?: z.ZodTypeAny
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (req: any) => unknown | Promise<unknown>
    method: MethodName | RouteRegister
  },
) {
  const schema: Record<string, unknown> = {}
  if (opts.paramsSchema) schema.params = opts.paramsSchema
  if (opts.bodySchema) schema.body = opts.bodySchema
  if (opts.responseSchema) schema.response = { 200: opts.responseSchema }

  let register: RouteRegister
  if (typeof opts.method === 'function') {
    register = opts.method
  } else {
    const name = opts.method.toLowerCase()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register = (app as any)[name].bind(app) as RouteRegister
  }

  register(opts.path, { schema }, opts.handler)
}
