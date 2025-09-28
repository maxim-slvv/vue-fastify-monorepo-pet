import { cryptoSymbolSchema, cryptoRowSchema, IMAGE_SYMBOLS, z } from './schema.ts'

export type CryptoSymbol = z.infer<typeof cryptoSymbolSchema>
export function isCryptoSymbol(value: string): value is CryptoSymbol {
  return (IMAGE_SYMBOLS as readonly string[]).includes(value.toUpperCase())
}

export interface RichSparkline {
  points: number[]
  timestamps: number[]
  period: string
  pointsPerDay: number
  totalDays: number
  resolution: string
}

export type ICryptoServerRow = z.infer<typeof cryptoRowSchema>

export interface ICryptoInternalRow extends Omit<ICryptoServerRow, 'spark'> {
  spark: number[][]
  lastUpdateTime?: number
}

export interface ICryptoApiRow extends Omit<ICryptoServerRow, 'spark'> {
  spark: RichSparkline
}
