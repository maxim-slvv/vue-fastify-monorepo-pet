import type { CryptoSymbol, RichSparkline } from '../types.ts'

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
    const step = (Math.random() * 2 - 1) * volatility * (1 + Math.random() * 0.5)
    v = Math.max(1, v + step)
    points.push(Number(v.toFixed(2)))
  }
  return points
}

export function createDailySparklines(start = 120, volatility = 3): number[][] {
  const DAYS_IN_YEAR = 365
  const POINTS_PER_DAY = 288

  const dailyData: number[][] = []
  let currentValue = start

  for (let day = 0; day < DAYS_IN_YEAR; day++) {
    const dayData = createSparkline(POINTS_PER_DAY, currentValue, volatility)
    dailyData.push(dayData)
    currentValue = dayData[dayData.length - 1]
  }

  return dailyData
}

export function createRichSparkline(
  dailySparklines: number[][],
  period: string = '7d',
): RichSparkline {
  if (!dailySparklines || dailySparklines.length === 0) {
    return {
      points: [],
      timestamps: [],
      period,
      pointsPerDay: 0,
      totalDays: 0,
      resolution: '5min',
    }
  }

  const MAX_POINTS = 300

  let days: number[][]
  let totalDays: number
  let resolution: string

  switch (period) {
    case '24h':
      days = [dailySparklines[dailySparklines.length - 1] || []]
      totalDays = 1
      resolution = '5min'
      const points24h = days[0] || []
      const timestamps24h = points24h.map(
        (_, index) => Date.now() - (points24h.length - 1 - index) * 5 * 60 * 1000,
      )
      return {
        points: points24h,
        timestamps: timestamps24h,
        period,
        pointsPerDay: points24h.length,
        totalDays: 1,
        resolution,
      }

    case '7d':
      days = dailySparklines.slice(-7)
      totalDays = 7
      resolution = 'varies'
      break

    case '14d':
      days = dailySparklines.slice(-14)
      totalDays = 14
      resolution = 'varies'
      break

    case '30d':
      days = dailySparklines.slice(-30)
      totalDays = 30
      resolution = 'varies'
      break

    case '60d':
      days = dailySparklines.slice(-60)
      totalDays = 60
      resolution = 'varies'
      break

    case '200d':
      days = dailySparklines.slice(-200)
      totalDays = 200
      resolution = '1day'
      break

    case '1y':
      days = dailySparklines.slice(-365)
      totalDays = 365
      resolution = '1day'
      break

    default:
      days = dailySparklines.slice(-7)
      totalDays = 7
      resolution = 'varies'
  }

  const maxPointsForPeriod = period === '1y' ? 365 : MAX_POINTS
  const result = extractPointsFromDaysWithLimit(days, maxPointsForPeriod)
  const pointsPerDay = Math.max(1, Math.floor(maxPointsForPeriod / days.length))

  const now = Date.now()
  const timestamps = result.map((_, index) => {
    const dayIndex = Math.floor(index / pointsPerDay)
    const pointInDay = index % pointsPerDay

    const dayTimestamp = now - (totalDays - dayIndex) * 24 * 60 * 60 * 1000

    if (pointsPerDay === 1) {
      return dayTimestamp
    } else {
      const pointInterval = (24 * 60 * 60 * 1000) / pointsPerDay
      return dayTimestamp + pointInDay * pointInterval
    }
  })

  return {
    points: result,
    timestamps,
    period,
    pointsPerDay,
    totalDays,
    resolution,
  }
}

function extractPointsFromDaysWithLimit(days: number[][], maxTotalPoints: number): number[] {
  if (days.length === 0) return []

  const pointsPerDay = Math.max(1, Math.floor(maxTotalPoints / days.length))
  const result: number[] = []
  let lastKnownValue = 100

  for (const dayData of days) {
    if (dayData.length === 0) {
      if (pointsPerDay === 1) {
        result.push(lastKnownValue)
      } else {
        for (let i = 0; i < pointsPerDay; i++) {
          result.push(lastKnownValue)
        }
      }
    } else {
      lastKnownValue = dayData[dayData.length - 1]

      if (pointsPerDay === 1) {
        result.push(lastKnownValue)
      } else {
        const actualPointsPerDay = Math.min(pointsPerDay, dayData.length)
        const step = Math.max(1, Math.floor(dayData.length / actualPointsPerDay))

        for (let i = 0; i < actualPointsPerDay; i++) {
          const index = Math.min(i * step, dayData.length - 1)
          result.push(dayData[index])
          lastKnownValue = dayData[index]
        }
      }
    }

    if (result.length >= maxTotalPoints) {
      return result.slice(0, maxTotalPoints)
    }
  }

  if (maxTotalPoints === 365 && result.length < 365) {
    while (result.length < 365) {
      result.push(lastKnownValue)
    }
  }

  return result
}

function generatePeriodChange(
  baseChange: number,
  daysMultiplier: number,
): { change: number; direction: 'up' | 'down' } {
  const periodChange = baseChange * (1 + (Math.random() * daysMultiplier) / 7)
  const finalChange = periodChange + (Math.random() - 0.5) * 5

  return {
    change: Math.abs(finalChange),
    direction: finalChange >= 0 ? 'up' : 'down',
  }
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

  const ch14dData = generatePeriodChange(ch7d, 2)
  const ch30dData = generatePeriodChange(ch7d, 4)
  const ch60dData = generatePeriodChange(ch7d, 8)
  const ch200dData = generatePeriodChange(ch7d, 25)
  const ch1yData = generatePeriodChange(ch7d, 52)

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
    ch14d: `${ch14dData.change.toFixed(2)}%`,
    ch14d_direction: ch14dData.direction,
    ch30d: `${ch30dData.change.toFixed(2)}%`,
    ch30d_direction: ch30dData.direction,
    ch60d: `${ch60dData.change.toFixed(2)}%`,
    ch60d_direction: ch60dData.direction,
    ch200d: `${ch200dData.change.toFixed(2)}%`,
    ch200d_direction: ch200dData.direction,
    ch1y: `${ch1yData.change.toFixed(2)}%`,
    ch1y_direction: ch1yData.direction,
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
