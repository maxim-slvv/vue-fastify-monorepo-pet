<script setup lang="ts">
import { defineComponent } from 'vue'
import LayoutBlock from '@/shared/ui/Block/LayoutBlock.vue'
import { useNewsBrief } from '@/entities/News/lib/useNewsBrief'
import NewsCard from '@/entities/News/ui/NewsCard/NewsCard.vue'
import NewsCardSkeleton from '@/entities/News/ui/NewsCard/NewsCardSkeleton.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'

defineComponent({ name: 'AppAside' })

const { rows: news, isLoading: loading } = useNewsBrief()
</script>
<template>
  <LayoutBlock border="left" class="w-100 shrink-0 overflow-y-auto">
    <div class="p-4 flex flex-col gap-3">
      <UITypography variant="text-m-bold">News</UITypography>

      <template v-if="loading">
        <div class="flex flex-col gap-2">
          <NewsCardSkeleton v-for="i in 3" :key="i" />
        </div>
      </template>

      <div v-else class="flex flex-col gap-2">
        <NewsCard v-for="item in news" :key="item.id ?? item.url" :row="item" />
      </div>
    </div>
  </LayoutBlock>
</template>
