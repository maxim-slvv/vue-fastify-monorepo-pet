<script setup lang="ts">
import Typography from '@/shared/ui/Typography/Typography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'ComposeInfoName' })

const props = defineProps<{ text?: string; loading?: boolean; truncate?: boolean }>()
</script>

<template>
  <div>
    <UiSkeleton v-if="props.loading" class="h-5 w-32" />
    <Typography v-else class="text-m-bold" :class="props.truncate ? 'truncate' : undefined">{{
      props.text
    }}</Typography>
  </div>
</template>
