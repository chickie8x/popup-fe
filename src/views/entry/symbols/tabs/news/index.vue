<template>
  <ListNews :code="symbol" />
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ListNews from '../../../../../components/apps/list-news/index.vue'

export default {
  name: 'News',

  components: {
    ListNews,
  },

  setup() {
    const route = useRoute()
    const symbol = ref(route.params.symbol)

    return {
      symbol,
    }
  },
}
</script>
