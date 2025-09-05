<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue'

defineOptions({ name: 'UiButton' })

type Variant = 'primary' | 'secondary' | 'ghost' | 'success' | 'info' | 'warn' | 'danger'

const props = defineProps<{
  label?: string
  variant?: Variant
  outlined?: boolean
  text?: boolean
  link?: boolean
  rounded?: boolean
  raised?: boolean
  size?: 'small' | 'large'
  icon?: string
  loading?: boolean
  disabled?: boolean
}>()

const severityMap: Record<Variant, string> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'secondary',
  success: 'success',
  info: 'info',
  warn: 'warn',
  danger: 'danger',
}

const computedSeverity = computed(() => severityMap[props.variant ?? 'primary'])
</script>

<template>
  <Button
    :label="props.label"
    :severity="computedSeverity"
    :outlined="props.outlined"
    :text="props.text"
    :link="props.link"
    :rounded="props.rounded"
    :raised="props.raised"
    :size="props.size"
    :icon="props.icon"
    :loading="props.loading"
    :disabled="props.disabled"
  >
    <slot />
  </Button>
</template>
