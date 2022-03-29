<template>
  <div class="w-full overflow-hidden">
    <div class="w-full flex items-center p-2">
      <CTabs v-model="tab" :tabs="tabs" size="sm" />
      <div class="ml-auto">
        <span class="text-sm text-gray-600 font-bold"
          >Đ/v khối lượng: 1 CP, Đ/v giá trị: 1,000 VNĐ</span
        >
      </div>
    </div>

    <div class="flex flex-col">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="shadow-sm ring-1 ring-black ring-opacity-5">
          <CTable
            :headers="headers"
            :items="generatedItems"
            heigh="440px"
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
import { formatNumberComma } from '@/utils/formatters'
import headerConfigs from './headers'

const tabs = [
  {
    name: 'Giá quá khứ',
    key: 'gqk',
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
        )}&offset=${offset.value}&limit=21`,
      )
    }

    const setClasses = (prevItem, currValue) => {
      let result = 'text-red-500'
      const diff = currValue - prevItem.priceClose
      if (diff === 0) {
        result = 'text-yellow-600'
      } else if (diff > 0) {
        result = 'text-green-500'
      }
      return result
    }

    const gqkCb = (item, idx, array) => {
      const prevItem = array[idx + 1]
      if (!prevItem) {
        return
      }
      item.change = item.priceClose - prevItem.priceClose
      item.percent =
        ((item.priceClose - prevItem.priceClose) / prevItem.priceClose) * 100
      item.priceOpenClasses = setClasses(prevItem, item.priceOpen)
      item.priceHighClasses = setClasses(prevItem, item.priceHigh)
      item.priceLowClasses = setClasses(prevItem, item.priceLow)
      return item
    }

    const giaodichCb = (item) => {
      return item
    }

    const cungcauCb = (item) => {
      return item
    }

    const headers = computed(() => {
      switch (tab.value.key) {
        case 'gqk':
          return headerConfigs.gqk
        case 'giaodich':
          return headerConfigs.giaodich
        case 'cungcau':
          return headerConfigs.cungcau
        default:
          return headerConfigs.gqk
      }
    })

    const generatedItems = computed(() => {
      let cb = gqkCb
      switch (tab.value.key) {
        case 'gqk':
          cb = gqkCb
          break
        case 'giaodich':
          cb = giaodichCb
          break
        case 'cungcau':
          cb = cungcauCb
          break
      }
      const res = items.value.map(cb)
      return res.splice(0, res.length - 1)
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
      tab,
      tabs,
      headers,
      loadMore,
      generatedItems,
    }
  },
}
</script>
