<template>
  <div class="max-h-[430px] overflow-y-auto" @scroll="infinityScroll;">
    <div class="flex flex-col">
      <div class="-my-2">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="shadow-sm ring-1 ring-black ring-opacity-5">
            <table class="min-w-full border-separate" style="border-spacing: 0">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="(header, idx) in headers"
                    :key="idx"
                    scope="col"
                    class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="type == 'GQK'" class="bg-white">
                <tr
                  v-for="(row, idx) in rows"
                  :key="idx"
                  :class="[idx % 2 == 0 ? 'bg-gray-100' : '']"
                >
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm text-left text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.date.split('T')[0] }}
                  </td>
                  <td
                    :class="[
                      (
                        ((row.priceClose - row.priceOpen) / row.priceOpen) *
                        100
                      ).toFixed(2) >= 0
                        ? 'text-green-500'
                        : 'text-red-500',
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{
                      (
                        ((row.priceClose - row.priceOpen) / row.priceOpen) *
                        100
                      ).toFixed(2)
                    }}
                  </td>
                  <td
                    :class="[
                      (
                        ((row.priceClose - row.priceOpen) / row.priceOpen) *
                        100
                      ).toFixed(2) >= 0
                        ? 'text-green-500'
                        : 'text-red-500',
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{
                      (
                        ((row.priceClose - row.priceOpen) / row.priceOpen) *
                        100
                      ).toFixed(2)
                    }}%
                  </td>

                  <td
                    v-if="
                      idx < rows.length - 1 &&
                      row.priceOpen == rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-yellow-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceOpen }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceOpen > rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-green-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceOpen }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceOpen < rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-red-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceOpen }}
                  </td>
                  <td
                    v-else
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceOpen }}
                  </td>

                  <td
                    v-if="
                      idx < rows.length - 1 &&
                      row.priceHigh == rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-yellow-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceHigh }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceHigh > rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-green-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceHigh }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceHigh < rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-red-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceHigh }}
                  </td>
                  <td
                    v-else
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceHigh }}
                  </td>

                  <td
                    v-if="
                      idx < rows.length - 1 &&
                      row.priceLow == rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-yellow-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceLow }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceLow > rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-green-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceLow }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceLow < rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-red-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceLow }}
                  </td>
                  <td
                    v-else
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceLow }}
                  </td>

                  <td
                    v-if="
                      idx < rows.length - 1 &&
                      row.priceClose == rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-yellow-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceClose }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceClose > rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-green-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceClose }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceClose < rows[idx + 1].priceClose
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-red-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceClose }}
                  </td>
                  <td
                    v-else
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceClose }}
                  </td>

                  <td
                    v-if="
                      idx < rows.length - 1 &&
                      row.priceAverage == rows[idx + 1].priceAverage
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-yellow-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceAverage.toFixed(2) }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceAverage > rows[idx + 1].priceAverage
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-green-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceAverage.toFixed(2) }}
                  </td>
                  <td
                    v-else-if="
                      idx < rows.length - 1 &&
                      row.priceAverage < rows[idx + 1].priceAverage
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-red-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceAverage.toFixed(2) }}
                  </td>
                  <td
                    v-else
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.priceAverage.toFixed(2) }}
                  </td>

                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.totalVolume }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ (row.totalVolume * row.priceAverage).toFixed(0) }}
                  </td>
                </tr>
              </tbody>

              <tbody v-if="type == 'GD'" class="bg-white">
                <tr
                  v-for="(row, idx) in rows"
                  :key="idx"
                  :class="[idx % 2 == 0 ? 'bg-gray-100' : '']"
                >
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm text-left text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.date.split('T')[0] }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.currentForeignRoom }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.buyForeignQuantity }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.sellForeignQuantity }}
                  </td>

                  <td
                    v-if="row.buyForeignQuantity - row.sellForeignQuantity > 0"
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-green-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.buyForeignQuantity - row.sellForeignQuantity }}
                  </td>
                  <td
                    v-else-if="
                      row.buyForeignQuantity - row.sellForeignQuantity < 0
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-red-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.buyForeignQuantity - row.sellForeignQuantity }}
                  </td>
                  <td
                    v-else
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    0
                  </td>

                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.buyForeignValue / 10000 }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.sellForeignValue / 10000 }}
                  </td>

                  <td
                    v-if="
                      row.buyForeignValue / 10000 -
                        row.sellForeignValue / 10000 >
                      0
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-green-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{
                      row.buyForeignValue / 10000 - row.sellForeignValue / 10000
                    }}
                  </td>
                  <td
                    v-else-if="
                      row.buyForeignValue / 10000 -
                        row.sellForeignValue / 10000 <
                      0
                    "
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-red-500 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{
                      row.buyForeignValue / 10000 - row.sellForeignValue / 10000
                    }}
                  </td>
                  <td
                    v-else
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{
                      row.buyForeignValue / 10000 - row.sellForeignValue / 10000
                    }}
                  </td>
                </tr>
              </tbody>

              <tbody v-if="type == 'CC'" class="bg-white">
                <tr
                  v-for="(row, idx) in rows"
                  :key="idx"
                  :class="[idx % 2 == 0 ? 'bg-gray-100' : '']"
                >
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm text-left text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.date.split('T')[0] }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.buyCount }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.buyQuantity }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.sellCount }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.sellQuantity }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ row.totalVolume }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ (row.totalVolume * row.priceAverage).toFixed(0) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: 'Table',
  props: ['type'],
  setup(props, _) {
    const tableType = props.type
    const headers = ref([])
    const rows = ref({})
    const route = useRoute()
    const symbol = route.params.symbol
    const current_date = ref(new Date().toISOString().split('.')[0])
    const offset = ref(0)

    if (tableType == 'GQK') {
      headers.value = [
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
    }

    if (tableType == 'GD') {
      headers.value = [
        'NGÀY',
        'ROOM NN',
        'MUA',
        'BÁN',
        'MUA-BÁN',
        'MUA',
        'BÁN',
        'MUA-BÁN',
      ]
    }

    if (tableType == 'CC') {
      headers.value = [
        'NGÀY',
        'SL ĐẶT MUA',
        'KL ĐẶT MUA',
        'SL ĐẶT BÁN',
        'KL ĐẶT BÁN',
        'TỔNG KL',
        'TỔNG GT',
      ]
    }

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

    function loadmore() {
      // offset.value += 20;
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
      let childCounts = e.srcElement.childElementCount
      if (
        e.srcElement.scrollTop >
        childCounts * 100 - e.srcElement.clientHeight
      ) {
        loadmore()
      }
    }
    return {
      headers,
      rows,
      tableType,
      infinityScroll,
    }
  },
}
</script>
