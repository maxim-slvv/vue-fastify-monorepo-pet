import type { ICryptoServerRow } from '../types.ts'
import { initialCryptoRows } from './state.ts'

export interface CryptoRepository {
  getAll(): Promise<ICryptoServerRow[]>
  saveAll(rows: ICryptoServerRow[]): Promise<void>
}

export class InMemoryCryptoRepository implements CryptoRepository {
  async getAll(): Promise<ICryptoServerRow[]> {
    return initialCryptoRows
  }

  async saveAll(rows: ICryptoServerRow[]): Promise<void> {
    for (let i = 0; i < rows.length; i += 1) initialCryptoRows[i] = rows[i]
  }
}
