<template>
  <div class="w-full sm:px-0">
    <TabGroup>
      <div class="flex justify-between w-full items-center px-2">
        <div class="w-1/2 p-2" >
          <TabList class="flex rounded-xl">
            <Tab
              v-for="(category, idx) in tabs"
              :key="idx"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'w-full py-1 text-sm leading-5 font-medium rounded-xs border',
                  'focus:outline-none',
                  selected
                    ? 'bg-[#137cbd] text-white shadow'
                    : 'hover:bg-white/[0.12]',
                ]"
              >{{ category.name }}</button>
            </Tab>
          </TabList>
        </div>
        <div>
          <p class="text-sm">Đ/v khối lượng: 1 CP, Đ/v giá trị: 1000 VNĐ</p>
        </div>
      </div>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(tab, idx) in tabs"
          :key="idx"
          :class="['bg-white rounded-xl p-3', 'focus:outline-none']"
        >
          <TableData :headers="tab.headers" :data="rows" :type="tab.type" :scrollPos="scrollPos" @scroll="infinityScroll" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import TableData from './TableData.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    TableData,
  },
  setup() {
    const tabs = ref([
      {
        id: 1,
        type: 'GQK',
        name: 'Giá quá khứ',
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
        id: 2,
        type: 'GD',
        name: 'GD NĐTNN',
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
        id: 3,
        type: 'CC',
        name: 'Cung cầu',
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
    ])

    const rows = ref([])
    const route = useRoute()
    const symbol = route.params.symbol
    const current_date = ref(new Date().toISOString().split('.')[0])
    const offset = ref(0)
    const lock = ref(false)
    const scrollDelta = ref(490)
    const scrollPos = ref(0)

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

    function loadmore(e){
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

    function infinityScroll(e){
      scrollPos.value = e.srcElement.scrollTop
      if(e.srcElement.scrollTop >= scrollDelta.value && lock.value === false){
        lock.value = true
        loadmore()
        scrollDelta.value += 200
        setTimeout(()=>{
          lock.value = false
        },300)
      }
      
    }


    return {
      tabs,
      rows,
      infinityScroll,
      lock,
      scrollPos
    }
  },
}
</script>
