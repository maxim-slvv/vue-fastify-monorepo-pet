<script setup lang="ts">
import { ref } from 'vue'
import Popover, { type PopoverMethods } from 'primevue/popover'

defineOptions({ name: 'UiPopover' })

const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    align?: 'center' | 'left' | 'right' | 'top' | 'bottom'
  }>(),
  { width: 500, height: 300, align: 'center' },
)

const op = ref<PopoverMethods | null>(null)
const hoveringOverlay = ref(false)

function onEnter(event: MouseEvent): void {
  op.value?.show(event)
}

function onLeave(): void {
  setTimeout(() => {
    if (!hoveringOverlay.value) op.value?.hide()
  }, 120)
}
</script>

<template>
  <span @mouseenter="onEnter" @mouseleave="onLeave">
    <slot />
  </span>

  <Popover
    ref="op"
    @mouseenter="hoveringOverlay = true"
    @mouseleave="((hoveringOverlay = false), onLeave())"
    :pt="{
      content: {
        style: {
          padding: '0',
          width: `${props.width}px`,
          height: `${props.height}px`,
        },
      },
    }"
  >
    <slot name="popover" />
  </Popover>
</template>
