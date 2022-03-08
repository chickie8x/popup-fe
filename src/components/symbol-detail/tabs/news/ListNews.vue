<template>
  <div
    ref="scrollElement"
    class="w-full h-full overflow-scroll flex flex-col divide-y bg-gray-100"
    @scroll="sendEmit"
  >
    <ListNewsItem
      v-for="(item, index) in listItems"
      :key="index"
      :post="item"
    />
  </div>
</template>

<script>
import ListNewsItem from './ListNewsItem.vue'
import { ref } from 'vue'

export default {
  components: { ListNewsItem },

  props: {
    listItems: {
      type: Array,
      required: true,
    }
  },

  setup(_, context) {
    const scrollElement = ref(null)
    const scrollH = ref(1500)
    function sendEmit() {
      const element = scrollElement.value
      if (element.scrollTop > scrollH.value) {
        context.emit('loadmoreposts')
        scrollH.value += 1500
      }
    }
    return {
      sendEmit,
      scrollElement,
      scrollH,
    }
  },
}
</script>
