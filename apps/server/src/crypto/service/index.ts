import type { CryptoTableRow } from '../types.ts'
import type { CryptoRepository } from '../store/selectors.ts'
import { mutateRow } from '../store/mutations.ts'

export interface CryptoService {
  list(): Promise<CryptoTableRow[]>
  tick(): Promise<CryptoTableRow[]>
}

export class DefaultCryptoService implements CryptoService {
  constructor(private readonly repository: CryptoRepository) {}

  async list(): Promise<CryptoTableRow[]> {
    return this.repository.getAll()
  }

  async tick(): Promise<CryptoTableRow[]> {
    const rows = await this.repository.getAll()
    const updated = rows.map(mutateRow)
    await this.repository.saveAll(updated)
    return updated
  }
}
