<script setup lang="ts">
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'PercentCell' })

export interface IPercentCellProps {
  value?: string
  trend?: 'up' | 'down' | ''
  loading?: boolean
}

const props = withDefaults(defineProps<IPercentCellProps>(), {})
</script>

<template>
  <UiSkeleton v-if="props.loading" class="h-5 w-full" />
  <UITypography
    v-else
    variant="text-m-bold"
    :color="props.trend === 'up' ? 'green-light' : props.trend === 'down' ? 'red-light' : undefined"
  >
    {{ props.value }}
  </UITypography>
</template>
