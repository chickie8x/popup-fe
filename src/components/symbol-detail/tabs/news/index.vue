<template>
  <div class="w-full flex flex-col bg-gray-100 overflow-auto">
    <ListNews :list-items="newsItems" @loadmoreposts="loadmore" />
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ListNews from './ListNews.vue'
export default {
  name: 'News',
  components: { ListNews },

  setup() {
    const route = useRoute()
    const symbol = ref(route.params.symbol)
    const offset = ref(0)
    const limit = ref(20)
    const newsItems = ref([])
    console.log(route.params.symbol)
    axios
      .get(
        `/api/posts?symbol=${symbol.value}&type=1&offset=${offset.value}&limit=${limit}`,
      )
      .then((res) => {
        newsItems.value = res.data
        for (const item of newsItems.value) {
          if (item.images[0].imageUrl === null) {
            const imageID = item.images[0].imageID
            item.images[0].imageUrl = `https://static.fireant.vn/posts/image/${imageID}`
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })

    function loadmore() {
      offset.value += 20
      axios
        .get(
          `/api/posts?symbol=${symbol.value}&type=1&offset=${offset.value}&limit=${limit}`,
        )
        .then((res) => {
          let addedItems = res.data
          for (const item of addedItems) {
            if (item.images[0].imageUrl === null) {
              const imageID = item.images[0].imageID
              item.images[0].imageUrl = `https://static.fireant.vn/posts/image/${imageID}`
            }
          }

          for (const item of addedItems) {
            newsItems.value.push(item)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    return {
      newsItems,
      loadmore,
    }
  },
}
</script>
