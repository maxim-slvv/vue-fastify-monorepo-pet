import type { CryptoSymbol, ICryptoInternalRow } from '../types.ts'

function calculatePeriodChange(
  spark: number[][],
  daysBack: number,
): { change: string; direction: 'up' | 'down' } {
  if (!spark || spark.length === 0) {
    return { change: '0.00%', direction: 'up' }
  }

  const currentDay = spark[spark.length - 1] || []
  const currentPrice = currentDay[currentDay.length - 1] || 100

  let pastPrice: number

  if (daysBack === 1) {
    pastPrice = currentDay[0] || currentPrice
  } else {
    const pastDayIndex = Math.max(0, spark.length - daysBack)
    const pastDay = spark[pastDayIndex] || []
    pastPrice = pastDay[pastDay.length - 1] || currentPrice
  }

  const change = ((currentPrice - pastPrice) / pastPrice) * 100

  return {
    change: `${Math.abs(change).toFixed(2)}%`,
    direction: change >= 0 ? 'up' : 'down',
  }
}

export function mutateRow(row: ICryptoInternalRow): ICryptoInternalRow {
  const delta = (Math.random() - 0.5) * 1.0
  const priceNum = Number(row.price.replace(/[$,]/g, ''))
  const newPrice = Math.max(0.01, priceNum + priceNum * (delta / 100))

  const ch24 = calculatePeriodChange(row.spark, 1)
  const ch7 = calculatePeriodChange(row.spark, 7)
  const ch14 = calculatePeriodChange(row.spark, 14)
  const ch30 = calculatePeriodChange(row.spark, 30)
  const ch60 = calculatePeriodChange(row.spark, 60)
  const ch200 = calculatePeriodChange(row.spark, 200)
  const ch1y = calculatePeriodChange(row.spark, 365)

  const now = Date.now()
  const lastUpdateTime = row.lastUpdateTime || now - 1500
  const TIME_INTERVAL = 1500

  let nextSpark = row.spark
  let newLastUpdateTime = lastUpdateTime

  if (now - lastUpdateTime >= TIME_INTERVAL) {
    const lastDay = row.spark[row.spark.length - 1] || []
    const lastPoint = lastDay[lastDay.length - 1] || 100

    const volatility = 6
    const rawStep = (Math.random() * 2 - 1) * volatility * (1 + Math.random() * 0.5)
    const step = rawStep
    const nextPoint = Math.max(1, lastPoint + step)

    const newSpark = [...row.spark]
    const newLastDay = [...lastDay, nextPoint]

    const POINTS_PER_DAY = 288
    if (newLastDay.length > POINTS_PER_DAY) {
      newSpark.shift()
      newSpark[newSpark.length - 1] = newLastDay.slice(-POINTS_PER_DAY)
    } else {
      newSpark[newSpark.length - 1] = newLastDay
    }

    const shouldAgeHistoricalData = Math.random() < 0.05
    if (shouldAgeHistoricalData && newSpark.length > 1) {
      const daysToAge = Math.min(7, newSpark.length - 1)

      for (let i = newSpark.length - 1 - daysToAge; i < newSpark.length - 1; i++) {
        if (i >= 0 && newSpark[i].length > 0) {
          for (let j = 0; j < newSpark[i].length; j++) {
            const historicalVolatility = 0.3
            const historicalStep = (Math.random() * 2 - 1) * historicalVolatility
            newSpark[i][j] = Math.max(1, newSpark[i][j] + historicalStep)
          }
        }
      }
    }

    nextSpark = newSpark
    newLastUpdateTime = now
  }

  return {
    ...row,
    image: row.image,
    lastUpdateTime: newLastUpdateTime,
    price: `${newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    ch24h: ch24.change,
    ch24h_direction: ch24.direction,
    ch7d: ch7.change,
    ch7d_direction: ch7.direction,
    ch14d: ch14.change,
    ch14d_direction: ch14.direction,
    ch30d: ch30.change,
    ch30d_direction: ch30.direction,
    ch60d: ch60.change,
    ch60d_direction: ch60.direction,
    ch200d: ch200.change,
    ch200d_direction: ch200.direction,
    ch1y: ch1y.change,
    ch1y_direction: ch1y.direction,
    spark: nextSpark,
  }
}

export function setFavorite(
  rows: ICryptoInternalRow[],
  symbol: CryptoSymbol,
  isFavorite: boolean,
): ICryptoInternalRow[] {
  const upper = symbol.toUpperCase()
  return rows.map((r) => (r.symbol.toUpperCase() === upper ? { ...r, isFavorite } : r))
}
