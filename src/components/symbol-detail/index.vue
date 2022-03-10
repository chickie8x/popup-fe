<template>
  <div v-if="profile" class="sm:flex sm:items-start">
    <div class="mt-3 text-center sm:text-left w-full">
      <div class="flex">
        <NavRouter />
        <DialogTitle
          as="h3"
          class="text-lg leading-6 font-medium text-gray-900 flex text-center my-auto ml-4"
        >
          {{ profile.symbol }}
        </DialogTitle>
      </div>

      <div class="mt-2 flex">
        <div class="block">
          <div class="font-bold">
            {{ profile.companyName }}
          </div>
          <span> {{ profile.symbol }}:{{ profile.exchange }} </span>
        </div>

        <div class="block ml-auto">
          <div class="font-bold text-right">93.40</div>
          <span class="text-green"> +0.30 / +0.32% </span>
        </div>
      </div>

      <div class="mt-2">
        <CTabs v-model="tab" :tabs="tabs" />
      </div>

      <div class="mt-4">
        <component :is="tab.component" class="border-2 rounded-md h-[511px]" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { DialogTitle } from '@headlessui/vue'
import CTabs from '../kits/tabs/index.vue'
import NavRouter from '../kits/nav-router/index.vue'
import tabs from './tabs.js'

export default {
  name: 'SymbolDetail',

  components: {
    CTabs,
    NavRouter,
    DialogTitle,
  },

  setup() {
    // data
    const route = useRoute()
    const profile = ref(null)
    const symbol = route.params.symbol

    // methods
    const fetchProfile = async () => {
      profile.value = await (
        await axios.get(`/profile/${symbol}`)
      ).data
    }
    onMounted(() => {
      fetchProfile()
    })
    const tab = ref(tabs[0])
    return {
      tab,
      tabs,
      profile,
    }
  },
}
</script>
