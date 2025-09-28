<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCryptoDetail } from '@/entities/Crypto/lib/useCryptoDetail'
import { formatApiError } from '@/shared/utils'
import { CRYPTO_TIME_DEFAULT } from '@/entities/Crypto/constants'
import type { CryptoTimePeriod } from '@/entities/Crypto/types'
import CoinMainInfo from '@/entities/Crypto/ui/CoinMainInfo.vue'
import PriceCell from '@/entities/Crypto/ui/PriceCell.vue'
import PercentCell from '@/entities/Crypto/ui/PercentCell.vue'
import SparklineCell from '@/entities/Crypto/ui/SparklineCell.vue'
import FavoriteToggle from '@/entities/Crypto/ui/FavoriteToggle.vue'
import TimePeriodButtons from '@/entities/Crypto/ui/TimePeriodButtons.vue'
import PriceMinMaxDisplay from '@/entities/Crypto/ui/PriceMinMaxDisplay.vue'
import InfoItem from '@/entities/Crypto/ui/InfoItem.vue'
import UiButton from '@/shared/ui/Button/Button.vue'
import UITypography from '@/shared/ui/Typography/UITypography.vue'
import UiSkeleton from '@/shared/ui/Skeleton/UiSkeleton.vue'
import ShareIcon from '@/entities/Crypto/ui/ShareIcon.vue'

defineComponent({ name: 'CryptoDetailPage' })

const route = useRoute()

const symbol = computed(() => route.params.symbol as string)
const period = computed(() => (route.query.period as CryptoTimePeriod) || CRYPTO_TIME_DEFAULT)

const { cryptoData, isLoading, error, toggleFavorite } = useCryptoDetail(symbol.value, period)

const safeData = computed(() => cryptoData.value!)

const openUrl = (url: string) => {
  window.open(url)
}
</script>

<template>
  <div class="px-4 pb-4">
    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-6">
      <UiSkeleton class="h-full w-full" />
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-12">
      <div class="text-6xl mb-4">❌</div>
      <UITypography variant="text-l-bold" class="text-fg mb-2">Ошибка загрузки: </UITypography>
      <UITypography variant="text-m" class="text-fg opacity-70">
        {{ formatApiError(error.response?.data || error) }}
      </UITypography>
    </div>

    <!-- Crypto Not Found -->
    <div v-else-if="!cryptoData && !isLoading" class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <UITypography variant="text-l-bold" class="text-fg mb-2">
        Криптовалюта не найдена
      </UITypography>
      <UITypography variant="text-m" class="text-fg opacity-70">
        Криптовалюта с символом "{{ symbol.toUpperCase() }}" не найдена
      </UITypography>
    </div>

    <!-- Crypto Details -->
    <div v-else-if="cryptoData" class="space-y-2">
      <section class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <CoinMainInfo
            :name="safeData.name"
            :tagText="safeData.symbol"
            :image="safeData.image"
            size="lg"
            variant="inlineAvatarNameTextTag"
          />
          <div class="flex items-center gap-2">
            <FavoriteToggle
              :symbol="safeData.symbol"
              :isFavorite="safeData.isFavorite"
              :loading="isLoading"
              :onToggle="toggleFavorite"
            />
            <ShareIcon :symbol="safeData.symbol" />
          </div>
        </div>
        <!-- Social Networks -->
        <section v-if="safeData.socialNetworks">
          <div class="flex gap-2 flex-wrap">
            <UiButton
              v-if="safeData.socialNetworks.twitter"
              variant="ghost"
              @click="openUrl(safeData.socialNetworks.twitter)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-twitter" />
            </UiButton>
            <UiButton
              v-if="safeData.socialNetworks.telegram"
              variant="ghost"
              @click="openUrl(safeData.socialNetworks.telegram)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-send" />
            </UiButton>
            <UiButton
              v-if="safeData.socialNetworks.discord"
              variant="ghost"
              @click="openUrl(safeData.socialNetworks.discord)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-discord" />
            </UiButton>
            <UiButton
              v-if="safeData.socialNetworks.reddit"
              variant="ghost"
              @click="openUrl(safeData.socialNetworks.reddit)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-reddit" />
            </UiButton>
          </div>
        </section>
      </section>

      <div class="flex justify-between">
        <PriceCell :value="safeData.price" variant="text-h2" />
      </div>

      <section class="flex items-center justify-between">
        <TimePeriodButtons />
        <PriceMinMaxDisplay :min="safeData.allTimeLow?.price" :max="safeData.allTimeHigh?.price" />
      </section>

      <div class="flex bg-blue-100 h-[470px] w-full">
        <SparklineCell
          :data="safeData.spark"
          :direction="safeData.ch7d_direction"
          :width="1200"
          :height="600"
        />
      </div>

      <div class="flex justify-between">
        <section v-if="safeData.socialNetworks">
          <div class="flex gap-2 flex-wrap">
            <UiButton
              v-if="safeData.site"
              variant="secondary"
              @click="openUrl(safeData.site)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-globe" />
              Official site
            </UiButton>
            <UiButton
              v-if="safeData.explorers?.[0]"
              variant="secondary"
              @click="openUrl(safeData.explorers[0].url)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-search" />
              {{ safeData.explorers[0].name }}
            </UiButton>
            <UiButton
              v-if="safeData.wallets?.[0]"
              variant="secondary"
              @click="openUrl(safeData.wallets[0].url)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-wallet" />
              {{ safeData.wallets[0].name }}
            </UiButton>
          </div>
        </section>
      </div>
      <section class="grid grid-cols-5 gap-4">
        <InfoItem label="Rank" :value="`#${safeData.rank}`" />
        <InfoItem label="Symbol" :value="safeData.symbol" />
        <InfoItem label="Name" :value="safeData.name" />
        <InfoItem label="Circulating Supply" :value="safeData.circulatingSupply" />
        <InfoItem label="Max Supply" :value="safeData.maxSupply" />

        <InfoItem label="24h Change">
          <PercentCell :value="safeData.ch24h" :trend="safeData.ch24h_direction" class="text-xl" />
        </InfoItem>
        <InfoItem label="7d Change">
          <PercentCell :value="safeData.ch7d" :trend="safeData.ch7d_direction" class="text-xl" />
        </InfoItem>
        <InfoItem label="Market Cap">
          <PriceCell :value="safeData.marketCap" class="text-2xl" />
        </InfoItem>
        <InfoItem label="24h Volume">
          <PriceCell :value="safeData.volume24h" class="text-2xl" />
        </InfoItem>

        <InfoItem label="FDV" :value="safeData.fdv" />
        <!-- <InfoItem label="Vol/Market Cap" :value="safeData.volMarketCapRatio" />
        <InfoItem label="Total Supply" :value="safeData.totalSupply" />
        <InfoItem label="Unlocked Market Cap" :value="safeData.unlockedMarketCap" />

        <InfoItem label="All Time High" v-if="safeData.allTimeHigh">
          <PriceCell :value="safeData.allTimeHigh.price" />
          <div class="text-xs text-gray-500">{{ formatDate(safeData.allTimeHigh.date) }}</div>
        </InfoItem>
        <InfoItem label="All Time Low" v-if="safeData.allTimeLow">
          <PriceCell :value="safeData.allTimeLow.price" />
          <div class="text-xs text-gray-500">{{ formatDate(safeData.allTimeLow.date) }}</div>
        </InfoItem> -->
      </section>
    </div>
  </div>
</template>
