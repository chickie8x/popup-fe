<template>
  <div class="w-full overflow-hidden">
    <div class="w-full flex items-center p-2">
      <CTabs v-model="tab" :tabs="tabs" size="sm" />
      <div class="ml-auto">
        <span class="text-sm text-gray-600 font-bold">
          Đ/v khối lượng: 1 CP, Đ/v giá trị: 1,000 VNĐ
        </span>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow-sm ring-1 ring-black ring-opacity-5">
          <CTable
            :headers="headers"
            :items="items"
            heigh="455px"
            @onInfinite="loadMore"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { formatDate } from '../../../../../utils/formatters.js'

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

    const headers = computed(() => {
      return {
        date: {
          title: 'Ngày',
          valueFn: (item) => {
            return formatDate(item.date)
          },
        },
        change: {
          title: 'Thay đổi',
          classes: () => {
            return 'text-green-500'
          },
        },
        percent: {
          title: '%',
        },
        priceOpen: {
          title: 'Mở',
        },
        priceHigh: {
          title: 'Cao',
        },
        priceLow: {
          title: 'Thấp',
          classes: (item) => {
            const { priceClose, priceOpen } = item
            return priceClose > priceOpen ? 'text-green-500' : 'text-red-500'
          },
        },
        priceClose: {
          title: 'Đóng',
        },
        dealVolume: {
          title: 'Tổng KL',
          valueFn: (item) => {
            return item.dealVolume
          },
        },
        totalValue: {
          title: 'Tổng GT',
        },
      }
    })

    const keys = computed(() => {
      return Object.keys(headers.value)
    })

    const loadMore = async ($state) => {
      const _items = await fetchData()
      if (_items.length) {
        items.value = items.value.concat(_items)
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
    }
  },
}
</script>
