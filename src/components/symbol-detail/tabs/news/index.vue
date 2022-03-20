<template>
  <div
    class="w-full bg-gray-100 divide-y flex flex-col overflow-auto relative scroll-smooth"
    @scroll="infinityScroll"
  >
    <div v-for="(item, index) in items" :key="index" class="flex w-full">
      <div
        class="w-full flex pr-5 hover:bg-gray-200 cursor-pointer"
        @click="router.push({ path: `/news/${item.postID}/` })"
      >
        <div class="news-thumbnail w-[100px] h-[100px]">
          <img
            class="object-cover w-[100px] h-[fil100px] p-2"
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
              {{ new Date(item.date).toLocaleDateString() }} lúc
              {{ new Date(item.date).toLocaleTimeString() }}
            </p>
            <div class="flex items-center space-x-2 text-sm text-gray-400">
              <Likes  />
              <span>{{ item.totalLikes }}</span>
              <Replies />
              <span>{{ item.totalReplies }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Backtotop
      class="fixed top-[660px] left-1/2 bg-gray-500 bg-opacity-50 cursor-pointer"
      @click="backToTop"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import resolveImgUrl from './utils'
import Likes from '../../../svg/likes.vue'
import Replies from '../../../svg/replies.vue'
import Backtotop from '../../../svg/backtotop.vue'

export default {
  name: 'News',
  components: {
    Replies,
    Likes,
    Backtotop,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const symbol = ref(route.params.symbol)
    const offset = ref(0)
    const items = ref([])
    const lock = ref(false)

    const fetch = async () => {
      try {
        const url = `/news/?code=${symbol.value}&offset=${offset.value}&limit=20`
        const _items = (await axios.get(url)).data
        items.value = items.value.concat(_items.map(resolveImgUrl))
      } catch (err) {
        console.log(err)
      }
    }

    onMounted(() => {
      fetch()
    })

    const loadMore = () => {
      offset.value += 20
      fetch()
    }

    function infinityScroll(e) {
      let childCounts = e.srcElement.childElementCount
      if (
        e.srcElement.scrollTop >
          (childCounts - 1) * 50 - e.srcElement.clientHeight &&
        lock.value === false
      ) {
        lock.value = true
        loadMore()
        setTimeout(() => {
          lock.value = false
        }, 100)
      }
    }

    function backToTop(e) {
      e.target.parentElement.scrollTop = 0
    }

    return {
      items,
      router,
      backToTop,
      infinityScroll,
    }
  },
}
</script>
