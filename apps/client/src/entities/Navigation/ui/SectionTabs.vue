<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, type RouteRecordNormalized } from 'vue-router'
import Subnav from '@/entities/Navigation/ui/Subnav.vue'

defineOptions({ name: 'SectionTabs' })

type NavMeta = { nav?: { group?: string; label?: string; icon?: string } }
type GroupMeta = { tabsGroup?: string }

const route = useRoute()
const router = useRouter()

const currentGroup = computed<string | null>(() => {
  const match = route.matched
    .slice()
    .reverse()
    .find((r) => (r.meta as GroupMeta).tabsGroup)
  return (match?.meta as GroupMeta)?.tabsGroup ?? null
})

const tabRoutes = computed<RouteRecordNormalized[]>(() => {
  const group = currentGroup.value
  if (!group) return []
  return router.getRoutes().filter((r) => (r.meta as NavMeta).nav?.group === group)
})

const items = computed(() =>
  tabRoutes.value.map((r) => ({
    key: r.name as string,
    label: (r.meta as NavMeta).nav?.label as string,
    icon: (r.meta as NavMeta).nav?.icon as string,
  })),
)

const active = computed({
  get: () => (route.name as string) ?? '',
  set: (name: string) => router.push({ name }),
})
</script>

<template>
  <div v-if="currentGroup && items.length" class="p-4">
    <Subnav v-model="active" :items="items" />
  </div>
  <slot />
</template>
