<script setup lang="ts">
import Typography from '@/shared/ui/Typography/Typography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'PercentCell' })

const props = withDefaults(
  defineProps<{ value?: string; trend?: 'up' | 'down' | ''; loading?: boolean }>(),
  {},
)
</script>

<template>
  <UiSkeleton v-if="props.loading" class="h-5 w-full" />
  <Typography
    v-else
    :color="props.trend === 'up' ? 'green-light' : props.trend === 'down' ? 'red-light' : undefined"
    class="text-m-bold"
  >
    {{ props.value }}
  </Typography>
</template>
