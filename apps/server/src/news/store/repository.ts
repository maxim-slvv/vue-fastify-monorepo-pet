import type { NewsTableRow } from '../types.ts'
import { initialNewsRows } from './store.ts'

export interface NewsRepository {
  list(): Promise<NewsTableRow[]>
  getAll(): Promise<NewsTableRow[]>
  listFeatured(): Promise<NewsTableRow[]>
  saveAll(rows: NewsTableRow[]): Promise<void>
}

export class InMemoryNewsRepository implements NewsRepository {
  async list(): Promise<NewsTableRow[]> {
    return initialNewsRows
  }

  async getAll(): Promise<NewsTableRow[]> {
    return initialNewsRows
  }

  async listFeatured(): Promise<NewsTableRow[]> {
    return initialNewsRows.filter((r) => r.isFeatured === true)
  }

  async saveAll(rows: NewsTableRow[]): Promise<void> {
    for (let i = 0; i < rows.length; i += 1) initialNewsRows[i] = rows[i]
    initialNewsRows.length = rows.length
  }
}
