<template>
  <div v-if="holders.length > 0">
    <table class="divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" class="px-2 py-3"></th>
          <th
            scope="col"
            class="px-2 py-3 text-left text-sm font-bold text-gray-900 uppercase"
          >
            TÊN
          </th>
          <th
            scope="col"
            class="px-2 py-3 text-sm text-right font-bold text-gray-900 uppercase"
          >
            SỐ CP
          </th>
          <th
            scope="col"
            class="px-2 py-3 text-sm text-right font-bold text-gray-900 uppercase whitespace-nowrap"
          >
            TỶ LỆ (%)
          </th>
          <th
            scope="col"
            class="px-2 py-3 text-sm text-right font-bold text-gray-900 uppercase"
          >
            CẬP NHẬT
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200"></tbody>

      <tr
        v-for="row in holders"
        :key="row.majorHolderID"
        class="hover:bg-gray-300 hover:cursor-pointer"
        @click="
          routeToSymbolOrMember(
            row.isOrganization,
            row.individualHolderID,
            row.institutionHolderSymbol
              ? row.institutionHolderSymbol
              : row.institutionHolderID,
          )
        "
      >
        <td class="px-2 py-3">
          <img class="h-14 w-14 rounded-full" :src="row.image_path" alt="" />
        </td>
        <td class="px-2 py-3">
          <div>
            <p class="text-base font-bold text-gray-900">
              {{ row.name }}
            </p>
            <p class="text-sm text-gray-900">{{ row.position }}</p>
          </div>
        </td>
        <td class="px-2 py-3 text-sm text-right text-gray-800">
          {{ $filters.formatNumber(row.shares) }}
        </td>
        <td class="px-2 py-3 text-sm text-right text-gray-900">
          {{
            Intl.NumberFormat('en', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(row.ownership * 100)
          }}
        </td>
        <td class="px-2 py-3 text-sm text-right text-gray-900">
          {{ $filters.formatDate(row.reported) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'TableUI',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const holders = computed(() => props.data)
    const router = useRouter()

    const routeToSymbolOrMember = (isOrg, officerID, company) => {
      if (isOrg === true) {
        //TO-DO not render!!!
        router.push({ path: `/entry/symbols/${company}` })
      } else {
        router.push({ path: `/entry/members/${officerID}` })
      }
    }

    return {
      holders,
      routeToSymbolOrMember,
    }
  },
}
</script>

<style scoped></style>
