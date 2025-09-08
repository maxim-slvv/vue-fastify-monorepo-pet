import type { Ref } from 'vue'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import { API_URL } from '@/shared/config/api'

export function useCryptoToggleFavorite(rows?: Ref<ICryptoServerRow[]>) {
  async function toggleFavoriteApi(symbol: string, isFavorite: boolean): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/crypto/favorite/${symbol}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Toggle favorite error:', response.status, errorText)
        throw new Error(`Failed to toggle favorite for ${symbol}: ${response.status}`)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      throw error
    }
  }

  // Toggle favorite
  async function toggleFavorite(symbol: string, isFavorite: boolean): Promise<void> {
    try {
      await toggleFavoriteApi(symbol, isFavorite)

      if (rows) {
        const index = rows.value.findIndex((r) => r.symbol === symbol)
        if (index !== -1) {
          rows.value = [
            ...rows.value.slice(0, index),
            { ...rows.value[index], isFavorite },
            ...rows.value.slice(index + 1),
          ]
        }
      }
    } catch (error) {
      console.error('Error in toggleFavorite:', error)
    }
  }

  return { toggleFavorite, toggleFavoriteApi }
}
