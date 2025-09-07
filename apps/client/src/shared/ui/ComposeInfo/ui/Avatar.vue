<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { API_URL } from '@/shared/config/api'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import UiPicture from '@/shared/ui/Picture/UiPicture.vue'

defineOptions({ name: 'ComposeInfoAvatar' })

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
    size: { sm: 'w-5 h-5 rounded-full', md: 'w-8 h-8 rounded-full', lg: 'w-10 h-10 rounded-full' },
  },
  defaultVariants: { size: 'md' },
})
</script>

<template>
  <div>
    <UiSkeleton v-if="props.loading" :class="imageCls({ size: props.size })" rounded="full" />
    <UiPicture
      v-else
      :src="`${API_URL}${props.image}`"
      :alt="props.alt"
      :class="imageCls({ size: props.size })"
      loading="lazy"
    />
  </div>
</template>
