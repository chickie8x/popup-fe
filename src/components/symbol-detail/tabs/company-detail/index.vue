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
                <th
                  scope="col"
                  colspan="2"
                  class="px-3 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                >
                  THÔNG TIN CƠ BẢN
                </th>
                <th
                  scope="col"
                  colspan="2"
                  class="px-3 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                >
                  THÔNG TIN NIÊM YẾT
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200"></tbody>

            <tr v-for="row in companyInfo" :key="row.key">
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-800">
                {{ row[0].name }}
              </td>
              <td
                class="px-3 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900"
              >
                {{ profile[row[0].key] }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-800">
                {{ row[1].name }}
              </td>
              <td
                class="px-3 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900"
              >
                {{ profile[row[1].key] }}
              </td>
            </tr>
          </table>
        </div>

        <div
          v-if="subCompany.length > 0"
          class="px-3 py-3 bg-gray-200 shadow overflow-x-scroll"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-3 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                >
                  CÔNG TY CON
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 text-sm text-right font-bold text-gray-900 uppercase tracking-wider"
                >
                  VỐN ĐIỀU LỆ
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 text-sm text-right font-bold text-gray-900 uppercase tracking-wider"
                >
                  TỶ LỆ (%)
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200"></tbody>

            <tr
              v-for="row in subCompany"
              :key="row.institutionID"
              class="hover:bg-gray-300 hover:cursor-pointer"
              @click="
                routeToSymbol(row.symbol ? row.symbol : row.institutionID)
              "
            >
              <td
                class="px-3 py-3 whitespace-nowrap text-sm font-bold text-gray-900"
              >
                {{ row.companyName }}
                {{
                  row.symbol ? '(' + row.symbol + ':' + row.exchange + ')' : ''
                }}
              </td>
              <td
                class="px-3 py-3 whitespace-nowrap text-sm text-right text-gray-800"
              >
                {{
                  row.charterCapital
                    ? new Intl.NumberFormat('vi', {
                        compactDisplay: 'long',
                        notation: 'compact',
                      }).format(row.charterCapital)
                    : ''
                }}
              </td>
              <td
                class="px-3 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900"
              >
                {{
                  Intl.NumberFormat('en', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(row.ownership * 100)
                }}
              </td>
            </tr>
          </table>
        </div>

        <div
          v-if="linkCompany.length > 0"
          class="px-3 py-3 bg-gray-200 shadow overflow-x-scroll"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-3 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                >
                  CÔNG TY LIÊN KẾT
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 text-sm text-right font-bold text-gray-900 uppercase tracking-wider"
                >
                  VỐN ĐIỀU LỆ
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 text-sm text-right font-bold text-gray-900 uppercase tracking-wider"
                >
                  TỶ LỆ (%)
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200"></tbody>

            <tr
              v-for="row in linkCompany"
              :key="row.institutionID"
              class="hover:bg-gray-300 hover:cursor-pointer"
              @click="
                routeToSymbol(row.symbol ? row.symbol : row.institutionID)
              "
            >
              <td
                class="px-3 py-3 whitespace-nowrap text-sm font-bold text-gray-900"
              >
                {{ row.companyName }}
                {{
                  row.symbol ? '(' + row.symbol + ':' + row.exchange + ')' : ''
                }}
              </td>
              <td
                class="px-3 py-3 whitespace-nowrap text-sm text-right text-gray-800"
              >
                {{
                  row.charterCapital
                    ? new Intl.NumberFormat('vi', {
                        compactDisplay: 'long',
                        notation: 'compact',
                      }).format(row.charterCapital)
                    : ''
                }}
              </td>
              <td
                class="px-3 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900"
              >
                {{
                  Intl.NumberFormat('en', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(row.ownership * 100)
                }}
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
        <h2 class="font-bold text-lg text-sky-800">Ban lãnh đạo</h2>
        <ul role="list" class="divide-y divide-gray-200">
          <li
            v-for="person in officers"
            :key="person.individualID"
            class="py-4 flex hover:bg-blue-200 hover:cursor-pointer"
            @click="routeToMember(person.individualID)"
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
import { useRoute, useRouter } from 'vue-router'

const companyInfo = [
  [
    { name: 'Mã SIC', key: 'symbol' },
    { name: 'Ngày niêm yết', key: 'dateOfListing' },
  ],
  [
    { name: 'Mã ngành ICB', key: 'icbCode' },
    { name: 'Nơi niêm yết', key: 'exchange' },
  ],
  [
    { name: 'Năm thành lập', key: 'establishmentDate' },
    { name: 'Giá chào sàn (VNĐ)', key: 'initialListingPrice' },
  ],
  [
    { name: 'Vốn điều lệ', key: 'listingVolume' },
    { name: 'Ngày phát hành cuối', key: 'dateOfIssue' },
  ],
  [
    { name: 'Số lượng nhân sự', key: 'employees' },
    { name: 'KL đang niêm yết', key: 'charterCapital' },
  ],
]

export default {
  name: 'CompanyDetail',

  setup() {
    const route = useRoute()
    const router = useRouter()
    const profile = ref({})
    const officers = ref([])
    const subCompany = ref([])
    const linkCompany = ref([])
    const symbol = route.params.symbol

    axios
      .get(`/profile/${symbol}`)
      .then((res) => {
        profile.value = res.data
        profile.value.dateOfListing = new Intl.DateTimeFormat('vi', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(profile.value.dateOfListing))
        profile.value.establishmentDate = new Intl.DateTimeFormat('vi', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(profile.value.establishmentDate))
        profile.value.dateOfIssue = new Intl.DateTimeFormat('vi', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        }).format(new Date(profile.value.dateOfIssue))
        profile.value.initialListingPrice = new Intl.NumberFormat('en').format(
          profile.value.initialListingPrice,
        )
        profile.value.employees = new Intl.NumberFormat('en').format(
          profile.value.employees,
        )
        profile.value.charterCapital = new Intl.NumberFormat('en').format(
          profile.value.charterCapital / 10000,
        )
        profile.value.listingVolume = new Intl.NumberFormat('vi', {
          compactDisplay: 'long',
          notation: 'compact',
        }).format(profile.value.listingVolume * 10000)
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get(`/api/{info_name}/${symbol}/?info=officers`)
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

    axios
      .get(`/api/symbols/${symbol}/subsidiaries`)
      .then((res) => {
        for (const childCompany of res.data) {
          if (childCompany.type === 0) {
            subCompany.value.push(childCompany)
          } else if (childCompany.type === 1) {
            linkCompany.value.push(childCompany)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })

    const routeToSymbol = (routeSymbol) => {
      router.push({ path: `/entry/symbols/${routeSymbol}` })
    }

    const routeToMember = (routeMember) => {
      router.push({ path: `/entry/members/${routeMember}` })
    }

    return {
      profile,
      officers,
      companyInfo,
      subCompany,
      linkCompany,
      routeToSymbol,
      routeToMember,
    }
  },
}
</script>
