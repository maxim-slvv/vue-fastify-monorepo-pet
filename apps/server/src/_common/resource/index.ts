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

export function registerListRoute<
  RowShape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<RowShape>>,
>(
  app: FastifyInstance,
  opts: {
    path: string
    resource: ReturnType<typeof makeResource<RowShape, Row>>
    preset: string
    handler: () => Promise<Row[]>
  },
) {
  const arraySchema = opts.resource.schemaByPreset(opts.preset)
  const examples = opts.resource.examplesByPreset(opts.preset, 1)
  app.get(opts.path, { schema: createResponseWithExample(arraySchema, examples) }, opts.handler)
}
