<template>
  <div class="flex w-full">
    <div
      class="w-full px-2 py-4 flex flex-col hover:bg-gray-200 cursor-pointer  sm:flex-row sm:pr-5 sm:px-0 sm:py-0"
      @click="router.push({ path: `/entry/news/${item.postID}` })"
    >
      <div class="w-full sm:w-[100px] sm:h-[100px]">
        <img
          class="object-cover w-full sm:w-[100px] sm:h-[100px]"
          :src="imageSrc(item)"
          alt
        />
      </div>
      <div class="general-info sm:ml-2 flex-1 w-full">
        <div v-if='item.taggedSymbols[0]' class=" text-left my-2 ml-0">
          <span class="text-sm mr-1 text-gray-500">{{ item.taggedSymbols[0]?.symbol }}</span>
          <span
           :class="[item.taggedSymbols[0]?.percentChange.toFixed(2) >= 0?'text-green-600':'text-red-600', 'text-sm']"
          >
            {{ item.taggedSymbols[0]?.percentChange.toFixed(2) }}%
          </span>
        </div>
        <p class="text-left text-base font-semibold mb-2">{{ item.title }}</p>
        <div class="flex justify-between">
          <p class="text-sm text-gray-500">
            {{ $filters.formatDateAtTime(item.date) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NewItem',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const router = useRouter()
    const imageSrc = (item) => {
      return `${import.meta.env.VITE_IMAGE_URL}/${
        item.image_map[0]?.image_path
      }`
    }
    return {
      router,
      imageSrc,
    }
  },
}
</script>
