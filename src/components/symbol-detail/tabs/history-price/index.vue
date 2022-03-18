<template>
  <div class="w-full">
    <div class="w-full flex items-center px-2">
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
        <div class="flex p-2">
          <RadioGroupOption
            as="template"
            v-for="tab in tabs"
            :key="tab.id"
            :value="tab"
            v-slot="{ checked }"
          >
            <div
              :class="[
                checked ? 'bg-[#137cbd] bg-opacity-75 text-white ' : 'bg-white ',
              ]"
              class="relative flex px-2 py-1 shadow-md cursor-pointer focus:outline-none"
            >
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  <div class="text-sm">
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? 'text-sky-100' : 'text-gray-500'"
                      class="inline"
                    >
                      <span>{{ tab.text }}</span>
                    </RadioGroupDescription>
                  </div>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <div class="ml-auto text-gray-800 text-sm">
        <span>Đ/v khối lượng: 1 CP, Đ/v giá trị: 1000 VNĐ</span>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 max-h-[460px] overflow-y-auto" @scroll="infinityScroll">
      <div class="flex flex-col">
        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <div class="shadow-sm ring-1 ring-black ring-opacity-5">
              <table class="min-w-full border-separate" style="border-spacing: 0">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      v-for="header, idx in selected.headers"
                      :key="idx"
                      scope="col"
                      class="sticky top-0 z-10 border-b border-gray-300 bg-gray-100 py-3.5 pl-2 pr-1 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >{{ header }}</th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr v-for="(row, idx) in rows" :key="idx">
                    <!-- column 1st  -->
                    <td
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatDate(row.date) }}</td>

                    <!-- column 2nd  -->
                    <td
                      v-show="selected.prefix === 'GQK'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        v-if="idx < rows.length - 1"
                        :class="[
                          row.priceClose - rows[idx + 1].priceClose >= 0
                            ? 'text-green-500'
                            : 'text-red-500',
                          'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                        ]"
                      >{{ (row.priceClose - rows[idx + 1].priceClose).toFixed(2) }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'GD'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ row.currentForeignRoom }}</td>

                    <td
                      v-show="selected.prefix === 'CC'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ row.buyCount }}</td>

                    <!-- column 3rd  -->
                    <td
                      v-show="selected.prefix === 'GQK'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        v-if="idx < rows.length - 1 && ((row.priceClose - rows[idx + 1].priceClose) / rows[idx + 1].priceClose * 100).toFixed(2) >= 0"
                        class="text-green-500"
                      >{{ ((row.priceClose - rows[idx + 1].priceClose) / rows[idx + 1].priceClose * 100).toFixed(2) }}</span>
                      <span
                        v-else-if="idx < rows.length - 1 && ((row.priceClose - rows[idx + 1].priceClose) / rows[idx + 1].priceClose * 100).toFixed(2) < 0"
                        class="text-red-500"
                      >{{ ((row.priceClose - rows[idx + 1].priceClose) / rows[idx + 1].priceClose * 100).toFixed(2) }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'GD'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.buyForeignQuantity) }}</td>

                    <td
                      v-show="selected.prefix === 'CC'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.buyQuantity) }}</td>

                    <!-- column 4th  -->
                    <td
                      v-show="selected.prefix === 'GQK'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        v-if="idx < rows.length - 1"
                        :class="[
                          row.priceOpen === rows[idx + 1].priceClose ? 'text-yellow-600' : '',
                          row.priceOpen > rows[idx + 1].priceClose ? 'text-green-500' : '',
                          row.priceOpen < rows[idx + 1].priceClose ? 'text-red-500' : '',
                        ]"
                      >{{ row.priceOpen }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'GD'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.sellForeignQuantity) }}</td>

                    <td
                      v-show="selected.prefix === 'CC'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.sellCount) }}</td>

                    <!-- column 5th  -->
                    <td
                      v-show="selected.prefix === 'GQK'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        v-if="idx < rows.length - 1"
                        :class="[
                          row.priceHigh - rows[idx + 1].priceClose === 0 ? ' text-yellow-600' : '',
                          row.priceHigh - rows[idx + 1].priceClose > 0 ? ' text-green-500' : '',
                          row.priceHigh - rows[idx + 1].priceClose < 0 ? ' text-red-500' : '',
                        ]"
                      >{{ row.priceHigh }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'GD'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        :class="[
                          row.buyForeignQuantity - row.sellForeignQuantity === 0 ? ' text-gray-900' : '',
                          row.buyForeignQuantity - row.sellForeignQuantity > 0 ? ' text-green-500' : '',
                          row.buyForeignQuantity - row.sellForeignQuantity < 0 ? ' text-red-500' : '',
                        ]"
                      >{{ $filters.formatNumber(row.buyForeignQuantity - row.sellForeignQuantity) }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'CC'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.sellQuantity) }}</td>

                    <!-- column 6th  -->

                    <td
                      v-show="selected.prefix === 'GQK'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        v-if="idx < rows.length - 1"
                        :class="[
                          row.priceLow - rows[idx + 1].priceClose === 0 ? ' text-yellow-600' : '',
                          row.priceLow - rows[idx + 1].priceClose > 0 ? ' text-green-500' : '',
                          row.priceLow - rows[idx + 1].priceClose < 0 ? ' text-red-500' : '',
                        ]"
                      >{{ $filters.formatNumber(row.priceLow) }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'GD'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.buyForeignValue / 1000) }}</td>

                    <!-- column 7th  -->

                    <td
                      v-show="selected.prefix === 'GQK'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        v-if="idx < rows.length - 1"
                        :class="[
                          row.priceClose - rows[idx + 1].priceClose === 0 ? ' text-yellow-600' : '',
                          row.priceClose - rows[idx + 1].priceClose > 0 ? ' text-green-500' : '',
                          row.priceClose - rows[idx + 1].priceClose < 0 ? ' text-red-500' : '',
                        ]"
                      >{{ $filters.formatNumber(row.priceClose) }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'GD'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.sellForeignValue / 1000) }}</td>

                    <!-- column 8th  -->

                    <td
                      v-show="selected.prefix === 'GQK'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        v-if="idx < rows.length - 1"
                        :class="[
                          row.priceAverage - rows[idx + 1].priceAverage === 0 ? ' text-yellow-600' : '',
                          row.priceAverage - rows[idx + 1].priceAverage > 0 ? ' text-green-500' : '',
                          row.priceAverage - rows[idx + 1].priceAverage < 0 ? ' text-red-500' : '',
                        ]"
                      >{{ $filters.formatNumber(row.priceAverage.toFixed(2)) }}</span>
                    </td>

                    <td
                      v-show="selected.prefix === 'GD'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >
                      <span
                        :class="[
                          row.buyForeignValue / 1000 - row.sellForeignValue / 1000 == 0 ? '' : '',
                          row.buyForeignValue / 1000 - row.sellForeignValue / 1000 > 0 ? 'text-green-500' : '',
                          row.buyForeignValue / 1000 - row.sellForeignValue / 1000 < 0 ? 'text-red-500' : '',
                        
                        ]"
                      >{{ $filters.formatNumber(row.buyForeignValue / 1000 - row.sellForeignValue / 1000) }}</span>
                    </td>

                    <!-- column 9th  -->
                    <td
                      v-show="selected.prefix === 'GQK' || selected.prefix === 'CC'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber(row.totalVolume) }}</td>

                    <!-- column 10th  -->
                    <td
                      v-show="selected.prefix === 'GQK' || selected.prefix === 'CC'"
                      :class="['whitespace-nowrap py-4 px-1 text-sm text-gray-900 sm:pl-6 lg:pl-8']"
                    >{{ $filters.formatNumber((row.totalValue / 1000).toFixed(0)) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'

const tabs = [
  {
    id: '1',
    prefix: 'GQK',
    text: 'Giá quá khứ',
    headers: [
      'NGÀY',
      'THAY ĐỔI',
      '%',
      'MỞ',
      'CAO',
      'THẤP',
      'ĐÓNG',
      'TB',
      'TỔNG KL',
      'TỔNG GT',
    ]
  },
  {
    id: '2',
    prefix: 'GD',
    text: 'GD NĐTNN',
    headers: [
      'NGÀY',
      'ROOM NN',
      'MUA',
      'BÁN',
      'MUA-BÁN',
      'MUA',
      'BÁN',
      'MUA-BÁN',
    ]
  },
  {
    id: '3',
    prefix: 'CC',
    text: 'Cung cầu',
    headers: [
      'NGÀY',
      'SL ĐẶT MUA',
      'KL ĐẶT MUA',
      'SL ĐẶT BÁN',
      'KL ĐẶT BÁN',
      'TỔNG KL',
      'TỔNG GT',
    ]
  },
]


export default {
  name: 'HistoryPrice',

  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupDescription,
    RadioGroupOption,
  },

  setup() {
    const selected = ref(tabs[0])
    const rows = ref([])
    const route = useRoute()
    const symbol = route.params.symbol
    const current_date = ref(new Date().toISOString().split('.')[0])
    const offset = ref(0)
    const lock = ref(false)
    const scrollDelta = ref(490)

    const fetchData = async () => {
      rows.value = await (
        await axios.get(
          `/historical-quotes/${symbol}/?start_date=2019-03-11T04%3A54%3A28&end_date=${encodeURIComponent(
            current_date.value,
          )}&offset=${offset.value}&limit=20`,
        )
      ).data
    }

    onMounted(() => {
      fetchData()
    })

    function loadmore(e) {
      axios
        .get(
          `/historical-quotes/${symbol}/?start_date=2019-03-11T04%3A54%3A28&end_date=${encodeURIComponent(
            current_date.value,
          )}&offset=${offset.value}&limit=20`,
        )
        .then((res) => {
          let addedItems = res.data
          for (const item of addedItems) {
            rows.value.push(item)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    function infinityScroll(e) {
      if (e.srcElement.scrollTop >= scrollDelta.value && lock.value === false) {
        lock.value = true
        loadmore()
        scrollDelta.value += 400
        setTimeout(() => {
          lock.value = false
        }, 300)
      }

    }

    return {
      selected,
      tabs,
      rows,
      infinityScroll,
      lock
    }
  }
}


</script>
