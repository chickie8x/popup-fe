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

      <div class="flex flex-col sm:flex-row bg-slate-100 mt-4">
        <aside class="flex flex-shrink-0 w-full sm:w-72 text-center px-3">
          <div class=" w-full grid grid-cols-2 grid-rows-12 sm:flex-1 sm:flex flex-col mt-3">
            <img
              class="w-36 h-36 col-start-1 col-span-1 row-start-1 row-span-4 sm:flex-shrink-0 rounded-full mx-auto"
              :src="getAvatar()"
              alt=""
            />
            <h3 class="sm:mt-4 text-gray-900 text-lg font-bold col-start-2 row-start-1 ">
              {{ profile.name }}
            </h3>
            <h4 class="sm:mt-4 text-gray-900 text-sm font-bold col-start-2 row-start-2">
              {{ profile.positionName }}
            </h4>
            <div
              v-if="profile.institutionSymbol"
              class="mt-4 text-gray-900 text-base col-start-1 col-span-2 row-start-5 mt-5"
            >
              {{ profile.institutionName }} (Mã CK:
              <router-link
                :to="`/entry/symbols/${profile.institutionSymbol}`"
                class="text-sky-700 hover:underline"
              >
                {{ profile.institutionSymbol }} </router-link
              >)
            </div>
            <div v-else class="mt-4 text-gray-900 text-base">
              {{ profile.institutionName }}
            </div>
            <div class="text-gray-900 text-base col-start-2 row-start-3">
              Tuổi:
              <span class="font-bold">{{ getAge(profile) }}</span>
            </div>
            <div class="text-gray-900 text-base col-start-2 row-start-4">
              Học vấn:
              <span class="font-bold">
                {{ educationMap[profile.education] || '-' }}
              </span>
            </div>
            <div
              class="mt-3 px-3 py-3 text-gray-900 text-2xl bg-blue-100 rounded-lg justify-center col-start-1 col-span-2 row-start-6"
            >
              Tổng tài sản
              <div class="font-bold">
                {{
                  new Intl.NumberFormat('vi', {
                    compactDisplay: 'long',
                    notation: 'compact',
                  }).format(totalAsset)
                }}
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
              <Profile class="border-2 rounded-md h-[511px] text-left" />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted } from 'vue'
import tabs from './tabs.js'
import Profile from './tabs/profile/index.vue'

export default {
  name: 'MemberDetail',

  components: { Profile },

  setup() {
    // data
    const route = useRoute()
    const tab = ref(tabs[0])
    const profile = ref(null)
    const totalAsset = ref(0)
    const memberId = route.params.id

    // methods
    const fetchProfile = async (_id) => {
      const data = await axios.get(`/individual/${_id}`)
      profile.value = data.profile
      const { assets } = data
      totalAsset.value = assets.reduce((acc, curr) => {
        acc += curr.value
        return acc
      }, 0)
    }

    const getAvatar = () => {
      return `${
        import.meta.env.VITE_IMAGE_URL
      }/individuals/${memberId}.png?width=200&height=200`
    }

    const getAge = (_profile) => {
      const dateOfBirth = _profile.dateOfBirth
      if (!dateOfBirth) {
        return '-'
      }
      const [day, mon, year] = dateOfBirth
        .split('/')
        .map((item) => parseInt(item))
      const _dateOfBirth = new Date(year, mon, day)
      const now = new Date()
      return now.getFullYear() - _dateOfBirth.getFullYear()
    }

    const educationMap = {
      3: 'Cử Nhân',
      4: 'Thạc sĩ',
      5: 'Tiến sĩ',
    }

    onMounted(() => {
      fetchProfile(memberId)
    })

    onBeforeRouteUpdate((to, from, next) => {
      const _id = to.params.id
      fetchProfile(_id)
      next()
    })

    return {
      tab,
      tabs,
      getAge,
      getAvatar,
      profile,
      totalAsset,
      educationMap,
    }
  },
}
</script>
