import { cryptoSymbolSchema, cryptoRowSchema, IMAGE_SYMBOLS, z } from './schema.ts'

export type CryptoSymbol = z.infer<typeof cryptoSymbolSchema>
export function isCryptoSymbol(value: string): value is CryptoSymbol {
  return (IMAGE_SYMBOLS as readonly string[]).includes(value.toUpperCase())
}

export type CryptoTableRow = z.infer<typeof cryptoRowSchema>
