<script setup lang="ts">
import Button from 'primevue/button'
import type { ButtonProps } from 'primevue/button'
import { computed } from 'vue'

defineOptions({ name: 'UiButton' })

const severityMap = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'secondary',
  success: 'success',
  info: 'info',
  warn: 'warn',
  danger: 'danger',
} as const
type Variant = keyof typeof severityMap

export interface IUiButtonProps extends /* @vue-ignore */ ButtonProps {
  variant?: Variant
}

const props = defineProps<IUiButtonProps>()

const computedSeverity = computed(() => {
  if (props.variant) return severityMap[props.variant]
  return props.severity || 'primary'
})

const buttonProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant, ...rest } = props
  return {
    ...rest,
    severity: computedSeverity.value,
  }
})
</script>

<template>
  <Button v-bind="buttonProps" :class="{ 'ui-button-primary': props.variant === 'primary' }">
    <slot />
  </Button>
</template>

<style scoped>
.ui-button-primary {
  color: white !important;
}

.ui-button-primary :deep(.p-button-label) {
  color: white !important;
}

.ui-button-primary :deep(span) {
  color: white !important;
}
</style>
