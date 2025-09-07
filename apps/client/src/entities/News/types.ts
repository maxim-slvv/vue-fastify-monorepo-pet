export type NewsRow = {
  id?: string
  title: string
  url: string
  source?: string
  verified?: boolean
  sourceAvatar?: string
  publishedAt?: string
  reactions?: { type: 'LIKE' | 'GOOD' | 'FIRE' | 'BULL' | 'CELEBRATION' | 'FOMO'; count: number }[]
  toolbar?: { views?: string | number; comments?: number; reposts?: number; smiles?: number }
  image?: string
}
