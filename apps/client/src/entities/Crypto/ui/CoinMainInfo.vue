<script setup lang="ts">
import ComposeAvatarInfo, {
  type IComposeAvatarInfoProps,
} from '@/shared/ui/ComposeInfo/ComposeAvatarInfo.vue'

defineOptions({ name: 'CoinMainInfoEntity' })

const props = withDefaults(
  defineProps<Omit<IComposeAvatarInfoProps, 'avatar'> & { image?: string }>(),
  {
    size: 'md',
    variant: 'inlineAvatarNameTextTag',
  },
)
</script>

<template>
  <ComposeAvatarInfo v-bind="{ ...props, avatar: props.image }" />
</template>
