<script setup lang="ts">
import Typography from '@/shared/ui/Typography/Typography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'PriceCell' })

const props = withDefaults(defineProps<{ value?: string | number; loading?: boolean }>(), {})
</script>

<template>
  <div class="text-right">
    <UiSkeleton v-if="props.loading" class="h-5 w-full" />
    <Typography v-else class="text-m-bold">{{ props.value }}</Typography>
  </div>
</template>
