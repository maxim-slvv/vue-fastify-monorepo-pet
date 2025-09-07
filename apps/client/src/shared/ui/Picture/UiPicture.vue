<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watchEffect } from 'vue'
import { API_URL } from '@/shared/config/api'

type Fit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

const props = defineProps<{
  src?: string
  width?: string
  height?: string
  rounded?: string
  fit?: Fit
  alt?: string
  class?: string
}>()

defineEmits<{ (e: 'load'): void; (e: 'error'): void }>()

const resolvedSrc = computed(() => {
  if (!props.src) return undefined
  if (/^https?:/i.test(props.src)) return props.src
  return `${API_URL}${props.src.startsWith('/') ? '' : '/'}${props.src}`
})

const isLoading = ref(false)
const isError = ref(false)

watchEffect(() => {
  isError.value = false
  if (!resolvedSrc.value) return
  isLoading.value = true
  const img = new Image()
  img.onload = () => {
    isLoading.value = false
  }
  img.onerror = () => {
    isLoading.value = false
    isError.value = true
  }
  img.src = resolvedSrc.value
})

const wrapperStyle = computed(() => ({
  width: props.width ?? undefined,
  height: props.height ?? undefined,
}))

const radiusClass = computed(() => props.rounded ?? '')
const objectFit = computed(() => props.fit ?? 'cover')
</script>

<template>
  <div :class="['relative overflow-hidden', radiusClass, props.class]" :style="wrapperStyle">
    <div v-if="isLoading" class="absolute inset-0 bg-gray-200 animate-pulse" />
    <img
      v-else-if="!isError && resolvedSrc"
      :src="resolvedSrc"
      :alt="props.alt ?? ''"
      :style="{ objectFit }"
      class="w-full h-full"
    />
    <div v-else class="w-full h-full bg-gray-300" />
  </div>
</template>
