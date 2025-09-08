<script setup lang="ts">
import ComposeAvatarInfo, {
  type IComposeAvatarInfoProps,
} from '@/shared/ui/ComposeInfo/ComposeAvatarInfo.vue'

defineOptions({ name: 'CoinMainInfoEntity' })

export interface ICoinMainInfoProps extends Omit<IComposeAvatarInfoProps, 'avatar'> {
  image?: string
}

const props = withDefaults(defineProps<ICoinMainInfoProps>(), {
  size: 'md',
  variant: 'inlineAvatarNameTextTag',
})
</script>

<template>
  <ComposeAvatarInfo v-bind="{ ...props, avatar: props.image }" />
</template>
