<template>
  <div class="max-h-[430px] overflow-y-auto" @scroll="infinityScroll;">
    <div class="flex flex-col">
      <div class="-my-2">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="shadow-sm ring-1 ring-black ring-opacity-5">
            <table class="min-w-full border-separate" style="border-spacing: 0">
              <thead class="">
                <tr>
                  <th
                    v-for="(header, idx) in headers"
                    :key="idx"
                    scope="col"
                    class="sticky top-0 z-10 bg-white py-2 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="type == 'GQK'" class="bg-white">
                <tr
                  v-for="(row, idx) in data"
                  :key="idx"
                  :class="[idx % 2 == 0 ? 'bg-gray-100' : '']"
                >
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm text-left text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ $filters.formatDate(row.date) }}
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
                      idx < data.length - 1 &&
                      row.priceOpen == data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceOpen > data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceOpen < data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceHigh == data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceHigh > data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceHigh < data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceLow == data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceLow > data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceLow < data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceClose == data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceClose > data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceClose < data[idx + 1].priceClose
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
                      idx < data.length - 1 &&
                      row.priceAverage == data[idx + 1].priceAverage
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
                      idx < data.length - 1 &&
                      row.priceAverage > data[idx + 1].priceAverage
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
                      idx < data.length - 1 &&
                      row.priceAverage < data[idx + 1].priceAverage
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
                    {{ $filters.formatNumber(row.totalVolume) }}
                  </td>
                  <td
                    :class="[
                      ,
                      'whitespace-nowrap py-3 text-sm  text-gray-900 sm:pl-6 lg:pl-8',
                    ]"
                  >
                    {{ $filters.formatNumber((row.totalVolume * row.priceAverage).toFixed(0)) }}
                  </td>
                </tr>
              </tbody>

              <tbody v-if="type == 'GD'" class="bg-white">
                <tr
                  v-for="(row, idx) in data"
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
                  v-for="(row, idx) in data"
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

import { formatDate, formatNumber, formatCurrency } from "../../../../utils/formatters"

export default {
  name: 'Table',
  props: {
    headers:{
      require:true,
      type: Array
    },
    data: {
      require: true,
      type: Array
    },
    type: {
      require: true,
      type: String
    }
  },
  setup(props, _) {
    // const headers = ref([props.headers])
    // const data = ref(props.data)
    // return {
    //   headers,
    //   data,
    // }
  },
}
</script>
