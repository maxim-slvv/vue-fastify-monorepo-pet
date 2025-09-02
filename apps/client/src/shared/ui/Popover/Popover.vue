<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Popover, { type PopoverMethods } from 'primevue/popover'

defineOptions({ name: 'UiPopover' })

const props = withDefaults(
  defineProps<{
    width?: number
    height?: number
    freezeContent?: boolean
  }>(),
  { width: 500, height: 300, freezeContent: true },
)

const op = ref<PopoverMethods | null>(null)
const hoveringOverlay = ref(false)
const hoveringTrigger = ref(false)
const isVisible = ref(false)
const triggerElement = ref<HTMLElement | null>(null)

function onEnter(event: MouseEvent): void {
  hoveringTrigger.value = true
  isVisible.value = true
  triggerElement.value = event.currentTarget as HTMLElement
  op.value?.show(event)
}

function onLeave(): void {
  hoveringTrigger.value = false
  setTimeout(() => {
    if (!hoveringOverlay.value && !hoveringTrigger.value) {
      isVisible.value = false
      op.value?.hide()
    }
  }, 50)
}

function handleGlobalMouseMove(event: MouseEvent): void {
  if (!isVisible.value || !triggerElement.value) return

  const triggerRect = triggerElement.value.getBoundingClientRect()
  const popoverElement = document.querySelector('.p-popover') as HTMLElement

  if (!popoverElement) return

  const popoverRect = popoverElement.getBoundingClientRect()
  const mouseX = event.clientX
  const mouseY = event.clientY

  const overTrigger =
    mouseX >= triggerRect.left &&
    mouseX <= triggerRect.right &&
    mouseY >= triggerRect.top &&
    mouseY <= triggerRect.bottom
  const overPopover =
    mouseX >= popoverRect.left &&
    mouseX <= popoverRect.right &&
    mouseY >= popoverRect.top &&
    mouseY <= popoverRect.bottom

  if (!overTrigger && !overPopover) {
    isVisible.value = false
    hoveringTrigger.value = false
    hoveringOverlay.value = false
    op.value?.hide()
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleGlobalMouseMove)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleGlobalMouseMove)
})
</script>

<template>
  <span @mouseenter="onEnter" @mouseleave="onLeave">
    <slot />
  </span>

  <Popover
    ref="op"
    @mouseenter="hoveringOverlay = true"
    @mouseleave="((hoveringOverlay = false), onLeave())"
    style="margin-left: -520px"
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
    <template v-if="!props.freezeContent || isVisible">
      <slot name="popover" />
    </template>
  </Popover>
</template>
