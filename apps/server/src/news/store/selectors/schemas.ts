import { newsRowSchema } from '../../types.ts'
import { newsFieldsPresets } from './presets.ts'
import { pickArrayByPreset } from '../../../_common/zod/schema-tools.ts'

export const rowsBaseSchema = pickArrayByPreset(newsRowSchema, newsFieldsPresets.base)
export const rowsBriefSchema = pickArrayByPreset(newsRowSchema, newsFieldsPresets.brief)
export const rowsFeaturedSchema = pickArrayByPreset(newsRowSchema, newsFieldsPresets.featured)
