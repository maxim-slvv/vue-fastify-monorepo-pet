<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/tailwind/cn'

import Avatar from '@/shared/ui/ComposeInfo/ui/Avatar.vue'
import Name from '@/shared/ui/ComposeInfo/ui/Name.vue'
import TagText from '@/shared/ui/ComposeInfo/ui/TagText.vue'

defineOptions({ name: 'ComposeAvatarInfo' })

export type ComposeAvatarInfoVariant =
  | 'inlineAvatarName'
  | 'inlineAvatarNameTextTag'
  | 'stackedAvatarNameTextTag'

export interface IComposeAvatarInfoProps {
  avatar?: string
  icon?: string
  name?: string
  tagText?: string
  // --------------------------------
  size?: 'sm' | 'md' | 'lg'
  variant?: ComposeAvatarInfoVariant
  class?: string
  loading?: boolean
}

const props = withDefaults(defineProps<IComposeAvatarInfoProps>(), {
  size: 'md',
  variant: 'inlineAvatarName',
})

const wrapper = cva('min-w-0', {
  variants: {
    variant: {
      inlineAvatarName: 'flex items-center gap-2',
      inlineAvatarNameTextTag: 'flex items-center gap-3',
      stackedAvatarNameTextTag: 'flex items-start gap-3',
    },
  },
  defaultVariants: { variant: 'inlineAvatarName' },
})
</script>

<template>
  <div :class="cn(wrapper({ variant: props.variant }), props.class)">
    <div v-if="props.variant === 'inlineAvatarNameTextTag'" class="min-w-0 flex items-center gap-2">
      <Avatar :image="props.avatar" :alt="props.name" :size="props.size" :loading="props.loading" />
      <Name :text="props.name" :loading="props.loading" :truncate="true" />
      <TagText :text="props.tagText" :loading="props.loading" />
    </div>

    <div v-else-if="props.variant === 'inlineAvatarName'" class="min-w-0 flex items-center gap-2">
      <Avatar :image="props.avatar" :alt="props.name" :size="props.size" :loading="props.loading" />
      <Name class="mb-[3px]" :text="props.name" :loading="props.loading" :truncate="true" />
    </div>

    <div
      v-else-if="props.variant === 'stackedAvatarNameTextTag'"
      class="min-w-0 flex flex-col gap-2"
    >
      <Avatar :image="props.avatar" :alt="props.name" :size="props.size" :loading="props.loading" />
      <Name :text="props.name" :loading="props.loading" :truncate="true" />
      <TagText :text="props.tagText" :loading="props.loading" />
    </div>
  </div>
</template>
