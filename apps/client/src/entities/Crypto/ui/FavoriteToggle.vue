<script setup lang="ts">
import { defineEmits } from 'vue'
import IconButton from '@/shared/ui/IconButton/IconButton.vue'

defineOptions({ name: 'FavoriteToggle' })

export interface IFavoriteToggleProps {
  symbol: string
  isFavorite?: boolean
  loading?: boolean
  onToggle?: (symbol: string, isFavorite: boolean) => void
}

const props = withDefaults(defineProps<IFavoriteToggleProps>(), {
  isFavorite: false,
  loading: false,
})

const emit = defineEmits<{
  toggle: [symbol: string, isFavorite: boolean]
}>()

const handleToggle = () => {
  if (props.loading) return

  if (props.onToggle) {
    props.onToggle(props.symbol, !props.isFavorite)
  } else {
    emit('toggle', props.symbol, !props.isFavorite)
  }
}
</script>

<template>
  <IconButton @click="handleToggle" :disabled="props.loading" size="sm" class="-ml-[8px]">
    <i
      :class="[
        'pi',
        props.isFavorite ? 'pi-star-fill' : 'pi-star',
        props.isFavorite ? 'text-yellow-500' : 'text-gray-400',
        'transition-colors duration-200',
      ]"
      style="font-size: 1rem"
    />
  </IconButton>
</template>
