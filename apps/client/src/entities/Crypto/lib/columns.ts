import type { Ref } from 'vue'
import type { ColumnDef } from '@/shared/ui/DataTable/BaseDataTable.vue'
import type { CryptoTableRow } from '@/entities/Crypto/types'
import CoinMainInfo from '@/entities/Crypto/ui/CoinMainInfo.vue'
import PriceCell from '@/entities/Crypto/ui/PriceCell.vue'
import PercentCell from '@/entities/Crypto/ui/PercentCell.vue'
import SparkPopoverCell from '@/entities/Crypto/ui/SparkPopoverCell.vue'

export function createCryptoColumns(isLoading: Ref<boolean>): ColumnDef<CryptoTableRow>[] {
  return [
    {
      field: 'rank',
      header: '#',
      align: 'center',
      width: '56px',
      bodyClass: 'text-gray-500 font-medium',
    },
    {
      field: 'name',
      header: 'Name',
      width: '220px',
      component: CoinMainInfo,
      componentProps: (row) => ({
        name: row.name,
        symbol: row.symbol,
        image: row.image,
        size: 'sm',
        variant: 'inlineWithCoinTag',
        loading: isLoading.value,
      }),
    },
    {
      field: 'price',
      header: 'Price',
      align: 'right',
      width: '120px',
      component: PriceCell,
      componentProps: (row) => ({ value: row.price, loading: isLoading.value }),
    },
    {
      field: 'ch24h',
      header: '24h %',
      align: 'right',
      width: '96px',
      component: PercentCell,
      componentProps: (row) => ({
        value: row.ch24h,
        trend: row.ch24h_direction,
        loading: isLoading.value,
      }),
    },
    {
      field: 'ch7d',
      header: '7d %',
      align: 'right',
      width: '96px',
      component: PercentCell,
      componentProps: (row) => ({
        value: row.ch7d,
        trend: row.ch7d_direction,
        loading: isLoading.value,
      }),
    },
    {
      field: 'marketCap',
      header: 'Market Cap',
      align: 'right',
      width: '180px',
      skeletonClass: 'h-5 w-full',
    },
    {
      field: 'volume24h',
      header: 'Volume(24h)',
      align: 'right',
      width: '180px',
      skeletonClass: 'h-5 w-full',
    },
    {
      field: 'spark',
      header: 'Last 7 Days',
      align: 'right',
      width: '140px',
      component: SparkPopoverCell,
      componentProps: (row) => ({ row, loading: isLoading.value, width: 140, height: 32 }),
    },
  ]
}
