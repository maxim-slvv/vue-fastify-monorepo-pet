<script setup lang="ts">
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'PriceCell' })

export interface IPriceCellProps {
  value?: string | number
  loading?: boolean
}

const props = withDefaults(defineProps<IPriceCellProps>(), {})
</script>

<template>
  <UiSkeleton v-if="props.loading" class="h-5 w-full" />
  <UITypography v-else variant="text-m-bold">{{ props.value }}</UITypography>
</template>
