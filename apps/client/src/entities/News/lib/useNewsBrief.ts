import { ref, onMounted } from 'vue'
import { API_URL } from '@/shared/config/api'
import type { NewsRow } from '@/entities/News/types'

export function useNewsBrief() {
  const rows = ref<NewsRow[]>([])
  const isLoading = ref(true)

  async function load(): Promise<void> {
    const response = await fetch(`${API_URL}/api/news/brief`)
    if (!response.ok) throw new Error(`Failed to load /api/news/brief: ${response.status}`)
    rows.value = (await response.json()) as NewsRow[]
    setTimeout(() => {
      isLoading.value = false
    }, 300) //TODO remove
  }

  onMounted(async () => {
    try {
      await load()
    } catch (error) {
      console.error(error)
      isLoading.value = false
    }
  })

  return { rows, isLoading, reload: load }
}
