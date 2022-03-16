<template>
  <div
    class="w-full bg-gray-100 divide-y flex flex-col overflow-auto"
    @scroll="infinityScroll;"
  >
    <div v-for="(item, index) in newsItems" :key="index" class="flex w-full">
      <div
        class="w-full flex pr-5 hover:bg-gray-200 cursor-pointer"
        @click="routeToPost(item.postID)"
      >
        <div class="news-thumbnail w-[100px] h-[100px]">
          <img
            class="object-cover w-[100px] h-[100px] p-2"
            :src="item.image_map[0].image_path"
            alt
          />
        </div>
        <div class="general-info ml-2 flex-1">
          <p class="mb-2">
            <span class="text-sm mr-1">{{ item.taggedSymbols[0].symbol }}</span>
            <span
              v-if="item.taggedSymbols[0].percentChange.toFixed(2) >= 0"
              class="text-green-600 text-sm"
              >+{{ item.taggedSymbols[0].percentChange.toFixed(2) }}%</span
            >
            <span v-else class="text-red-600 text-sm"
              >{{ item.taggedSymbols[0].percentChange.toFixed(2) }}%</span
            >
          </p>
          <p class="text-base font-semibold mb-2">{{ item.title }}</p>
          <div class="flex justify-between">
            <p class="text-sm text-gray-500">
              {{ new Date(item.date).toLocaleDateString() }} lúc
              {{ new Date(item.date).toLocaleTimeString() }}
            </p>
            <div class="flex items-center space-x-2 text-sm text-gray-400">
              <Likes fill="#a7b6c2" />
              <span>{{ item.totalLikes }}</span>
              <Replies fill="#a7b6c2" />
              <span>{{ item.totalReplies }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import resolveImgUrl from './utils'
import Likes from '../../../svg/likes.vue'
import Replies from '../../../svg/replies.vue'

export default {
  name: 'News',
  components: {
    Replies,
    Likes,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const symbol = ref(route.params.symbol)
    const offset = ref(0)
    const limit = ref(20)
    const newsItems = ref([])
    // const iconColor = ref('')

    axios
      .get(
        `/news/?code=${symbol.value}&offset=${offset.value}&limit=${limit.value}`,
      )
      .then((res) => {
        newsItems.value = res.data
        resolveImgUrl(newsItems.value)
        lastItemsCount.value = newsItems.value.length
      })
      .catch((err) => {
        console.log(err)
      })

    function loadmore() {
      // offset.value += 20;
      axios
        .get(
          `/news/?code=${symbol.value}&offset=${offset.value}&limit=${limit.value}`,
        )
        .then((res) => {
          let addedItems = res.data
          resolveImgUrl(addedItems)
          for (const item of addedItems) {
            newsItems.value.push(item)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const routeToPost = (routePost) => {
      router.push({ path: `/news/${routePost}/` })
    }

    function infinityScroll(e) {
      let childCounts = e.srcElement.childElementCount
      if (
        e.srcElement.scrollTop >
        childCounts * 100 - e.srcElement.clientHeight
      ) {
        loadmore()
      }
    }

    return {
      newsItems,
      loadmore,
      routeToPost,
      infinityScroll,
    }
  },
}
</script>
