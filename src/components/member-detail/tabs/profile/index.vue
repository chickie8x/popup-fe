<template>
  <div class="border-1 border-gray-200 rounded-lg bg-white overflow-y-scroll">
    <div class="inset-0 py-3 px-2 mx-4 mb-4">
      <div class="px-2 py-2 profile-bio" v-html="bio" />
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
      v-show="relations"
      class="inset-0 py-3 px-2 mx-4 mb-4 bg-gray-100 rounded-lg"
    >
      <div class="font-bold">NGUỜI THÂN</div>
      <ul role="list" class="divide-y divide-gray-200">
        <li
          v-for="(relation, index) in relations"
          :key="index"
          class="py-2 px-2 flex hover:bg-gray-200 hover:cursor-pointer"
          @click="routeToMember(relation.relatedIndividual.individualID)"
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Profile',

  props: {
    getOfficer: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const hostImage = 'http://112.213.94.77:1995'
    const jobs = computed(() => props.getOfficer.jobs)
    const assets = computed(() => props.getOfficer.assets)
    const relations = computed(() => {
      const tmp = props.getOfficer.relations
      for (const person of tmp) {
        console.log(person)
        person.image =
          hostImage +
          `/static/individuals/` +
          person.relatedIndividual.individualID +
          '.png?width=65&height=65'
      }
      return tmp
    })
    const bio = computed(() => props.getOfficer.profile.bio)
    const router = useRouter()
    // const memberId = route.params.id

    const routeToMember = (routeMember) => {
      router.push({ path: `/entry/members/${routeMember}` })
    }

    return {
      jobs,
      assets,
      relations,
      bio,
      routeToMember,
    }
  },
}
</script>

<style scoped>
.profile-bio ::v-deep li {
  list-style-type: disc;
}
</style>
