<script setup lang="ts">
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
</script>

<template>
  <div class="rounded-lg border bg-card shadow-sm" :style="{ borderColor: 'var(--border)' }">
    <!-- Header -->
    <div class="flex items-center justify-between px-3 py-2">
      <div class="flex items-center gap-2">
        <UiSkeleton class="h-6 w-6" rounded="full" />
        <UiSkeleton class="h-3 w-24" />
        <UiSkeleton class="h-3 w-14" />
      </div>
      <UiSkeleton class="h-4 w-4" rounded="full" />
    </div>

    <!-- Body -->
    <div class="px-3 pb-3">
      <UiSkeleton class="w-full h-40 mb-2" />
      <UiSkeleton class="h-6 w-3/4" />
      <div class="mt-2 flex items-center gap-3">
        <UiSkeleton class="h-5 w-12 rounded-full" />
        <UiSkeleton class="h-5 w-12 rounded-full" />
        <UiSkeleton class="h-5 w-12 rounded-full" />
      </div>
      <div class="mt-3 flex items-center gap-5">
        <UiSkeleton class="h-4 w-10" />
        <UiSkeleton class="h-4 w-6" />
        <UiSkeleton class="h-4 w-6" />
        <UiSkeleton class="h-4 w-6" />
      </div>
    </div>
  </div>
</template>
