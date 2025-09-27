import type { CryptoSymbol } from '../types.ts'

const DEFAULT_PRICE_RANGE: [number, number] = [0.01, 100]
const DEFAULT_CH24H_RANGE: [number, number] = [-5, 5]
const DEFAULT_CH7D_RANGE: [number, number] = [-10, 10]
const DEFAULT_LAUNCH_YEAR = 2017

const ATH_PRICE_MULTIPLIER = 1000
const ATH_BASE_PRICE = 1
const ATL_PRICE_MULTIPLIER = 0.1

const BULL_MARKET_START_YEAR = 2020
const BEAR_MARKET_END_YEAR = 2022
const ATH_END_DATE = '2024-12-01'

const SUPPLY_MULTIPLIER = 1000000000
const SUPPLY_RANDOM_FACTOR = 900000000
const UCID_RANDOM_RANGE = 10000

const SOCIAL_NETWORKS_CHANCE = 0.5
const MAX_SUPPLY_CHANCE = 0.5
const VOL_MARKET_CAP_MULTIPLIER = 10
const VOL_MARKET_CAP_BASE = 1
const PRICE_DECIMAL_THRESHOLD = 1
const PRICE_HIGH_DECIMALS = 5
const PRICE_LOW_DECIMALS = 2
const BEAR_MARKET_START_YEAR = 2018

function generateRandomDate(startDate: string, endDate: string): string {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const randomTime = start + Math.random() * (end - start)
  return new Date(randomTime).toISOString().split('T')[0]
}

function formatDateRange(year: number, month = '01', day = '01'): string {
  return `${year}-${month}-${day}`
}

function getAthDateRange(athStartYear: number): { start: string; end: string } {
  return {
    start: formatDateRange(athStartYear),
    end: ATH_END_DATE,
  }
}

function getAtlDateRange(
  atlStartYear: number,
  athStartYear: number,
): { start: string; end: string } {
  return {
    start: formatDateRange(atlStartYear),
    end: formatDateRange(Math.min(athStartYear, BEAR_MARKET_END_YEAR), '12', '31'),
  }
}

export function createSparkline(length = 21, start = 120, volatility = 3): number[] {
  const points: number[] = []
  let v = start
  for (let i = 0; i < length; i += 1) {
    const step = (Math.random() * 2 - 1) * volatility
    v = Math.max(1, v + step)
    points.push(Number(v.toFixed(2)))
  }
  return points
}

export function createBasicCoinData(
  symbol: CryptoSymbol,
  name: string,
  marketCap: string,
  volume24h: string,
  options: {
    priceRange?: [number, number]
    ch24hRange?: [number, number]
    ch7dRange?: [number, number]
    launchYear?: number
  } = {},
) {
  const {
    priceRange = DEFAULT_PRICE_RANGE,
    ch24hRange = DEFAULT_CH24H_RANGE,
    ch7dRange = DEFAULT_CH7D_RANGE,
    launchYear = DEFAULT_LAUNCH_YEAR,
  } = options

  const price = Math.random() * (priceRange[1] - priceRange[0]) + priceRange[0]
  const ch24h = Math.random() * (ch24hRange[1] - ch24hRange[0]) + ch24hRange[0]
  const ch7d = Math.random() * (ch7dRange[1] - ch7dRange[0]) + ch7dRange[0]

  const athStartYear = Math.max(launchYear + 1, BULL_MARKET_START_YEAR)
  const atlStartYear = Math.max(launchYear, BEAR_MARKET_START_YEAR)

  const athDateRange = getAthDateRange(athStartYear)
  const atlDateRange = getAtlDateRange(atlStartYear, athStartYear)

  return {
    symbol,
    image: `/cdn/image/${symbol}.png`,
    price: `${price.toFixed(price < PRICE_DECIMAL_THRESHOLD ? PRICE_HIGH_DECIMALS : PRICE_LOW_DECIMALS)}`,
    ch24h: `${Math.abs(ch24h).toFixed(2)}%`,
    ch24h_direction: (ch24h >= 0 ? 'up' : 'down') as 'up' | 'down',
    ch7d: `${Math.abs(ch7d).toFixed(2)}%`,
    ch7d_direction: (ch7d >= 0 ? 'up' : 'down') as 'up' | 'down',
    marketCap,
    volume24h,
    site: `https://${name.toLowerCase().replace(/\s+/g, '')}.org`,
    unlockedMarketCap: marketCap,
    fdv: marketCap,
    volMarketCapRatio: `${(Math.random() * VOL_MARKET_CAP_MULTIPLIER + VOL_MARKET_CAP_BASE).toFixed(2)}%`,
    totalSupply: `${(Math.random() * SUPPLY_MULTIPLIER).toFixed(0)} ${symbol}`,
    maxSupply:
      Math.random() > MAX_SUPPLY_CHANCE
        ? `${(Math.random() * SUPPLY_MULTIPLIER + SUPPLY_MULTIPLIER).toFixed(0)} ${symbol}`
        : 'No Limit',
    circulatingSupply: `${(Math.random() * SUPPLY_RANDOM_FACTOR).toFixed(0)} ${symbol}`,
    socialNetworks:
      Math.random() > SOCIAL_NETWORKS_CHANCE
        ? {
            twitter: `https://twitter.com/${name.toLowerCase().replace(/\s+/g, '')}`,
            reddit: `https://reddit.com/r/${name.toLowerCase().replace(/\s+/g, '')}`,
          }
        : undefined,
    contracts: [
      {
        platform: name,
        address: 'native',
      },
    ],
    explorers: [
      {
        name: 'Explorer',
        url: `https://explorer.${name.toLowerCase().replace(/\s+/g, '')}.org`,
      },
    ],
    wallets: [
      {
        name: 'Official Wallet',
        url: `https://wallet.${name.toLowerCase().replace(/\s+/g, '')}.org`,
      },
    ],
    ucid: `${name.toLowerCase().replace(/\s+/g, '-')}-${symbol.toLowerCase()}-${Math.floor(Math.random() * UCID_RANDOM_RANGE)}`,
    allTimeHigh: {
      price: Math.random() * ATH_PRICE_MULTIPLIER + ATH_BASE_PRICE,
      date: generateRandomDate(athDateRange.start, athDateRange.end),
    },
    allTimeLow: {
      price: Math.random() * ATL_PRICE_MULTIPLIER,
      date: generateRandomDate(atlDateRange.start, atlDateRange.end),
    },
  }
}
