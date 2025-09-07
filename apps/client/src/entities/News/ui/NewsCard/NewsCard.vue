<script setup lang="ts">
import { defineProps } from 'vue'
import type { NewsRow } from '@/entities/News/types'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import SafeLink from '@/shared/ui/SafeLink/SafeLink.vue'
import NewsHeader from './ui/NewsHeader.vue'
import NewsImage from './ui/NewsImage.vue'
import NewsReactions from './ui/NewsReactions.vue'
import NewsToolbar from './ui/NewsToolbar.vue'

const props = defineProps<{ row: NewsRow }>()
</script>

<template>
  <div class="rounded-lg border bg-card shadow-sm" :style="{ borderColor: 'var(--border)' }">
    <NewsHeader :row="props.row" />

    <div class="px-3 pb-3">
      <NewsImage v-if="props.row.image" :src="props.row.image" class="mb-2" />

      <SafeLink :href="props.row.url" class="block">
        <UITypography variant="text-s" tag="p" class="hover:underline">{{
          props.row.title
        }}</UITypography>
      </SafeLink>

      <NewsReactions :reactions="props.row.reactions" class="mt-2" />
      <NewsToolbar :toolbar="props.row.toolbar" class="mt-2" />
    </div>
  </div>
</template>
