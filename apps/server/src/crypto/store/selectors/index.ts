import type { CryptoTableRow } from '../../types.ts'
import { z } from 'zod'
import { rowsBaseSchema, rowsTopSchema, rowsFavoriteSchema } from './schemas.ts'
import { projectArray } from '../../../_common/zod/schema-tools.ts'

export type CryptoListResponse = z.output<typeof rowsBaseSchema>
export type CryptoTopResponse = z.output<typeof rowsTopSchema>
export type CryptoFavoriteResponse = z.output<typeof rowsFavoriteSchema>

export { cryptoFieldsPresets } from './presets.ts'
export { rowsBaseSchema, rowsTopSchema, rowsFavoriteSchema } from './schemas.ts'

export function selectAll(rows: CryptoTableRow[]): CryptoListResponse {
  return projectArray(rows, rowsBaseSchema)
}

export function selectTop(rows: CryptoTableRow[], limit = 20): CryptoTopResponse {
  const selectedRows = rows
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
  return projectArray(selectedRows, rowsTopSchema)
}

export function selectFavorite(rows: CryptoTableRow[]): CryptoFavoriteResponse {
  const selectedRows = rows.filter((r) => r.isFavorite === true)
  return projectArray(selectedRows, rowsFavoriteSchema)
}
