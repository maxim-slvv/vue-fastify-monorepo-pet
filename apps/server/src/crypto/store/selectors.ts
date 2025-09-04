import type { CryptoTableRow } from '../types.ts'
import { initialCryptoRows } from '../store/state.ts'

export interface CryptoRepository {
  getAll(): Promise<CryptoTableRow[]>
  saveAll(rows: CryptoTableRow[]): Promise<void>
}

export class InMemoryCryptoRepository implements CryptoRepository {
  async getAll(): Promise<CryptoTableRow[]> {
    return initialCryptoRows
  }

  async saveAll(rows: CryptoTableRow[]): Promise<void> {
    for (let i = 0; i < rows.length; i += 1) initialCryptoRows[i] = rows[i]
  }
}
