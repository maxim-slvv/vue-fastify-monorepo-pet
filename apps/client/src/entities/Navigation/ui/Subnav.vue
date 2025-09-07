<script setup lang="ts">
import { ref } from 'vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'

defineOptions({ name: 'UiSubnav' })

type Item = { key: string; label: string; icon?: string }

const props = withDefaults(defineProps<{ items: Item[]; modelValue?: string }>(), {
  items: () => [],
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const hoveredKey = ref<string | null>(null)

function select(key: string): void {
  emit('update:modelValue', key)
}
</script>

<template>
  <div class="flex items-center gap-4">
    <template v-for="it in props.items" :key="it.key">
      <button
        type="button"
        @click="select(it.key)"
        @mouseenter="hoveredKey = it.key"
        @mouseleave="hoveredKey = null"
        class="px-3 py-1.5 rounded-md transition-colors"
        :style="{
          backgroundColor:
            hoveredKey === it.key || props.modelValue === it.key
              ? 'var(--brand-primary-soft)'
              : 'var(--surface)',
        }"
      >
        <i v-if="it.icon" :class="[it.icon, 'mr-2']" :style="{ color: 'var(--nav-link-fg)' }" />
        <UITypography
          variant="text-m-bold"
          withOutVariants
          :style="{ color: 'var(--nav-link-fg)' }"
        >
          {{ it.label }}
        </UITypography>
      </button>
    </template>
  </div>
</template>
