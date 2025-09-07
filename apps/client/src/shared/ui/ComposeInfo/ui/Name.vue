<script setup lang="ts">
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineOptions({ name: 'ComposeInfoName' })

const props = defineProps<{ text?: string; loading?: boolean; truncate?: boolean }>()
</script>

<template>
  <div>
    <UiSkeleton v-if="props.loading" class="h-5 w-32" />
    <UITypography variant="text-m-bold" v-else :class="props.truncate ? 'truncate' : undefined">{{
      props.text
    }}</UITypography>
  </div>
</template>
