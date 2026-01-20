<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue'
import {
  createChart,
  LineSeries,
  type IChartApi,
  type ISeriesApi,
  type LineData,
  type Time,
} from 'lightweight-charts'

defineOptions({ name: 'TradingChart' })

const props = withDefaults(
  defineProps<{
    points?: number[]
    timestamps?: number[]
    lineColor?: string
    backgroundColor?: string
    textColor?: string
  }>(),
  {
    lineColor: '#2962FF',
    backgroundColor: 'transparent',
    textColor: '#999',
  },
)

const chartContainer = ref<HTMLDivElement | null>(null)
const isChartReady = ref(false)
let chart: IChartApi | null = null
let lineSeries: ISeriesApi<'Line'> | null = null

const hasData = computed(() => {
  return props.points && props.timestamps && props.points.length > 0 && props.timestamps.length > 0
})

function formatData(): LineData<Time>[] {
  if (!props.points || !props.timestamps || !props.timestamps[0]) return []
  if (props.points.length !== props.timestamps.length) return []

  return props.points.map((value, index) => ({
    time: (props.timestamps?.[index] ?? 0 / 1000) as Time,
    value,
  }))
}

function initChart() {
  if (!chartContainer.value) return
  if (chart) return

  const container = chartContainer.value
  const rect = container.getBoundingClientRect()
  const width = rect.width || 800
  const height = rect.height || 400

  chart = createChart(container, {
    width,
    height,
    layout: {
      background: { color: props.backgroundColor },
      textColor: props.textColor,
      fontFamily: "'Inter', sans-serif",
    },
    grid: {
      vertLines: { color: 'rgba(197, 203, 206, 0.1)' },
      horzLines: { color: 'rgba(197, 203, 206, 0.1)' },
    },
    rightPriceScale: {
      borderColor: 'rgba(197, 203, 206, 0.3)',
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    },
    timeScale: {
      borderColor: 'rgba(197, 203, 206, 0.3)',
      timeVisible: true,
      secondsVisible: false,
    },
    crosshair: {
      mode: 1,
      vertLine: {
        color: 'rgba(197, 203, 206, 0.5)',
        width: 1,
        style: 2,
        labelBackgroundColor: '#2962FF',
      },
      horzLine: {
        color: 'rgba(197, 203, 206, 0.5)',
        width: 1,
        style: 2,
        labelBackgroundColor: '#2962FF',
      },
    },
    handleScroll: {
      mouseWheel: true,
      pressedMouseMove: true,
      horzTouchDrag: true,
      vertTouchDrag: false,
    },
    handleScale: {
      axisPressedMouseMove: true,
      mouseWheel: true,
      pinch: true,
    },
  })

  lineSeries = chart.addSeries(LineSeries, {
    color: props.lineColor,
    lineWidth: 2,
    crosshairMarkerVisible: true,
    crosshairMarkerRadius: 4,
    crosshairMarkerBorderColor: props.lineColor,
    crosshairMarkerBackgroundColor: '#ffffff',
    lastValueVisible: true,
    priceLineVisible: true,
    priceLineWidth: 1,
    priceLineColor: props.lineColor,
    priceLineStyle: 2,
  })

  isChartReady.value = true
  updateData()
}

function updateData() {
  if (!lineSeries) return
  const data = formatData()
  if (data.length > 0) {
    lineSeries.setData(data)
    chart?.timeScale().fitContent()
  }
}

function handleResize() {
  if (chart && chartContainer.value) {
    const rect = chartContainer.value.getBoundingClientRect()
    chart.applyOptions({
      width: rect.width,
      height: rect.height,
    })
  }
}

watch(
  () => props.lineColor,
  (newColor) => {
    if (lineSeries && newColor) {
      lineSeries.applyOptions({
        color: newColor,
        priceLineColor: newColor,
        crosshairMarkerBorderColor: newColor,
      })
    }
  },
)

watch(
  hasData,
  async (dataAvailable) => {
    if (dataAvailable) {
      await nextTick()
      if (!chart) {
        initChart()
      } else {
        updateData()
      }
    }
  },
  { immediate: true },
)

watch(
  () => [props.points, props.timestamps],
  () => {
    if (chart && hasData.value) {
      updateData()
    }
  },
  { deep: true },
)

onMounted(async () => {
  await nextTick()
  if (hasData.value && !chart) {
    initChart()
  }
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (chart) {
    chart.remove()
    chart = null
    lineSeries = null
  }
})
</script>

<template>
  <div class="relative w-full h-full min-h-[300px]">
    <div
      v-show="!isChartReady"
      class="absolute inset-0 flex items-center justify-center text-gray-500"
    >
      Loading chart...
    </div>
    <div ref="chartContainer" class="w-full h-full" />
  </div>
</template>
