import type { Ref } from 'vue'
import type { ColumnDef } from '@/shared/ui/DataTable/BaseDataTable.vue'
import type { ICryptoServerRow } from '@/entities/Crypto/types'
import CoinMainInfo, { ICoinMainInfoProps } from '@/entities/Crypto/ui/CoinMainInfo.vue'
import PriceCell, { IPriceCellProps } from '@/entities/Crypto/ui/PriceCell.vue'
import PercentCell, { IPercentCellProps } from '@/entities/Crypto/ui/PercentCell.vue'
import SparkPopoverCell, { ISparkPopoverCellProps } from '@/entities/Crypto/ui/SparkPopoverCell.vue'
import FavoriteToggle, { IFavoriteToggleProps } from '@/entities/Crypto/ui/FavoriteToggle.vue'

type ToggleFavoriteCallback = (symbol: string, isFavorite: boolean) => void

type TypedColumnDef<T> = Omit<ColumnDef<ICryptoServerRow>, 'componentProps'> & {
  componentProps: (row: ICryptoServerRow) => T
}

const createTypedColumns = (isLoading: Ref<boolean>, onToggleFavorite?: ToggleFavoriteCallback) => {
  const favoriteColumn: TypedColumnDef<IFavoriteToggleProps> = {
    field: 'isFavorite',
    header: '★',
    align: 'center',
    width: '36px',
    component: FavoriteToggle,
    componentProps: (row): IFavoriteToggleProps => ({
      symbol: row.symbol,
      isFavorite: row.isFavorite,
      loading: isLoading.value,
      onToggle: onToggleFavorite,
    }),
  }

  const nameColumn: TypedColumnDef<ICoinMainInfoProps> = {
    field: 'name',
    header: 'Name',
    width: '220px',
    component: CoinMainInfo,
    componentProps: (row): ICoinMainInfoProps => ({
      tagText: row.symbol,
      name: row.name,
      image: row.image,
      size: 'sm',
      variant: 'inlineAvatarNameTextTag',
      loading: isLoading.value,
    }),
  }

  const priceColumn: TypedColumnDef<IPriceCellProps> = {
    field: 'price',
    header: 'Price',
    align: 'right',
    width: '130px',
    component: PriceCell,
    componentProps: (row): IPriceCellProps => ({
      value: row.price,
      loading: isLoading.value,
    }),
  }

  const ch24hColumn: TypedColumnDef<IPercentCellProps> = {
    field: 'ch24h',
    header: '24h %',
    align: 'right',
    width: '120px',
    component: PercentCell,
    componentProps: (row): IPercentCellProps => ({
      value: row.ch24h,
      trend: row.ch24h_direction,
      loading: isLoading.value,
    }),
  }

  const ch7dColumn: TypedColumnDef<IPercentCellProps> = {
    field: 'ch7d',
    header: '7d %',
    align: 'right',
    width: '96px',
    component: PercentCell,
    componentProps: (row): IPercentCellProps => ({
      value: row.ch7d,
      trend: row.ch7d_direction,
      loading: isLoading.value,
    }),
  }

  const sparkColumn: TypedColumnDef<ISparkPopoverCellProps> = {
    field: 'spark',
    header: 'Last 7 Days',
    align: 'right',
    width: '140px',
    component: SparkPopoverCell,
    componentProps: (row): ISparkPopoverCellProps => ({
      row,
      loading: isLoading.value,
      width: 140,
      height: 32,
    }),
  }

  return [favoriteColumn, nameColumn, priceColumn, ch24hColumn, ch7dColumn, sparkColumn]
}

export function createCryptoColumns(
  isLoading: Ref<boolean>,
  onToggleFavorite?: ToggleFavoriteCallback,
): ColumnDef<ICryptoServerRow>[] {
  const typedColumns = createTypedColumns(isLoading, onToggleFavorite)

  return [
    {
      field: 'rank',
      header: '#',
      align: 'center',
      width: '56px',
    },
    ...(typedColumns as ColumnDef<ICryptoServerRow>[]),
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
  ]
}
