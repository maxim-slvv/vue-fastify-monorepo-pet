import type { CryptoSymbol, CryptoTableRow } from '../types.ts'
import type { CryptoRepository } from '../store/repository.ts'
import { mutateRow, setFavorite } from '../store/mutations.ts'
import { selectAll, selectTop, selectFavorite } from '../store/selectors/index.ts'
import type {
  CryptoListResponse,
  CryptoTopResponse,
  CryptoFavoriteResponse,
} from '../store/selectors/index.ts'

export interface CryptoService {
  list(): Promise<CryptoListResponse>
  listTop(): Promise<CryptoTopResponse>
  listFavorite(): Promise<CryptoFavoriteResponse>
  tick(): Promise<CryptoTableRow[]>
  setFavorite(symbol: CryptoSymbol, isFavorite: boolean): Promise<CryptoTableRow[]>
}

export class DefaultCryptoService implements CryptoService {
  constructor(private readonly repository: CryptoRepository) {}

  async list(): Promise<CryptoListResponse> {
    const rows = await this.repository.getAll()
    return selectAll(rows)
  }

  async listTop(): Promise<CryptoTopResponse> {
    const rows = await this.repository.getAll()
    return selectTop(rows)
  }

  async listFavorite(): Promise<CryptoFavoriteResponse> {
    const rows = await this.repository.getAll()
    return selectFavorite(rows)
  }

  async setFavorite(symbol: CryptoSymbol, isFavorite: boolean): Promise<CryptoTableRow[]> {
    const rows = await this.repository.getAll()
    const updated = setFavorite(rows, symbol, isFavorite)
    await this.repository.saveAll(updated)
    return updated
  }

  //---------------------- WS -------------------------

  async tick(): Promise<CryptoTableRow[]> {
    const rows = await this.repository.getAll()
    const updated = rows.map(mutateRow)
    await this.repository.saveAll(updated)
    return updated
  }
}
