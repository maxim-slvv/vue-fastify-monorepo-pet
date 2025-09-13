import { cryptoRowSchema } from '../../types.ts'
import { cryptoFieldsPresets } from './presets.ts'
import { pickArrayByPreset } from '../../../_common/zod/schema-tools.ts'

export const rowsBaseSchema = pickArrayByPreset(cryptoRowSchema, cryptoFieldsPresets.base)
export const rowsTopSchema = pickArrayByPreset(cryptoRowSchema, cryptoFieldsPresets.top)
export const rowsFavoriteSchema = pickArrayByPreset(cryptoRowSchema, cryptoFieldsPresets.favorite)
export const rowsFullSchema = pickArrayByPreset(cryptoRowSchema, cryptoFieldsPresets.full)
