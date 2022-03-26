<template>
  <div class="flex w-full">
    <div
      class="w-full flex pr-5 hover:bg-gray-200 cursor-pointer"
      @click="router.push({ path: `/entry/news/${item.postID}` })"
    >
      <div class="news-thumbnail w-[100px] h-[100px]">
        <img
          class="object-cover w-[100px] h-[100px] p-2"
          :src="imageSrc(item)"
          alt
        />
      </div>
      <div class="general-info ml-2 flex-1">
        <p class="mb-2">
          <span class="text-sm mr-1">{{ item.taggedSymbols[0].symbol }}</span>
          <span
            v-if="item.taggedSymbols[0].percentChange.toFixed(2) >= 0"
            class="text-green-600 text-sm"
          >
            +{{ item.taggedSymbols[0].percentChange.toFixed(2) }}%
          </span>
          <span v-else class="text-red-600 text-sm">
            {{ item.taggedSymbols[0].percentChange.toFixed(2) }}%
          </span>
        </p>
        <p class="text-base font-semibold mb-2">{{ item.title }}</p>
        <div class="flex justify-between">
          <p class="text-sm text-gray-500">
            {{ $filters.formatDateAtTime(item.date) }}
          </p>
          <div class="flex items-center space-x-2 text-sm text-gray-400">
            <LikeIcon />
            <span>{{ item.totalLikes }}</span>
            <ReplyIcon />
            <span>{{ item.totalReplies }}</span>
          </div>
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
