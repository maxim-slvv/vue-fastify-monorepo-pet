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
