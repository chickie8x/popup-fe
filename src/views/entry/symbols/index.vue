<template>
  <div v-if="profile" class="sm:flex sm:items-start">
    <div class="mt-3 text-center sm:text-left w-full">
      <div class="flex">
        <NavRouter />
        <DialogTitle
          as="h3"
          class="text-lg leading-6 font-medium text-gray-900 flex text-center my-auto ml-4"
        >
          <img src="/favicon.png" class="w-20" alt="logo f247" />
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
        <div>
          <div class="hidden sm:block">
            <nav class="flex space-x-2" aria-label="Tabs">
              <router-link
                v-for="(tab, idx) in tabs"
                :key="idx"
                :to="{ name: tab.to, params: { symbol } }"
                :class="[
                  route.name === tab.to
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700',
                  'px-3 py-2 font-medium text-sm rounded-md cursor-pointer',
                ]"
              >
                {{ tab.name }}
              </router-link>
            </nav>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <router-view
          class="h-[512px] overflow-y-auto border-2 border-solid rounded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import tabs from './tabs'

export default {
  name: 'SymbolDetail',

  setup() {
    // data
    const route = useRoute()
    const profile = ref(null)
    const symbol = route.params.symbol

    // methods
    const fetchProfile = async () => {
      profile.value = await (await axios.get(`/profile/${symbol}`)).data
    }
    onMounted(() => {
      fetchProfile()
    })

    return {
      symbol,
      tabs,
      profile,
      route,
    }
  },
}
</script>
