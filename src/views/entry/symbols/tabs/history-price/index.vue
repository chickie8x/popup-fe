<template>
  <div class="w-full overflow-hidden">
    <div class="w-full flex items-center p-2">
      <CTabs v-model="tab" :tabs="tabs" size="sm" />
      <div class="ml-auto">
        <span class="text-sm text-gray-600 font-bold">Đ/v khối lượng: 1 CP, Đ/v giá trị: 1,000 VNĐ</span>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow-sm ring-1 ring-black ring-opacity-5">
          <CTable :headers="headers" :items="items" heigh="455px" @onInfinite="loadMore" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { formatDate } from '@/utils/formatters.js'
import { formatNumber, formatNumberComma } from '../../../../../utils/formatters'

const tabs = [
  {
    name: 'Giá quá khứ',
    key: 'GQK',
  },
  {
    name: 'GD NDTNN',
    key: 'giaodich',
  },
  {
    name: 'Cung cầu',
    key: 'cungcau',
  },
]

export default {
  name: 'HistoryPrice',

  setup() {
    const items = ref([])
    const route = useRoute()
    const symbol = route.params.symbol
    const currentDate = new Date().toISOString().split('.')[0]
    const tab = ref(tabs[0])
    const offset = ref(0)

    const fetchData = () => {
      return axios.get(
        `/historical-quotes/${symbol}/?start_date=2019-03-11T04%3A54%3A28&end_date=${encodeURIComponent(
          currentDate,
        )}&offset=${offset.value}&limit=20`,
      )
    }

    const setClasses = (items, idx, prop, propClasses) => {
      if (prop - items[idx + 1].priceClose === 0) {
        propClasses = 'text-yellow-600'
      }
      else if (prop - items[idx + 1].priceClose > 0) {
        propClasses = 'text-green-500'
      }
      else {
        propClasses = 'text-red-500'
      }
      return propClasses
    }

    const readyData = (items) => {
      const data = items.map((item, idx) => {
        if (idx < items.length - 1) {

          // table 1
          item.change = (items[idx].priceClose - items[idx + 1].priceClose).toFixed(2)
          item.percent = ((items[idx].priceClose - items[idx + 1].priceClose) / items[idx + 1].priceClose * 100).toFixed(2)
          item.priceOpen = item.priceOpen.toFixed(2)
          item.priceHigh = item.priceHigh.toFixed(2)
          item.priceLow = item.priceLow.toFixed(2)
          item.priceClose = item.priceClose.toFixed(2)
          item.priceOpenClasses = setClasses(items, idx, item.priceOpen, item.priceOpenClasses)
          item.priceHighClasses = setClasses(items, idx, item.priceHigh, item.priceHighClasses)
          item.priceLowClasses = setClasses(items, idx, item.priceLow, item.priceLowClasses)
          item.priceCloseClasses = items[idx].priceClose - items[idx + 1].priceClose >= 0 ? 'text-green-500' : 'text-red-500'
          item.totalVolume = formatNumberComma(item.totalVolume)
          item.totalValue = formatNumberComma(parseInt(items[idx].dealVolume * items[idx].priceAverage))

          // table 2
          item.buyForeignQuantity = formatNumberComma(item.buyForeignQuantity)
          item.sellForeignQuantity = formatNumberComma(item.sellForeignQuantity)
          item.buySellForeignQuantity = formatNumberComma(parseInt(items[idx].buyForeignQuantity.replace(',', '')) - parseInt(items[idx].sellForeignQuantity.replace(',', '')))
          item.buySellForeignQuantityClasses = (parseInt(items[idx].buyForeignQuantity.replace(',', '')) - parseInt(items[idx].sellForeignQuantity.replace(',', ''))) >= 0 ? 'text-green-500' : 'text-red-500'

          item.buyForeignValue = formatNumberComma(parseInt(item.buyForeignValue / 1000))
          item.sellForeignValue = formatNumberComma(parseInt(item.sellForeignValue / 1000))
          item.buySellForeignValue = formatNumberComma(parseInt(items[idx].buyForeignValue.replace(',', '')) - parseInt(items[idx].sellForeignValue.replace(',', '')))
          item.buySellForeignValueClasses = (parseInt(items[idx].buyForeignValue.replace(',', '')) - parseInt(items[idx].sellForeignValue.replace(',', ''))) >= 0 ? 'text-green-500' : 'text-red-500'

          // table 3 
          item.buyCount = formatNumberComma(item.buyCount)
          item.buyQuantity = formatNumberComma(item.buyQuantity)
          item.sellCount = formatNumberComma(item.sellCount)
          item.sellQuantity = formatNumberComma(item.sellQuantity)

        }
        else {
          return
        }
      })
      return items
    }

    const headers = computed(() => {
      if (tab.value.key === 'GQK') {
        return {
          date: {
            title: 'Ngày',
            valueFn: (item) => {
              return formatDate(item.date)
            },
          },
          change: {
            title: 'Thay đổi',
            classes: (item) => {
              return (item.change >= 0 ? 'text-green-500' : 'text-red-500')
            },
          },
          percent: {
            title: '%',
            classes: (item) => {
              return (item.percent >= 0 ? 'text-green-500' : 'text-red-500')
            },
          },
          priceOpen: {
            title: 'Mở',
            classes: (item) => {
              return item.priceOpenClasses
            }
          },
          priceHigh: {
            title: 'Cao',
            classes: (item) => {
              return item.priceHighClasses
            }
          },
          priceLow: {
            title: 'Thấp',
            classes: (item) => {
              return item.priceLowClasses
            },
          },
          priceClose: {
            title: 'Đóng',
            classes: (item) => {
              return item.priceCloseClasses
            }
          },
          totalVolume: {
            title: 'Tổng KL',
          },
          totalValue: {
            title: 'Tổng GT',
          },
        }
      }
      else if (tab.value.key === 'giaodich') {
        return {
          date: {
            title: 'Ngày',
            valueFn: (item) => {
              return formatDate(item.date)
            },
          },
          currentForeignRoom: {
            title: 'Room NN',
          },
          buyForeignQuantity: {
            title: 'Mua',
          },
          sellForeignQuantity: {
            title: 'Bán',
          },
          buySellForeignQuantity: {
            title: 'Mua-Bán',
            classes: (item) => {
              return item.buySellForeignQuantityClasses
            }
          },
          buyForeignValue: {
            title: 'Mua',
          },
          sellForeignValue: {
            title: 'Bán',
          },
          buySellForeignValue: {
            title: 'Mua-Bán',
            classes: (item) => {
              return item.buySellForeignValueClasses
            }
          }
        }
      }
      else {
        return {
          date: {
            title: 'Ngày',
            valueFn: (item) => {
              return formatDate(item.date)
            },
          },
          buyCount: {
            title: 'SL Đặt Mua',
          },
          buyQuantity: {
            title: 'KL Đặt Mua',
          },
          sellCount: {
            title: 'SL Đặt Bán',
          },
          sellQuantity: {
            title: 'KL Đặt Bán',
          },
          totalVolume: {
            title: 'Tổng KL',
          },
          totalValue: {
            title: 'Tổng GT',
          },
        }
      }
    })

    const keys = computed(() => {
      return Object.keys(headers.value)
    })

    const loadMore = async ($state) => {
      const _items = await fetchData()
      if (_items.length) {
        items.value = items.value.concat(readyData(_items))
        $state.loaded()
        offset.value += 20
      } else {
        $state.complete()
      }
    }


    return {
      tabs,
      tab,
      keys,
      items,
      headers,
      loadMore,
      readyData,
    }
  },
}
</script>
