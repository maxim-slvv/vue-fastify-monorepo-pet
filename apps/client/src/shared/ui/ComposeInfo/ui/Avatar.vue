<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { API_URL } from '@/shared/config/api'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import UiPicture from '@/shared/ui/Picture/UiPicture.vue'

defineOptions({ name: 'ComposeInfoAvatar' })

const props = withDefaults(
  defineProps<{
    image?: string
    outerUrlImage?: string
    alt?: string
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    class?: string
  }>(),
  { size: 'md' },
)

const imageCls = cva('rounded object-cover', {
  variants: {
    size: { sm: 'w-5 h-5 rounded-full', md: 'w-7 h-7 rounded-full', lg: 'w-10 h-10 rounded-full' },
  },
  defaultVariants: { size: 'md' },
})

const imageSrc = computed(() => {
  if (props.outerUrlImage) return props.outerUrlImage
  if (props.image) return `${API_URL}${props.image}`
  return undefined
})
</script>

<template>
  <div>
    <div v-if="props.loading" class="mt-[-4px]">
      <UiSkeleton :class="imageCls({ size: props.size })" rounded="full" />
    </div>
    <div v-else class="mt-1">
      <UiPicture
        :src="imageSrc"
        :alt="props.alt"
        :class="imageCls({ size: props.size })"
        loading="lazy"
      />
    </div>
  </div>
</template>
