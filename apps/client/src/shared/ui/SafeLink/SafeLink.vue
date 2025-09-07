<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/shared/lib/tailwind/cn'

defineOptions({ name: 'SafeLink' })

const props = withDefaults(
  defineProps<{
    href?: string
    sameTab?: boolean
    class?: string
  }>(),
  { sameTab: false },
)

const isTelLink = computed(() => props.href?.startsWith('tel:') ?? false)
const target = computed(() => (isTelLink.value || props.sameTab ? undefined : '_blank'))
const rel = computed(() => (isTelLink.value || props.sameTab ? undefined : 'noopener noreferrer'))
</script>

<template>
  <a
    :href="props.href"
    :target="target"
    :rel="rel"
    :class="cn('hover:underline w-fit cursor-pointer', props.class)"
  >
    <slot />
  </a>
</template>
