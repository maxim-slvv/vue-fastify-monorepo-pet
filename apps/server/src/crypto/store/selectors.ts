import type { CryptoTableRow } from '../types.ts'
import { z } from 'zod'
import { cryptoRowSchema } from '../types.ts'
import { pickArrayByPreset, projectArray } from '../../_common/zod/schema-tools.ts'

export const cryptoFieldsPresets = {
  base: {
    rank: true,
    name: true,
    symbol: true,
    image: true,
    price: true,
    ch24h: true,
    ch24h_direction: true,
    ch7d: true,
    ch7d_direction: true,
    marketCap: true,
    volume24h: true,
    spark: true,
    isFavorite: true,
  },
  top: {
    rank: true,
    name: true,
    symbol: true,
    image: true,
    price: true,
    ch24h: true,
    ch24h_direction: true,
    ch7d: false,
    ch7d_direction: false,
    marketCap: false,
    volume24h: false,
    spark: false,
    isFavorite: true,
  },
  favorite: {
    rank: true,
    name: true,
    symbol: true,
    image: true,
    price: true,
    ch24h: true,
    ch24h_direction: true,
    ch7d: true,
    ch7d_direction: true,
    marketCap: true,
    volume24h: true,
    spark: true,
    isFavorite: true,
  },
} as const

export const rowsBaseSchema = pickArrayByPreset(cryptoRowSchema, cryptoFieldsPresets.base)
export const rowsTopSchema = pickArrayByPreset(cryptoRowSchema, cryptoFieldsPresets.top)
export const rowsFavoriteSchema = pickArrayByPreset(cryptoRowSchema, cryptoFieldsPresets.favorite)

export type CryptoListResponse = z.output<typeof rowsBaseSchema>
export type CryptoTopResponse = z.output<typeof rowsTopSchema>
export type CryptoFavoriteResponse = z.output<typeof rowsFavoriteSchema>

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
