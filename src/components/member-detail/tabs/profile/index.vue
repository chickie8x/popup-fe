<template>
  <div class="border-1 border-gray-200 rounded-lg bg-white overflow-y-scroll">
    <div class="inset-0 py-3 px-2 mx-4 mb-4">
      <div class="px-2 py-2 profile-bio" v-html="bio"></div>
    </div>

    <div class="inset-0 py-3 px-2 mx-4 mb-4 bg-gray-100 rounded-lg">
      <div class="font-bold">CÔNG VIỆC HIỆN TẠI</div>
      <ul role="list" class="divide-y divide-gray-200">
        <li
            v-for="(job, index) in jobs"
            :key="index"
            class="py-2 px-2 flex hover:bg-gray-200 hover:cursor-pointer"
        >
          <div class="ml-3">
            <p class="text-base font-bold text-gray-900">
              {{ job.positionName }}
            </p>
            <p class="text-sm text-gray-900">{{ job.institutionName }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="inset-0 py-3 px-2 mx-4 mb-4 bg-gray-100 rounded-lg">
      <div class="font-bold">TÀI SẢN</div>
      <ul role="list" class="divide-y divide-gray-200">
        <li
            v-for="(asset, index) in assets"
            :key="index"
            class="py-2 px-2 flex hover:bg-gray-200 hover:cursor-pointer"
        >
          <div class="ml-3">
            <p class="text-base font-bold text-gray-900">
              {{ asset.institutionName }}
            </p>
            <p class="text-sm text-gray-900">Đã niêm yết (Mã CK: {{ asset.institutionSymbol }})</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="inset-0 py-3 px-2 mx-4 mb-4 bg-gray-100 rounded-lg">
      <div class="font-bold">NGUỜI THÂN</div>
      <ul role="list" class="divide-y divide-gray-200">
        <li
            v-for="(relation, index) in relations"
            :key="index"
            class="py-2 px-2 flex hover:bg-gray-200 hover:cursor-pointer"
        >
          <img class="h-13 w-13 rounded-full" :src="relation.image" alt="" />
          <div class="ml-3">
            <p class="text-base font-bold text-gray-900">
              {{ relation.relatedIndividual.name }}
            </p>
            <p class="text-sm text-gray-900">{{ relation.relationName }}</p>
            <p class="text-sm text-gray-900">{{ relation.relatedIndividual.positionName }} - {{ relation.relatedIndividual.institutionName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>


</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: 'Profile',
  props: ['bio'],
  setup(props) {
    const jobs = ref([])
    const assets = ref([])
    const relations = ref([])
    const route = useRoute()
    const memberId = route.params.id
    const bio = ref(props.bio)

    axios.get(`/api/individuals/${memberId}/jobs`).then((res) => {
      jobs.value = res.data
    })

    axios.get(`/api/individuals/${memberId}/assets`).then((res) => {
      assets.value = res.data
    })

    axios.get(`/api/individuals/${memberId}/relations`).then((res) => {
      relations.value = res.data
      for (const person of relations.value) {
        person.image =
            'https://static.fireant.vn/individuals/photo/' +
            person.relatedIndividual.individualID +
            '?width=65&height=65'
      }
    })

    return {
      jobs,
      assets,
      relations,
      bio,
    }
  },
}
</script>

<style scoped>
.profile-bio ::v-deep li {
  list-style-type: disc;
}
</style>
