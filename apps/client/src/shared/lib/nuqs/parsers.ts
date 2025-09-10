export const parseUrlStrings = (value: string | null, defaultValue: string[] = []) => {
  if (!value) return defaultValue
  return value.split(',')
}

export const serializeUrlStrings = (value: string[]) => value.join(',')

export const parseUrlNumber = (value: string | null, defaultValue: number = 1): number => {
  if (!value) return defaultValue
  const parsed = Number(value)
  return Number.isNaN(parsed) ? defaultValue : parsed
}
export const serializeUrlNumber = (value: number) => String(value)
