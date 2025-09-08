import type { PaginationParams, PaginatedRepository } from './types.ts'

export abstract class PaginatedService<T> {
  constructor(protected readonly repository: PaginatedRepository<T>) {}

  protected async getAllData(): Promise<T[]> {
    return this.repository.getAll()
  }

  protected createPaginatedHandler(
    selector: (data: T[]) => T[],
  ): (params: PaginationParams) => Promise<T[]> {
    return async () => {
      const allData = await this.getAllData()
      return selector(allData)
    }
  }

  protected createSelector(filterFn?: (item: T) => boolean): (data: T[]) => T[] {
    return (data: T[]) => {
      if (filterFn) {
        return data.filter(filterFn)
      }
      return data
    }
  }
}
