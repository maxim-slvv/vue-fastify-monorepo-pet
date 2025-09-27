import { CryptoTimePeriod } from './types'

export interface ITimePeriod {
  label: string
  queryParam: CryptoTimePeriod
}

export const CRYPTO_TIME_DEFAULT: CryptoTimePeriod = '7d'

export const CRYPTO_TIME_PERIODS: ITimePeriod[] = [
  { label: '24H', queryParam: '24h' },
  { label: '7D', queryParam: CRYPTO_TIME_DEFAULT },
  { label: '14D', queryParam: '14d' },
  { label: '30D', queryParam: '30d' },
  { label: '60D', queryParam: '60d' },
  { label: '200D ', queryParam: '200d' },
  { label: '1Y', queryParam: '1y' },
]
