import { z } from 'zod'
import { CDN_PATH_PATTERN } from '../../_common/zod/schema-tools.ts'

export const newsRowSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  summary: z.string(),
  publishedAt: z.string().datetime(),
  source: z.string(),
  url: z.string().url(),
  verified: z.boolean().optional(),
  sourceAvatar: z.string().regex(CDN_PATH_PATTERN).optional(),
  image: z.string().regex(CDN_PATH_PATTERN, 'image must be like /cdn/image/news.png').optional(),
  tags: z.array(z.string()),
  isFeatured: z.boolean().optional(),
  reactions: z
    .array(
      z.object({
        type: z.enum(['LIKE', 'GOOD', 'FIRE', 'BULL', 'CELEBRATION', 'FOMO']),
        count: z.number().int().nonnegative(),
      }),
    )
    .optional(),
  toolbar: z
    .object({
      views: z.union([z.string(), z.number()]).optional(),
      comments: z.number().int().nonnegative().optional(),
      reposts: z.number().int().nonnegative().optional(),
      smiles: z.number().int().nonnegative().optional(),
    })
    .optional(),
})

type NewsRow = z.infer<typeof newsRowSchema>

//?-------------------------- For Swagger --------------------------

export const newsFieldExamples: { [K in keyof NewsRow]-?: NewsRow[K] } = {
  id: '2b9c77e3-3e73-4c81-bf67-0b2e7d2f8f53',
  title: 'Bitcoin hits new milestone',
  summary: 'BTC reaches new ATH amid market optimism.',
  publishedAt: '2024-01-01T12:00:00.000Z',
  source: 'CoinDesk',
  url: 'https://example.com/news/btc',
  verified: true,
  sourceAvatar: '/cdn/group-avatar/23423-pengu.jpeg',
  image: '/cdn/image/news.png',
  tags: ['crypto', 'btc'],
  isFeatured: true,
  reactions: [
    { type: 'LIKE', count: 30 },
    { type: 'GOOD', count: 1 },
    { type: 'FIRE', count: 1 },
    { type: 'BULL', count: 1 },
    { type: 'CELEBRATION', count: 1 },
    { type: 'FOMO', count: 1 },
  ],
  toolbar: { views: '1K', comments: 1, reposts: 1, smiles: 17 },
}

export type { z }
