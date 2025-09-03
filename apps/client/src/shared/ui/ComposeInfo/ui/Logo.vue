<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { API_URL } from '@/shared/config/api'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'ComposeInfoLogo' })

const props = withDefaults(
  defineProps<{
    image?: string
    alt?: string
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    class?: string
  }>(),
  { size: 'md' },
)

const imageCls = cva('rounded object-cover', {
  variants: {
    size: { sm: 'w-5 h-5 rounded-sm', md: 'w-8 h-8 rounded', lg: 'w-10 h-10 rounded' },
  },
  defaultVariants: { size: 'md' },
})
</script>

<template>
  <div>
    <UiSkeleton v-if="props.loading" :class="imageCls({ size: props.size })" rounded="full" />
    <img
      v-else
      :src="`${API_URL}${props.image}`"
      :alt="props.alt"
      :class="imageCls({ size: props.size })"
      loading="lazy"
    />
  </div>
</template>
