<template>
  <div class="border-2 border-gray-200 rounded-lg min-h-full flex">
    <div class="w-2/3 h-full">
      <!-- table wrapper -->
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle">
              <div class="shadow-sm ring-1 ring-black ring-opacity-5">
                <table
                  class="min-w-full border-separate"
                  style="border-spacing: 0"
                >
                  <thead class="">
                    <tr>
                      <th
                        v-for="(header, idx) in headers"
                        :key="idx"
                        scope="col"
                        class="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                      >
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr
                      v-for="(event, evIdx) in events"
                      :key="evIdx"
                      :class="[
                        evIdx % 2 === 0 ? ' bg-gray-100' : '',
                        'cursor-pointer hover:bg-gray-200',
                      ]"
                    >
                      <td
                        :class="[
                          ,
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 lg:pl-8',
                        ]"
                      >
                        {{ $filters.formatDate(event.recordDate) }}
                      </td>

                      <td
                        :class="[
                          ,
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 lg:pl-8',
                        ]"
                      >
                        {{ event.title }}
                      </td>

                      <td
                        :class="[
                          ,
                          'whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 lg:pl-8',
                        ]"
                      >
                        {{ $filters.formatDate(event.executionDate) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/3 h-full bg-[#d1e5f1]">
      <!-- charts wrapper -->
      <div class=""></div>

      <div class=""></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const headers = [
  { id: 1, prefix: 'GD', text: 'GD KHQ' },
  { id: 2, prefix: 'SK', text: 'SỰ KIỆN' },
  { id: 3, prefix: 'TH', text: 'THỰC HIỆN' },
]

export default {
  name: 'Dividend',

  setup() {
    const route = useRoute()
    const chartData = ref([])
    const events = ref([])
    const symbol = route.params.symbol
    const current_date = ref(new Date().toISOString().split('.')[0])
    const offset = ref(0)

    const fetchData = async () => {
      events.value = await axios.get(
        `/events/${symbol}/?start_date=2019-03-11T04%3A54%3A28&end_date=${encodeURIComponent(
          current_date.value,
        )}&offset=${offset.value}&limit=20`,
      )
    }

    onMounted(() => {
      fetchData()
    })

    return {
      chartData,
      events,
      headers,
    }
  },
}
</script>
