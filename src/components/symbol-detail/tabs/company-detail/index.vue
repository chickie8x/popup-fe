<template>
  <div class="flex">
    <main class="flex-1 relative z-0 focus:outline-none overflow-y-scroll">
      <div class="inset-0">
        <div class="py-3 px-2">
          {{ profile.overview }}
        </div>

        <div class="px-3 py-3 bg-gray-200 shadow overflow-x-scroll">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th  scope="col" colspan="2" class="px-3 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">THÔNG TIN CƠ BẢN</th>
              <th scope="col" colspan="2" class="px-3 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">THÔNG TIN NIÊM YẾT</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            </tbody>

            <tr
                v-for="row in companyInfo"
                :key="row.key"
            >
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-800">
                {{row[0].name}}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                {{ profile[row[0].key] }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-800">
                {{row[1].name}}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                {{ profile[row[1].key] }}
              </td>
            </tr>
          </table>
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
import {useRoute} from "vue-router";

const companyInfo = [
  [{name: 'Mã SIC', key: 'symbol'}, {name: 'Ngày niêm yết', key:'dateOfListing'}],
  [{name: 'Mã ngành ICB', key: 'icbCode'}, {name: 'Nơi niêm yết', key:'exchange'}],
  [{name: 'Năm thành lập', key: 'establishmentDate'}, {name: 'Giá chào sàn (VNĐ)', key:'initialListingPrice'}],
  [{name: 'Vốn điều lệ', key: 'listingVolume'}, {name: 'Ngày phát hành cuối', key:'dateOfIssue'}],
  [{name: 'Số lượng nhân sự', key: 'employees'}, {name: 'KL đang niêm yết', key:'charterCapital'}]
]

export default {
  name: 'CompanyDetail',

  setup() {
    const route = useRoute()
    const profile = ref({})
    const officers = ref([])
    const symbol = route.params.symbol

    axios
      .get(`/api/symbols/${symbol}/profile`)
      .then((res) => {
        profile.value = res.data
        profile.value.dateOfListing = new Intl.DateTimeFormat('vi', {month:'2-digit',day:'2-digit', year:'numeric'}).format(new Date(profile.value.dateOfListing))
        profile.value.establishmentDate = new Intl.DateTimeFormat('vi', {month:'2-digit',day:'2-digit', year:'numeric'}).format(new Date(profile.value.establishmentDate))
        profile.value.dateOfIssue = new Intl.DateTimeFormat('vi', {month:'2-digit',day:'2-digit', year:'numeric'}).format(new Date(profile.value.dateOfIssue))
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get(`/api/symbols/${symbol}/officers`)
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
      companyInfo,
    }
  },
}
</script>
