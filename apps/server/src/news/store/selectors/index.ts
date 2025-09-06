import type { NewsTableRow } from '../../types.ts'
import { z } from 'zod'
import { rowsBaseSchema, rowsBriefSchema, rowsFeaturedSchema } from './schemas.ts'
import { projectArray } from '../../../_common/zod/schema-tools.ts'

export type NewsListResponse = z.output<typeof rowsBaseSchema>
export type NewsBriefResponse = z.output<typeof rowsBriefSchema>
export type NewsFeaturedResponse = z.output<typeof rowsFeaturedSchema>

export { newsFieldsPresets } from './presets.ts'
export { rowsBaseSchema, rowsBriefSchema, rowsFeaturedSchema } from './schemas.ts'

export function selectAll(rows: NewsTableRow[]): NewsListResponse {
  return projectArray(rows, rowsBaseSchema)
}

export function selectBrief(rows: NewsTableRow[]): NewsBriefResponse {
  return projectArray(rows, rowsBriefSchema)
}

export function selectFeatured(rows: NewsTableRow[]): NewsFeaturedResponse {
  return projectArray(rows, rowsFeaturedSchema)
}
