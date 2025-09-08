import type { CryptoSymbol } from '../types.ts'
import type { ICryptoServerRow } from '../types.ts'
import type { CryptoRepository } from '../store/repository.ts'
import { mutateRow, setFavorite } from '../store/mutations.ts'

import { PaginatedService } from '../../_common/resource/index.ts'

export interface CryptoService {
  list(): Promise<ICryptoServerRow[]>
  listTop(): Promise<ICryptoServerRow[]>
  listFavorite(): Promise<ICryptoServerRow[]>
  tick(): Promise<ICryptoServerRow[]>
  setFavorite(symbol: CryptoSymbol, isFavorite: boolean): Promise<ICryptoServerRow[]>
}

export class DefaultCryptoService
  extends PaginatedService<ICryptoServerRow>
  implements CryptoService
{
  constructor(protected readonly repository: CryptoRepository) {
    super(repository)
  }

  async list(): Promise<ICryptoServerRow[]> {
    const rows = await this.repository.getAll()
    return rows // Всегда возвращаем сырые данные, форматирование будет в registerListRoute
  }

  async listTop(): Promise<ICryptoServerRow[]> {
    const rows = await this.repository.getAll()
    return rows
  }

  async listFavorite(): Promise<ICryptoServerRow[]> {
    const rows = await this.repository.getAll()
    return rows.filter((row) => row.isFavorite)
  }

  async setFavorite(symbol: CryptoSymbol, isFavorite: boolean): Promise<ICryptoServerRow[]> {
    const rows = await this.repository.getAll()
    const updated = setFavorite(rows, symbol, isFavorite)
    await this.repository.saveAll(updated)
    return updated
  }

  //---------------------- WS -------------------------

  async tick(): Promise<ICryptoServerRow[]> {
    const rows = await this.repository.getAll()
    const updated = rows.map(mutateRow)
    await this.repository.saveAll(updated)
    return updated
  }
}
