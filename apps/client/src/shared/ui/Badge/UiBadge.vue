<script setup lang="ts">
import { computed } from 'vue'
import Badge from 'primevue/badge'
import OverlayBadge from 'primevue/overlaybadge'
import type { BadgeProps } from 'primevue/badge'

defineOptions({ name: 'UiBadge' })

export interface IUiBadgeProps extends BadgeProps {
  dot?: boolean
  overlay?: boolean
}

const props = withDefaults(defineProps<IUiBadgeProps>(), {
  dot: false,
  overlay: false,
})

const badgeProps = computed(() => {
  if (props.dot) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dot, overlay, value, ...rest } = props
    return rest
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dot, overlay, ...rest } = props
  return rest
})

const BadgeComponent = computed(() => (props.overlay ? OverlayBadge : Badge))
</script>

<template>
  <component class="mt-2" :is="BadgeComponent" v-bind="badgeProps">
    <slot />
  </component>
</template>
