<template>
  <div class="w-full sm:px-0">
    <TabGroup>
      <div class="flex justify-between w-full items-center px-2">
        <div class="w-1/2 p-2">
          <TabList class="flex rounded-xl">
            <Tab
              v-for="(category, idx) in categories"
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
              >
                {{ category.name }}
              </button>
            </Tab>
          </TabList>
        </div>
        <div>
          <p class="text-sm">Đ/v khối lượng: 1 CP, Đ/v giá trị: 1000 VNĐ</p>
        </div>
      </div>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(post, idx) in categories"
          :key="idx"
          :class="['bg-white rounded-xl p-3', 'focus:outline-none']"
        >
          <TableData :type="post.type" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import TableData from './TableData.vue'

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
    const categories = ref([
      {
        id: 1,
        type: 'GQK',
        name: 'Giá quá khứ',
      },
      {
        id: 2,
        type: 'GD',
        name: 'GD NĐTNN',
      },
      {
        id: 3,
        type: 'CC',
        name: 'Cung cầu',
      },
    ])

    return {
      categories,
    }
  },
}
</script>
