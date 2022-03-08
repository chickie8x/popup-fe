<template>
  <div v-if="profile" class="sm:flex sm:items-start">
    <div class="mt-3 text-center sm:text-left w-full">
      <div class="flex">
        <NavRouter />
        <DialogTitle
          as="h3"
          class="text-lg leading-6 font-medium text-gray-900 flex text-center my-auto ml-4"
        >
          {{ profile.name }}
        </DialogTitle>
      </div>

      <div class="flex bg-slate-100 mt-4">
        <aside class="flex flex-shrink-0 w-72 text-center mr-3">
          <div class="flex-1 flex flex-col mt-3">
            <img
              class="w-36 h-36 flex-shrink-0 mx-auto rounded-full"
              :src="profile.photoURL"
              alt=""
            />
            <h3 class="mt-4 text-gray-900 text-lg font-bold">
              {{ profile.name }}
            </h3>
            <h4 class="mt-4 text-gray-900 text-sm font-bold">
              {{ profile.positionName }}
            </h4>
            <div class="mt-4 text-gray-900 text-base">
              {{ profile.institutionName }} (Mã CK:
              <router-link
                :to="`/entry/symbols/${profile.institutionSymbol}`"
                class="text-sky-700 hover:underline"
              >
                {{ profile.institutionSymbol }} </router-link
              >)
            </div>
            <div class="text-gray-900 text-base">
              Tuổi:
              <span class="font-bold">{{ profile.dateOfBirth }}</span>
            </div>
            <div class="text-gray-900 text-base">
              Học vấn:
              <span class="font-bold">{{ profile.education }}</span>
            </div>
            <div
              class="mt-3 px-3 py-3 text-gray-900 text-2xl bg-blue-100 rounded-lg justify-center"
            >
              Tổng tài sản
              <div class="font-bold">
                {{ profile.asset }}
              </div>
            </div>
          </div>
        </aside>

        <main class="flex-1 relative z-0 focus:outline-none">
          <div class="inset-0">
            <div class="mt-3">
              <CTabs v-model="tab" :tabs="tabs" />
            </div>

            <div class="mt-4">
              <component
                :is="tab.component"
                :bio="profile.bio"
                class="border-2 rounded-md h-[511px]"
              />
            </div>
          </div>
        </main>
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
  name: 'MemberDetail',
  components: {
    CTabs,
    NavRouter,
    DialogTitle,
  },

  setup() {
    // data
    const route = useRoute()
    const profile = ref(null)
    const memberId = route.params.id

    // methods
    const fetchProfile = async () => {
      profile.value = await (
        await axios.get(`/api/individuals/${memberId}/profile`)
      ).data
      if (!profile.value.photoURL) {
        profile.value.photoURL = `https://static.fireant.vn/individuals/photo/${memberId}?width=200&height=200`
      }
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
