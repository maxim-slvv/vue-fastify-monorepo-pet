import type { CryptoSymbol, CryptoTableRow } from '../types.ts'
import type { CryptoRepository } from '../store/repository.ts'
import { mutateRow, setFavorite } from '../store/mutations.ts'
import { selectTop, selectFavorite } from '../store/selectors.ts'

export interface CryptoService {
  list(): Promise<CryptoTableRow[]>
  listTop(): Promise<CryptoTableRow[]>
  listFavorite(): Promise<CryptoTableRow[]>
  tick(): Promise<CryptoTableRow[]>
  setFavorite(symbol: CryptoSymbol, isFavorite: boolean): Promise<CryptoTableRow[]>
}

export class DefaultCryptoService implements CryptoService {
  constructor(private readonly repository: CryptoRepository) {}

  async list(): Promise<CryptoTableRow[]> {
    return this.repository.getAll()
  }

  async listTop(): Promise<CryptoTableRow[]> {
    const rows = await this.repository.getAll()
    return selectTop(rows)
  }

  async listFavorite(): Promise<CryptoTableRow[]> {
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
