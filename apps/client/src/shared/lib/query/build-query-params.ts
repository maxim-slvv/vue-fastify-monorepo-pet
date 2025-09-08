export interface IQueryRequest {
  [key: string]: string | number | boolean
}

export interface IQueryMultiRequest {
  [key: string]: Array<string>
}

function buildQueryParams(queryParams?: IQueryRequest): string {
  if (!queryParams) return ''

  const queryParamsArray = Object.entries(queryParams)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}=${String(value)}`)

  return queryParamsArray.length > 0 ? queryParamsArray.join('&') : ''
}

function buildMultiSelectsQueryParams(multiSelects: IQueryMultiRequest = {}): string {
  const paramsArray: string[] = []
  Object.entries(multiSelects).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        paramsArray.push(`${key}[]=${encodeURIComponent(item)}`)
      })
    }
  })

  return paramsArray.join('&')
}

export default function buildFullQueryParams({
  path /** @example path = '/api/coins' */,
  queryParams /** @example { limit: 10, page: 1 } ➜ limit=10&page=1 */,
  multiSelects /** @example { coins: ['123', '456'] } ➜ coins[]=123&coins[]=456 */,
}: {
  path: string
  queryParams?: IQueryRequest
  multiSelects?: IQueryMultiRequest
}): string {
  const params = [buildQueryParams(queryParams), buildMultiSelectsQueryParams(multiSelects)]
    .filter(Boolean)
    .join('&')

  return `${path}${params ? `?${params}` : ''}`
}
