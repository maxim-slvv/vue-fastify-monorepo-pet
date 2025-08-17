<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'AppAside',
})
</script>
<template>
  <div
    class="w-100"
    :style="{
      backgroundColor: 'var(--surface)',
      borderLeft: '1px solid var(--border)',
      color: 'var(--fg)',
    }"
  >
    <div class="p-4">
      <h2 class="text-lg font-medium">Courses</h2>
      <p class="text-sm text-gray-500">Current courses</p>
    </div>
  </div>
</template>
