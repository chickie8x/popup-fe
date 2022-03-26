<template>
  <div
    v-if="profile"
    class="border-1 border-gray-200 rounded-lg bg-white overflow-y-scroll"
  >
    <div class="inset-0 py-3 px-2 mx-4 mb-4">
      <div class="px-2 py-2 profile-bio" v-html="profile.bio" />
    </div>

    <div
      v-show="jobs"
      class="inset-0 py-3 px-2 mx-4 mb-4 bg-gray-100 rounded-lg"
    >
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
            <p v-if="job.institutionSymbol" class="text-sm text-gray-900">
              {{ job.institutionName }} (Mã CK:
              <router-link
                :to="`/entry/symbols/${job.institutionSymbol}`"
                class="text-sky-700 hover:underline"
              >
                {{ job.institutionSymbol }} </router-link
              >)
            </p>
            <p v-else class="text-sm text-gray-900">
              {{ job.institutionName }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div
      v-show="assets"
      class="inset-0 py-3 px-2 mx-4 mb-4 bg-gray-100 rounded-lg"
    >
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
            <p class="text-sm text-gray-900">
              Đã niêm yết (Mã CK:
              <router-link
                :to="`/entry/symbols/${asset.institutionSymbol}`"
                class="text-sky-700 hover:underline"
              >
                {{ asset.institutionSymbol }} </router-link
              >)
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div
      v-show="relations.length"
      class="inset-0 py-3 px-2 mx-4 mb-4 bg-gray-100 rounded-lg"
    >
      <div class="font-bold">NGUỜI THÂN</div>
      <ul role="list" class="divide-y divide-gray-200">
        <router-link
          v-for="(relation, index) in relations"
          :key="index"
          class="py-2 px-2 flex hover:bg-gray-200 hover:cursor-pointer"
          :to="{
            name: 'members-detail',
            params: { id: relation.relatedIndividual.individualID },
          }"
        >
          <img class="h-13 w-13 rounded-full" :src="relation.image" alt="" />
          <div class="ml-3">
            <p class="text-base font-bold text-gray-900">
              {{ relation.relatedIndividual.name }}
            </p>
            <p class="text-sm text-gray-900">{{ relation.relationName }}</p>
            <p
              v-if="relation.relatedIndividual.institutionSymbol"
              class="text-sm text-gray-900"
            >
              {{ relation.relatedIndividual.positionName }} -
              {{ relation.relatedIndividual.institutionName }} (Mã CK:
              <router-link
                :to="`/entry/symbols/${relation.relatedIndividual.institutionSymbol}`"
                class="text-sky-700 hover:underline"
              >
                {{ relation.relatedIndividual.institutionSymbol }} </router-link
              >)
            </p>
            <p v-else class="text-sm text-gray-900">
              {{ relation.relatedIndividual.positionName }} -
              {{ relation.relatedIndividual.institutionName }}
            </p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Profile',

  setup() {
    const route = useRoute()
    const profile = ref(null)
    const jobs = ref([])
    const assets = ref([])
    const relations = ref([])
    const memberId = route.params.id

    const prepareData = (data) => {
      profile.value = data.profile
      jobs.value = data.jobs
      assets.value = data.assets
      relations.value = data.relations.map((item) => {
        item.image =
          'http://112.213.94.77:1995/static/individuals/' +
          item.relatedIndividual.individualID +
          '.png?width=65&height=65'
        return item
      })
    }

    onMounted(async () => {
      const data = (await axios.get(`individual/${memberId}`)).data
      prepareData(data)
    })

    return {
      jobs,
      assets,
      profile,
      relations,
    }
  },
}
</script>

<style scoped>
.profile-bio ::v-deep li {
  list-style-type: disc;
  margin-left: 35px;
}
</style>
