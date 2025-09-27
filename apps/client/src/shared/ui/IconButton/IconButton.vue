<script setup lang="ts">
defineOptions({
  name: 'IconButton',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    variant?: 'default' | 'ghost' | 'outline'
    class?: string
  }>(),
  {
    size: 'md',
    disabled: false,
    variant: 'default',
  },
)

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

const variantClasses = {
  default: 'hover:bg-black/5',
  ghost: 'hover:bg-black/3',
  outline: 'border border-gray-300 hover:bg-black/5',
}
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="props.disabled"
    :class="[
      'inline-flex items-center justify-center rounded-full transition-all duration-200',
      sizeClasses[props.size],
      variantClasses[props.variant],
      {
        'opacity-50 cursor-not-allowed': props.disabled,
        'cursor-pointer': !props.disabled,
      },
      props.class,
    ]"
    style="background-color: transparent"
    @mouseenter="
      ($event.target as HTMLElement)?.style &&
      (($event.target as HTMLElement).style.backgroundColor = 'rgba(220,220,220,0.1)')
    "
    @mouseleave="
      ($event.target as HTMLElement)?.style &&
      (($event.target as HTMLElement).style.backgroundColor = 'transparent')
    "
  >
    <slot />
  </button>
</template>
