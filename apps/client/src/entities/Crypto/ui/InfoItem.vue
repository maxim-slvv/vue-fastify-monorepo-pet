<script setup lang="ts">
import UITypography from '@/shared/ui/Typography/UITypography.vue'

defineOptions({ name: 'InfoItem' })

export interface IInfoItemProps {
  label: string
  value?: string | number
  bold?: boolean
}

const props = withDefaults(defineProps<IInfoItemProps>(), {
  bold: false,
})
</script>

<template>
  <div class="flex flex-col">
    <UITypography
      :variant="props.bold ? 'text-m-bold' : 'text-m'"
      :class="props.bold ? '' : 'text-fg'"
    >
      {{ props.label }}{{ props.bold ? ':' : '' }}
    </UITypography>

    <UITypography v-if="props.value" variant="text-m-bold">
      {{ props.value }}
    </UITypography>

    <slot v-else />
  </div>
</template>
