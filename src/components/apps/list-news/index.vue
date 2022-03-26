<template>
  <div
    class="w-full bg-gray-100 divide-y flex flex-col overflow-auto relative scroll-smooth"
  >
    <NewItem v-for="(item, idx) of items" :key="idx" :item="item" />
    <infinite-loading @infinite="loadMore">
      <template #spinner>Đang tải...</template>
      <template #no-more />
      <template #no-results>Không có bài viết</template>
    </infinite-loading>
    <ChevronUpIcon
      class="fixed bottom-[16px] left-1/2 bg-gray-500 bg-opacity-50 cursor-pointer"
      @click="backToTop"
    />
  </div>
</template>

<script>
import toVue3 from 'vue-2-3/to-vue-3'
import axios from 'axios'
import { ref } from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import Vue2 from 'vue2'
import * as Vue3 from 'vue'
import NewItem from './new-item/index.vue'
import { buildQuery } from '../../../utils/strings.js'
toVue3.register(Vue2, Vue3)

export default {
  name: 'ListNews',

  components: {
    NewItem,
    InfiniteLoading: toVue3(InfiniteLoading),
  },

  props: {
    code: {
      type: String,
      required: false,
      default: () => null,
    },
    individualId: {
      type: [String, Number],
      required: false,
      default: () => null,
    },
  },

  setup(props) {
    const offset = ref(0)
    const items = ref([])
    const fetch = async () => {
      try {
        const query = {
          code: props.code,
          offset: offset.value,
          limit: 20,
        }
        const url = `/news?${buildQuery(query)}`
        return (await axios.get(url)).data
      } catch (err) {
        console.log(err)
        return []
      }
    }

    const loadMore = async ($state) => {
      const _items = await fetch()
      if (_items.length) {
        items.value = items.value.concat(_items)
        offset.value += 20 // update for next time
        $state.loaded()
      } else {
        $state.complete()
      }
    }

    const backToTop = (e) => {
      e.target.parentElement.scrollTop = 0
    }

    return {
      items,
      loadMore,
      backToTop,
    }
  },
}
</script>
