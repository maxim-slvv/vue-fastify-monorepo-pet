export const useHandleEmptyParams = () => {
  interface HandleEmptyArrayParamProps {
    value: string[] | ((prev: string[]) => string[]) | null
    current: string[]
    rawSetter: (v: string[] | ((prev: string[]) => string[]) | null) => unknown
  }

  const handleEmptyArrayParam = ({
    value,
    current,
    rawSetter,
  }: HandleEmptyArrayParamProps): void => {
    if (value === null) {
      rawSetter(null)
      return
    }
    if (Array.isArray(value)) {
      const cleaned = value.filter((v) => v && v.length > 0)
      rawSetter(cleaned.length > 0 ? cleaned : null)
      return
    }
    if (typeof value === 'function') {
      const next = value(current)
      const cleaned = next.filter((v) => v && v.length > 0)
      rawSetter(cleaned.length > 0 ? cleaned : null)
      return
    }
    rawSetter(value)
    return
  }

  return { handleEmptyArrayParam }
}
