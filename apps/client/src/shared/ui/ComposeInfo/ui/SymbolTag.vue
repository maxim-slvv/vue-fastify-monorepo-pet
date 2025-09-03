<script setup lang="ts">
import { cva } from 'class-variance-authority'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'ComposeInfoSymbolTag' })

const props = defineProps<{ text?: string; loading?: boolean }>()

const symbolTag = cva(
  'px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs dark:bg-slate-800 dark:text-slate-300',
)
</script>

<template>
  <div>
    <UiSkeleton v-if="props.loading" class="h-5 w-12" />
    <span v-else :class="symbolTag()">{{ props.text }}</span>
  </div>
</template>
