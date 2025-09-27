export function formatDate(input?: string | Date): string | undefined {
  if (!input) return undefined
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toLocaleDateString()
}

export function formatPrice(price?: string | number): string {
  if (!price && price !== 0) return '-'
  if (typeof price === 'string') return price.startsWith('$') ? price : `$${price}`
  return `$${price.toFixed(6)}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatApiError(error: any): string {
  if (!error) return 'Произошла неизвестная ошибка'

  if (typeof error.message === 'string') {
    try {
      const parsed = JSON.parse(error.message)
      if (Array.isArray(parsed) && parsed[0]?.code === 'invalid_value') {
        const errorData = parsed[0]
        if (errorData.path?.includes('symbol') && errorData.values) {
          return `Криптовалюта не найдена. Доступные символы: ${errorData.values.join(', ')}`
        }
      }
    } catch {
      console.error('Error parsing API error:', error)
    }
  }

  if (error.message) {
    return error.message
  }

  return 'Произошла ошибка при загрузке данных'
}
