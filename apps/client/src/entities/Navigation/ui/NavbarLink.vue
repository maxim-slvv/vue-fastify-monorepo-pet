<script setup lang="ts">
import { ref } from 'vue'
import Typography from '@/shared/ui/Typography/Typography.vue'

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
      backgroundColor: hover || active ? 'var(--bg-hover)' : 'var(--bg-surface)',
    }"
  >
    <i :class="[icon]" :style="{ color: active ? 'var(--color-blue)' : 'var(--color-gray)' }" />
    <Typography :color="active ? 'blue' : 'gray'" class="text-m-bold">
      {{ label }}
    </Typography>
    <i class="pi pi-angle-right text-gray-300 ml-auto" />
  </a>
</template>
