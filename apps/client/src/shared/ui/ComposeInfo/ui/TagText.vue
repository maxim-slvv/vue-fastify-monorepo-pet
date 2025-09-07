<script setup lang="ts">
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import { cn } from '@/shared/lib/tailwind/cn'

defineOptions({ name: 'ComposeInfoTagText' })

const props = defineProps<{ text?: string; loading?: boolean }>()

const symbolTag = cn('px-2 py-0.5 rounded-md text-xs border')
</script>

<template>
  <div>
    <UiSkeleton v-if="props.loading" class="h-5 w-12" />
    <span
      v-else
      :class="symbolTag"
      :style="{
        backgroundColor: 'var(--brand-primary-soft)',
        color: 'var(--fg)',
        borderColor: 'var(--border)',
        display: 'inline-block',
      }"
    >
      {{ props.text }}
    </span>
  </div>
</template>
