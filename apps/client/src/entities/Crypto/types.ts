export type CryptoTableRow = {
  rank: number
  name: string
  symbol: string
  image: string
  price: string
  ch24h: string
  ch24h_direction: 'up' | 'down'
  ch7d: string
  ch7d_direction: 'up' | 'down'
  marketCap: string
  volume24h: string
  spark: number[]
}
