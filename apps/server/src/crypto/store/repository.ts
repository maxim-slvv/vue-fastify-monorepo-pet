import type { ICryptoInternalRow } from '../types.ts'
import { initialCryptoRows } from './state.ts'

export interface CryptoRepository {
  getAll(): Promise<ICryptoInternalRow[]>
  saveAll(rows: ICryptoInternalRow[]): Promise<void>
}

export class InMemoryCryptoRepository implements CryptoRepository {
  private data: ICryptoInternalRow[]

  constructor() {
    this.data = initialCryptoRows.map((row) => ({
      ...row,
      spark: row.spark.map((day) => [...day]),
    }))
  }

  async getAll(): Promise<ICryptoInternalRow[]> {
    return this.data
  }

  async saveAll(rows: ICryptoInternalRow[]): Promise<void> {
    this.data = rows
  }
}

export const cryptoRepository = new InMemoryCryptoRepository()
