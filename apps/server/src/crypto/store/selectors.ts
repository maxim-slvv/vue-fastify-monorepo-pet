import type { CryptoTableRow } from '../types.ts'

export function selectTop(rows: CryptoTableRow[], limit = 20): CryptoTableRow[] {
  return rows
    .slice()
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
}

export function selectFavorite(rows: CryptoTableRow[]): CryptoTableRow[] {
  return rows.filter((r) => r.isFavorite === true)
}
