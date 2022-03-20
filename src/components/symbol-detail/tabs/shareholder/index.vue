<template>
  <div class="sm:flex sm:items-start">
    <div class="text-center sm:text-left w-full">
      <div class="flex">
        <aside class="flex flex-shrink-0 w-72 text-center px-3 py-3">
          <div class="flex-1 flex flex-col">chart</div>
        </aside>

        <main class="bg-sky-100 flex-1 relative z-0 focus:outline-none">
          <div class="inset-0 rounded-md h-[511px] px-3 py-3">
            <div class="flex">
              <h2 class="font-bold text-lg text-sky-800 mr-4 my-auto">
                Cổ đông lớn
              </h2>
              <CTabs v-model="tab" :tabs="tabsData" />
              <TButton type="primary" class="ml-auto">Giao dịch</TButton>
            </div>
            <div class="mt-4 overflow-y-scroll h-[444px]">
              <component :is="tab.component" :data="tab.data" />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { DialogTitle } from '@headlessui/vue'
import NavRouter from '../../../kits/nav-router/index.vue'
import CTabs from '../../../kits/tabs/index.vue'
import { onMounted, ref } from 'vue'
import tabs from './tabs'
import TButton from '../../../kits/t-button/index.vue'
import axios from '../../../../plugins/axios'
import { useRoute } from 'vue-router'
export default {
  name: 'ShareHolder',
  components: {
    TButton,
    CTabs,
    NavRouter,
    DialogTitle,
  },

  setup() {
    const route = useRoute()
    const symbol = route.params.symbol
    const tabsData = ref(tabs)
    const hostImage = 'http://112.213.94.77:1995/static/'

    const fetchData = () => {
      axios
        .get(`/holders/${symbol}`)
        .then((res) => {
          // process data for TAT CA [0], CA NHAN [1], TO CHUC [2]
          tabsData.value[0].data = res.data
          for (const holder of tabsData.value[0].data) {
            holder.image_path =
              hostImage + holder.image_path + '?width=75&height=75'
            if (holder.isOrganization === true) {
              tabsData.value[2].data.push(holder)
            } else {
              tabsData.value[1].data.push(holder)
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    onMounted(() => {
      fetchData()
    })

    const tab = ref(tabsData.value[0])

    return {
      tab,
      tabsData,
    }
  },
}
</script>
