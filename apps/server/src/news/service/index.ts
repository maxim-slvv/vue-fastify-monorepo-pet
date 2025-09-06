import type { NewsTableRow } from '../types.ts'
import type { NewsRepository } from '../store/repository.ts'
import { selectAll, selectBrief, selectFeatured } from '../store/selectors/index.ts'
import type {
  NewsListResponse,
  NewsBriefResponse,
  NewsFeaturedResponse,
} from '../store/selectors/index.ts'

export interface NewsService {
  list(): Promise<NewsListResponse>
  listBrief(): Promise<NewsBriefResponse>
  listFeatured(): Promise<NewsFeaturedResponse>
}

export class DefaultNewsService implements NewsService {
  constructor(private readonly repository: NewsRepository) {}

  async list(): Promise<NewsListResponse> {
    const rows: NewsTableRow[] = await this.repository.list()
    return selectAll(rows)
  }

  async listBrief(): Promise<NewsBriefResponse> {
    const rows: NewsTableRow[] = await this.repository.list()
    return selectBrief(rows)
  }

  async listFeatured(): Promise<NewsFeaturedResponse> {
    const rows: NewsTableRow[] = await this.repository.listFeatured()
    return selectFeatured(rows)
  }
}
