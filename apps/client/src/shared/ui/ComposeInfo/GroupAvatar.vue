<script setup lang="ts">
import { computed } from 'vue'
import Avatar from './ui/Avatar.vue'

defineOptions({ name: 'GroupAvatar' })

interface UserAvatar {
  image?: string
  outerUrlImage?: string
  label?: string
  alt?: string
}

const props = withDefaults(
  defineProps<{
    users: UserAvatar[]
    maxVisible?: number
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
  }>(),
  {
    maxVisible: 3,
    size: 'sm',
    loading: false,
  },
)

const visibleUsers = computed(() => {
  if (props.users.length <= props.maxVisible) {
    return props.users
  }

  const visible = props.users.slice(0, props.maxVisible - 1)
  const remaining = props.users.length - visible.length

  return [...visible, { label: `+${remaining}` }]
})
</script>

<template>
  <div class="flex items-center ml-2">
    <template v-for="(user, index) in visibleUsers" :key="index">
      <!-- Аватар с картинкой -->
      <div
        v-if="user.image || user.outerUrlImage"
        :class="{ '-ml-2': index > 0 }"
        class="relative border-2 rounded-full"
        :style="{ borderColor: 'var(--surface)' }"
      >
        <Avatar
          :image="user.image"
          :outer-url-image="user.outerUrlImage"
          :alt="user.alt"
          :size="props.size"
          :loading="props.loading"
        />
      </div>
      <!-- Аватар-счетчик -->
      <div
        v-else-if="user.label?.startsWith('+')"
        :class="[
          'flex items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-medium relative border-2',
          {
            'w-5 h-5': props.size === 'sm',
            'w-8 h-8': props.size === 'md',
            'w-10 h-10': props.size === 'lg',
            '-ml-2': index > 0,
          },
        ]"
        :style="{ borderColor: 'var(--surface)' }"
      >
        {{ user.label }}
      </div>
    </template>
  </div>
</template>
