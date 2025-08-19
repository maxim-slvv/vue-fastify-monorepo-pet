<script setup lang="ts">
import { ref } from 'vue'

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
      backgroundColor: hover ? 'var(--bg-hover)' : 'var(--bg-surface)',
    }"
  >
    <i :class="[icon, active ? 'text-blue-600' : 'text-gray-400']" class="text-xl" />
    <span :class="active ? 'text-blue-700 font-semibold' : 'text-gray-600 font-medium'">
      {{ label }}
    </span>
    <i class="pi pi-angle-right text-gray-300 ml-auto" />
  </a>
</template>
