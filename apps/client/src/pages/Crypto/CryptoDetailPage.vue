<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCryptoTop } from '@/entities/Crypto/lib/useCryptoTop'
import CoinMainInfo from '@/entities/Crypto/ui/CoinMainInfo.vue'
import PriceCell from '@/entities/Crypto/ui/PriceCell.vue'
import PercentCell from '@/entities/Crypto/ui/PercentCell.vue'
import SparklineCell from '@/entities/Crypto/ui/SparklineCell.vue'
import FavoriteToggle from '@/entities/Crypto/ui/FavoriteToggle.vue'
import UiButton from '@/shared/ui/Button/Button.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'

defineComponent({ name: 'CryptoDetailPage' })

const route = useRoute()
const router = useRouter()

const symbol = computed(() => route.params.symbol as string)

const { rows, isLoading, toggleFavorite } = useCryptoTop()

const cryptoData = computed(() => {
  return rows.value.find((crypto) => crypto.symbol.toLowerCase() === symbol.value.toLowerCase())
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <UiButton variant="secondary" @click="goBack">
        <i class="pi pi-arrow-left"></i>
        <span>Назад</span>
      </UiButton>

      <UITypography variant="text-l-bold" class="text-fg"> Детали криптовалюты </UITypography>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-6">
      <UiSkeleton class="h-16 w-full" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UiSkeleton v-for="i in 6" :key="i" class="h-24 w-full" />
      </div>
      <UiSkeleton class="h-64 w-full" />
    </div>

    <!-- Crypto Not Found -->
    <div v-else-if="!cryptoData" class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <UITypography variant="text-l-bold" class="text-fg mb-2">
        Криптовалюта не найдена
      </UITypography>
      <UITypography variant="text-m" class="text-fg opacity-70">
        Криптовалюта с символом "{{ symbol.toUpperCase() }}" не найдена
      </UITypography>
    </div>

    <!-- Crypto Details -->
    <div v-else class="space-y-6">
      <!-- Main Info Card -->
      <div class="bg-surface-0 rounded-lg border border-surface-border p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <CoinMainInfo
              :name="cryptoData.name"
              :tagText="cryptoData.symbol"
              :image="cryptoData.image"
              size="lg"
              variant="inlineAvatarNameTextTag"
            />
            <div class="text-2xl font-bold text-fg">#{{ cryptoData.rank }}</div>
          </div>

          <FavoriteToggle
            :symbol="cryptoData.symbol"
            :isFavorite="cryptoData.isFavorite"
            :loading="isLoading"
            :onToggle="toggleFavorite"
          />
        </div>

        <!-- Price Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center md:text-left">
            <UITypography variant="text-s" class="text-fg opacity-70 mb-1">
              Текущая цена
            </UITypography>
            <PriceCell :value="cryptoData.price" class="text-2xl" />
          </div>

          <div class="text-center">
            <UITypography variant="text-s" class="text-fg opacity-70 mb-1">
              Изменение за 24ч
            </UITypography>
            <PercentCell
              :value="cryptoData.ch24h"
              :trend="cryptoData.ch24h_direction"
              class="text-xl"
            />
          </div>

          <div class="text-center md:text-right">
            <UITypography variant="text-s" class="text-fg opacity-70 mb-1">
              Изменение за 7д
            </UITypography>
            <PercentCell
              :value="cryptoData.ch7d"
              :trend="cryptoData.ch7d_direction"
              class="text-xl"
            />
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Market Stats -->
        <div class="bg-surface-0 rounded-lg border border-surface-border p-6">
          <UITypography variant="text-l-bold" class="text-fg mb-4">
            Рыночная статистика
          </UITypography>

          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <UITypography variant="text-m" class="text-fg opacity-70">
                Рыночная капитализация
              </UITypography>
              <UITypography variant="text-m-bold" class="text-fg">
                {{ cryptoData.marketCap }}
              </UITypography>
            </div>

            <div class="flex justify-between items-center">
              <UITypography variant="text-m" class="text-fg opacity-70">
                Объем торгов (24ч)
              </UITypography>
              <UITypography variant="text-m-bold" class="text-fg">
                {{ cryptoData.volume24h }}
              </UITypography>
            </div>

            <div class="flex justify-between items-center">
              <UITypography variant="text-m" class="text-fg opacity-70"> Рейтинг </UITypography>
              <UITypography variant="text-m-bold" class="text-fg">
                #{{ cryptoData.rank }}
              </UITypography>
            </div>
          </div>
        </div>

        <!-- Price Chart -->
        <div class="bg-surface-0 rounded-lg border border-surface-border p-6">
          <UITypography variant="text-l-bold" class="text-fg mb-4">
            График цены (7 дней)
          </UITypography>

          <div class="flex justify-center items-center h-32">
            <SparklineCell
              :data="cryptoData.spark"
              :direction="cryptoData.ch7d_direction"
              :percent="cryptoData.ch7d"
              :width="300"
              :height="120"
            />
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="bg-surface-0 rounded-lg border border-surface-border p-6">
        <UITypography variant="text-l-bold" class="text-fg mb-4">
          Дополнительная информация
        </UITypography>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <UITypography variant="text-s" class="text-fg opacity-70 mb-1"> Символ </UITypography>
            <UITypography variant="text-m-bold" class="text-fg">
              {{ cryptoData.symbol }}
            </UITypography>
          </div>

          <div>
            <UITypography variant="text-s" class="text-fg opacity-70 mb-1">
              Полное название
            </UITypography>
            <UITypography variant="text-m-bold" class="text-fg">
              {{ cryptoData.name }}
            </UITypography>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
