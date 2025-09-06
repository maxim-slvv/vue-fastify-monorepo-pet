import { z } from 'zod'

export const newsRowSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  summary: z.string(),
  publishedAt: z.string().datetime(),
  source: z.string(),
  url: z.string().url(),
  image: z
    .string()
    .regex(
      /^\/cdn\/image\/[A-Za-z0-9_-]+\.(png|jpg|jpeg)$/i,
      'image must be like /cdn/image/news.png',
    ),
  tags: z.array(z.string()),
  isFeatured: z.boolean().optional(),
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
  image: '/cdn/image/news.png',
  tags: ['crypto', 'btc'],
  isFeatured: true,
}

export type { z }
