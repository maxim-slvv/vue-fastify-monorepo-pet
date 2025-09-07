<script setup lang="ts">
import { ref } from 'vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'

defineOptions({ name: 'NavbarLink' })

const { label, icon, active } = defineProps<{
  label: string
  icon: string
  active?: boolean
}>()

const emit = defineEmits<{ (e: 'select'): void }>()
const hover = ref(false)
</script>

<template>
  <a
    href="#"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click.prevent="emit('select')"
    class="flex items-center gap-3 px-4 py-3 rounded-lg"
    :style="{
      backgroundColor: hover || active ? 'var(--brand-primary-soft)' : 'var(--surface)',
    }"
  >
    <i :class="[icon]" :style="{ color: 'var(--nav-link-fg)' }" />
    <UITypography variant="text-m-bold" :style="{ color: 'var(--nav-link-fg)' }">
      {{ label }}
    </UITypography>
    <i class="pi pi-angle-right text-gray-300 ml-auto" />
  </a>
</template>
