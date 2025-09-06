import { z } from 'zod'

export function buildPickMask<Shape extends z.ZodRawShape>(
  preset: Partial<Record<keyof z.infer<z.ZodObject<Shape>>, boolean>>,
): Partial<Record<keyof z.infer<z.ZodObject<Shape>>, true>> {
  const mask: Partial<Record<keyof z.infer<z.ZodObject<Shape>>, true>> = {}
  ;(Object.entries(preset) as Array<[keyof z.infer<z.ZodObject<Shape>>, boolean]>).forEach(
    ([key, include]) => {
      if (include) mask[key] = true
    },
  )
  return mask
}

export function pickArrayByPreset<Shape extends z.ZodRawShape>(
  objectSchema: z.ZodObject<Shape>,
  preset: Partial<Record<keyof z.infer<z.ZodObject<Shape>>, boolean>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): z.ZodArray<z.ZodObject<any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return z.array(objectSchema.pick(buildPickMask(preset) as any))
}

export function buildExampleByPreset<
  Shape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<Shape>>,
>(
  fieldExamples: { [K in keyof Row]-?: Row[K] },
  preset: Partial<Record<keyof Row, boolean>>,
  overrides?: Partial<Row>,
): Partial<Row> {
  const merged: Row = { ...(fieldExamples as Row), ...(overrides ?? {}) }
  const example: Partial<Row> = {}
  ;(Object.keys(preset) as Array<keyof Row>).forEach((key) => {
    if (preset[key]) example[key] = merged[key] as Row[typeof key]
  })
  return example
}

export function buildExamplesArray<
  Shape extends z.ZodRawShape,
  Row extends z.infer<z.ZodObject<Shape>>,
>(
  fieldExamples: { [K in keyof Row]-?: Row[K] },
  preset: Partial<Record<keyof Row, boolean>>,
  count = 1,
  overrides?: Partial<Row>,
): Array<Partial<Row>> {
  return Array.from({ length: count }, () => buildExampleByPreset(fieldExamples, preset, overrides))
}

export function projectArray<Arr extends z.ZodArray<z.ZodTypeAny>>(
  rows: Array<z.input<Arr> extends Array<infer U> ? U : unknown>,
  arraySchema: Arr,
): z.output<Arr> {
  return arraySchema.parse(rows) as z.output<Arr>
}
