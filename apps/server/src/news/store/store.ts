import { NewsTableRow } from '../types.ts'

export const initialNewsRows: NewsTableRow[] = [
  {
    id: '2b9c77e3-3e73-4c81-bf67-0b2e7d2f8f53',
    title: 'Bitcoin hits new milestone',
    summary: 'BTC reaches new ATH amid market optimism.',
    publishedAt: '2024-01-01T12:00:00.000Z',
    source: 'CoinDesk',
    url: 'https://example.com/news/btc',
    image: '/cdn/image/news.png',
    tags: ['crypto', 'btc'],
    isFeatured: true,
  },
]
