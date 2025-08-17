<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from '@/shared/lib/theme/useTheme'

const { setDark, init } = useTheme()
const dark = ref(false)

onMounted(() => {
  init()
  dark.value = document.documentElement.classList.contains('dark')
})
</script>

<template>
  <div class="flex items-center gap-3">
    <label class="flex items-center gap-2 text-sm">
      <input type="checkbox" v-model="dark" @change="setDark(dark)" />
      Dark
    </label>
  </div>
</template>
