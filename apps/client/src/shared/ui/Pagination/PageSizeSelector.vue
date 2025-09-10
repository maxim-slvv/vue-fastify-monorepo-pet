<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { computed } from 'vue'
import { PAGE_SIZE_OPTIONS } from '@/shared/lib/pagination'

defineOptions({ name: 'PageSizeSelector' })

interface Props {
  modelValue: number
  options?: number[]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => PAGE_SIZE_OPTIONS,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const dropdownOptions = computed(() =>
  props.options.map((value) => ({
    label: `${value} записей`,
    value,
  })),
)

const selectedValue = computed({
  get: () => ({
    label: `${props.modelValue} записей`,
    value: props.modelValue,
  }),
  set: (option) => {
    if (option?.value && option.value !== props.modelValue) {
      emit('update:modelValue', option.value)
    }
  },
})
</script>

<template>
  <Dropdown
    v-model="selectedValue"
    :options="dropdownOptions"
    option-label="label"
    :disabled="disabled"
    class="page-size-selector"
    :pt="{
      root: {
        class: 'page-size-selector__root',
      },
      input: {
        class: 'page-size-selector__input',
      },
      trigger: {
        class: 'page-size-selector__trigger',
      },
      panel: {
        class: 'page-size-selector__panel',
      },
      list: {
        class: 'page-size-selector__list',
      },
      item: {
        class: 'page-size-selector__item',
      },
    }"
  />
</template>
