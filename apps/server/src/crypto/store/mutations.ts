import type { CryptoSymbol, CryptoTableRow } from '../types.ts'

export function mutateRow(row: CryptoTableRow): CryptoTableRow {
  const delta = (Math.random() - 0.5) * 1.0
  const priceNum = Number(row.price.replace(/[$,]/g, ''))
  const newPrice = Math.max(0.01, priceNum + priceNum * (delta / 100))
  const ch24 = delta
  const ch7 = delta * 2
  const direction24 = ch24 >= 0 ? 'up' : 'down'
  const direction7 = ch7 >= 0 ? 'up' : 'down'
  const last = row.spark[row.spark.length - 1]
  const rawStep = (Math.random() * 2 - 1) * 2.5
  const step = Math.sign(rawStep || 1) * Math.max(Math.abs(rawStep), 0.8)
  const nextPoint = Math.max(1, last + step)
  const nextSpark = [...row.spark.slice(1), nextPoint]
  return {
    ...row,
    image: row.image,
    price: `$${newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    ch24h: `${Math.abs(ch24).toFixed(2)}%`,
    ch24h_direction: direction24,
    ch7d: `${Math.abs(ch7).toFixed(2)}%`,
    ch7d_direction: direction7,
    spark: nextSpark,
  }
}

export function setFavorite(
  rows: CryptoTableRow[],
  symbol: CryptoSymbol,
  isFavorite: boolean,
): CryptoTableRow[] {
  const upper = symbol.toUpperCase()
  return rows.map((r) => (r.symbol.toUpperCase() === upper ? { ...r, isFavorite } : r))
}
