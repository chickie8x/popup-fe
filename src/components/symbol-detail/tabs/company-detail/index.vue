<template>
  <div class="flex">
    <main class="flex-1 relative z-0 focus:outline-none">
      <div class="inset-0 py-3 px-2">
        <div>
          {{ profile.overview }}
        </div>
      </div>
    </main>

    <aside
      class="flex flex-shrink-0 w-72 border-r border-gray-200 bg-sky-100 overflow-y-scroll"
    >
      <div class="inset-0 py-3 px-2">
        <ul role="list" class="divide-y divide-gray-200">
          <li
            v-for="person in officers"
            :key="person.individualID"
            class="py-4 flex"
          >
            <img class="h-13 w-13 rounded-full" :src="person.image" alt="" />
            <div class="ml-3">
              <p class="text-base font-bold text-gray-900">
                {{ person.name }}
              </p>
              <p class="text-sm text-gray-900">{{ person.position }}</p>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'CompanyDetail',

  setup() {
    const profile = ref({})
    const officers = ref([])

    axios
      .get('/api/symbols/FPT/profile')
      .then((res) => {
        profile.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get('/api/symbols/FPT/officers')
      .then((res) => {
        officers.value = res.data
        for (const person of officers.value) {
          person.image =
            'https://static.fireant.vn/individuals/photo/' +
            person.individualID +
            '?width=75&height=75'
        }
      })
      .catch((err) => {
        console.log(err)
      })

    return {
      profile,
      officers,
    }
  },
}
</script>
