import type { ICryptoInternalRow, ICryptoServerRow } from '../../types'

/**
 * Обновляет sparkline данные на основе WebSocket update
 */
export function updateSparklineData(
  row: ICryptoServerRow,
  update: ICryptoInternalRow,
): ICryptoServerRow {
  if (update.spark && row.spark) {
    const lastDay = update.spark[update.spark.length - 1] || []
    const newPoint = lastDay[lastDay.length - 1]

    if (newPoint !== undefined) {
      const currentPoints = row.spark.points
      const updatedPoints = [...currentPoints.slice(1), newPoint]

      const currentTimestamps = row.spark.timestamps
      const newTimestamp = Date.now()
      const updatedTimestamps = [...currentTimestamps.slice(1), newTimestamp]

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { spark: _, ...updateWithoutSpark } = update
      return {
        ...row,
        ...updateWithoutSpark,
        spark: {
          ...row.spark,
          points: updatedPoints,
          timestamps: updatedTimestamps,
        },
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { spark: _, ...updateWithoutSpark } = update
      return { ...row, ...updateWithoutSpark }
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { spark: _, ...updateWithoutSpark } = update
    return { ...row, ...updateWithoutSpark }
  }
}
