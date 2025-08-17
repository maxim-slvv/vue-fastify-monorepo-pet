<script setup lang="ts">
defineOptions({ name: 'NavbarLink' })

const { label, icon, active } = defineProps<{
  label: string
  icon: string
  active?: boolean
}>()

const emit = defineEmits<{ (e: 'select'): void }>()
</script>

<template>
  <a
    href="#"
    @click.prevent="emit('select')"
    class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100"
  >
    <i :class="[icon, active ? 'text-blue-600' : 'text-gray-400']" class="text-xl" />
    <span :class="active ? 'text-blue-700 font-semibold' : 'text-gray-600 font-medium'">
      {{ label }}
    </span>
    <i class="pi pi-angle-right text-gray-300 ml-auto" />
  </a>
</template>
