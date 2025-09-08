import { z } from 'zod'
import { createPaginatedResponseSchema } from '../pagination/index.ts'
import { getDefaultPaginationMeta } from '../pagination/schemas.ts'
import type { ResourceConfig } from './types.ts'

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
    paginatedSchemaByPreset(preset: keyof typeof cfg.presets) {
      return createPaginatedResponseSchema(this.schemaByPreset(preset))
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
    paginatedExamplesByPreset(
      preset: keyof typeof cfg.presets,
      total = 1,
      overrides?: Partial<Row>,
    ) {
      const data = this.examplesByPreset(preset, total, overrides)
      return {
        data,
        meta: getDefaultPaginationMeta(total),
      }
    },
  }
}
