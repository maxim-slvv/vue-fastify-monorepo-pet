import type { CryptoSymbol, ICryptoApiRow, ICryptoInternalRow } from '../types.ts'
import type { CryptoRepository } from '../store/repository.ts'
import { mutateRow, setFavorite } from '../store/mutations.ts'
import { createRichSparkline } from '../store/generators.ts'

function filterRowByPeriod(row: ICryptoInternalRow, period: string = '7d'): ICryptoApiRow {
  const richSparkline = createRichSparkline(row.spark, period)

  return {
    ...row,
    spark: richSparkline,
  }
}

export interface CryptoService {
  list(period?: string): Promise<ICryptoApiRow[]>
  listTop(period?: string): Promise<ICryptoApiRow[]>
  listFavorite(period?: string): Promise<ICryptoApiRow[]>
  getBySymbol(symbol: CryptoSymbol, period?: string): Promise<ICryptoApiRow | null>
  tick(): Promise<ICryptoInternalRow[]>
  setFavorite(symbol: CryptoSymbol, isFavorite: boolean): Promise<ICryptoApiRow[]>
}

export class DefaultCryptoService implements CryptoService {
  constructor(protected readonly repository: CryptoRepository) {}

  async list(period: string = '7d'): Promise<ICryptoApiRow[]> {
    const rows = await this.repository.getAll()
    return rows.map((row) => filterRowByPeriod(row, period))
  }

  async listTop(period: string = '7d'): Promise<ICryptoApiRow[]> {
    const rows = await this.repository.getAll()
    return rows.map((row) => filterRowByPeriod(row, period))
  }

  async listFavorite(period: string = '7d'): Promise<ICryptoApiRow[]> {
    const rows = await this.repository.getAll()
    return rows.filter((row) => row.isFavorite).map((row) => filterRowByPeriod(row, period))
  }

  async getBySymbol(symbol: CryptoSymbol, period: string = '7d'): Promise<ICryptoApiRow | null> {
    const rows = await this.repository.getAll()
    const coin = rows.find((row) => row.symbol === symbol)
    return coin ? filterRowByPeriod(coin, period) : null
  }

  async setFavorite(symbol: CryptoSymbol, isFavorite: boolean): Promise<ICryptoApiRow[]> {
    const rows = await this.repository.getAll()
    const updated = setFavorite(rows, symbol, isFavorite)
    await this.repository.saveAll(updated)
    return updated.map((row) => filterRowByPeriod(row, '7d'))
  }

  //---------------------- WS -------------------------

  async tick(): Promise<ICryptoInternalRow[]> {
    const rows = await this.repository.getAll()
    const updated = rows.map(mutateRow)
    await this.repository.saveAll(updated)
    return updated
  }
}
