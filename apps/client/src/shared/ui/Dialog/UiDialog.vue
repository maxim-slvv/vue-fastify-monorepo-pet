<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import { blockLayoutStyles } from '@/shared/styles/in-js-styles'

defineOptions({ name: 'UiDialog' })

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    header?: string
    width?: string
    height?: string
    maximizable?: boolean
    modal?: boolean
    border?: 'all' | 'bottom' | 'right' | 'left' | 'top'
  }>(),
  { width: '90vw', height: '70vh', maximizable: true, modal: true },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const visibleProxy = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const contentStyle = computed(() => ({
  height: props.height,
  ...blockLayoutStyles({ border: props.border }),
}))

const pt = computed(() => ({
  root: {
    style: {
      backgroundColor: 'var(--surface)',
      color: 'var(--fg)',
      border: '1px solid var(--border)',
      borderRadius: '0px',
    },
  },
  header: {
    style: {
      backgroundColor: 'var(--surface)',
      color: 'var(--fg)',
      borderBottom: '1px solid var(--border)',
    },
  },
  content: {
    style: {
      backgroundColor: 'var(--surface)',
      color: 'var(--fg)',
      padding: '0px',
    },
  },
  footer: {
    style: {
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border)',
    },
  },
  mask: {
    style: {
      backgroundColor: 'rgba(0,0,0,0.55)',
    },
  },
}))
</script>

<template>
  <Dialog
    v-model:visible="visibleProxy"
    :header="props.header"
    :style="{ width: props.width }"
    :maximizable="props.maximizable"
    :modal="props.modal"
    :contentStyle="contentStyle"
    :pt="pt"
  >
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>
    <slot />
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </Dialog>
</template>
