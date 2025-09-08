import type { NewsTableRow } from '../types.ts'
import type { NewsRepository } from '../store/repository.ts'

import { PaginatedService } from '../../_common/resource/index.ts'

export interface NewsService {
  list(): Promise<NewsTableRow[]>
  listBrief(): Promise<NewsTableRow[]>
  listFeatured(): Promise<NewsTableRow[]>
}

export class DefaultNewsService extends PaginatedService<NewsTableRow> implements NewsService {
  constructor(protected readonly repository: NewsRepository) {
    super(repository)
  }

  async list(): Promise<NewsTableRow[]> {
    const rows: NewsTableRow[] = await this.repository.list()
    return rows
  }

  async listBrief(): Promise<NewsTableRow[]> {
    const rows: NewsTableRow[] = await this.repository.list()
    return rows
  }

  async listFeatured(): Promise<NewsTableRow[]> {
    const rows: NewsTableRow[] = await this.repository.listFeatured()
    return rows
  }
}
