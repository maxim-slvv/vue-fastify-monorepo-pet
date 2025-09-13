import type { z } from '../../types/schema.ts'
import { newsRowSchema } from '../../types/schema.ts'

type NewsRow = z.infer<typeof newsRowSchema>
type NewsFieldsPreset = Record<keyof NewsRow, boolean>

const baseFields: NewsFieldsPreset = {
  id: true,
  title: true,
  summary: true,
  publishedAt: true,
  source: true,
  url: true,
  verified: true,
  sourceAvatar: true,
  image: true,
  tags: true,
  isFeatured: true,
  reactions: true,
  toolbar: true,
}

export const newsFieldsPresets = {
  base: {
    ...baseFields,
  } satisfies NewsFieldsPreset,
  brief: {
    id: false,
    title: true,
    summary: false,
    publishedAt: true,
    source: true,
    url: true,
    verified: true,
    sourceAvatar: true,
    image: true,
    tags: false,
    isFeatured: false,
    reactions: true,
    toolbar: true,
  } satisfies NewsFieldsPreset,
  featured: {
    id: true,
    title: true,
    summary: true,
    publishedAt: true,
    source: true,
    url: true,
    verified: true,
    sourceAvatar: true,
    image: true,
    tags: false,
    isFeatured: true,
    reactions: true,
    toolbar: true,
  } satisfies NewsFieldsPreset,
} as const
