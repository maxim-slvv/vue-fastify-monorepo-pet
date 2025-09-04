import {
  z,
  IMAGE_SYMBOLS,
  cryptoSymbolSchema,
  cryptoRowSchema,
  favoriteParamsSchema,
  favoriteBodySchema,
} from './schema.ts'
export {
  IMAGE_SYMBOLS,
  cryptoSymbolSchema,
  cryptoRowSchema,
  favoriteParamsSchema,
  favoriteBodySchema,
} from './schema.ts'

export type CryptoSymbol = z.infer<typeof cryptoSymbolSchema>
export type CryptoImageFilename = `${CryptoSymbol}.png`
export type CryptoImagePath = `/cdn/image/${CryptoImageFilename}`
export type CryptoTableRow = z.infer<typeof cryptoRowSchema>
export type FavoriteParams = z.infer<typeof favoriteParamsSchema>
export type FavoriteBody = z.infer<typeof favoriteBodySchema>

export function isCryptoSymbol(value: string): value is CryptoSymbol {
  return (IMAGE_SYMBOLS as readonly string[]).includes(value.toUpperCase())
}
