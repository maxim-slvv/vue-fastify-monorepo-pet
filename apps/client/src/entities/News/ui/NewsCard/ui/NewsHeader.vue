<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { NewsRow } from '@/entities/News/types'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import { formatDate } from '@/shared/utils'
import UiPicture from '@/shared/ui/Picture/UiPicture.vue'
import ComposeAvatarInfo from '@/shared/ui/ComposeInfo/ComposeAvatarInfo.vue'

const props = defineProps<{ row: NewsRow }>()

const dateText = computed(() => formatDate(props.row.publishedAt))
</script>

<template>
  <div class="flex items-center justify-between px-3 py-2">
    <div class="flex items-center gap-2">
      <ComposeAvatarInfo
        variant="inlineAvatarName"
        :avatar="props.row.sourceAvatar"
        :name="props.row.source"
        size="sm"
        class="cursor-pointer"
      />
      <div class="flex items-center gap-1">
        <UiPicture
          v-if="props.row.verified"
          src="/cdn/svg/VERIFIED.svg"
          width="0.875rem"
          height="0.875rem"
          alt="Verified"
          fit="contain"
          class="inline-block select-none"
        />
        <UITypography
          variant="text-xs"
          v-if="props.row.source && dateText"
          color="gray"
          class="select-none"
        >
          ·
        </UITypography>
        <UITypography tag="span" variant="text-xs" color="gray" v-if="dateText">{{
          dateText
        }}</UITypography>
      </div>
    </div>
    <div class="ml-auto inline-flex items-center h-4 w-4 justify-center cursor-pointer select-none">
      <UITypography variant="text-xs" color="gray">···</UITypography>
    </div>
  </div>
</template>
