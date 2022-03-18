<template>
  <div>
    <VueTradingView v-if="options" :options="options" />
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view/src/index'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'TechnicalChart',

  components: {
    VueTradingView,
  },

  setup() {
    // data
    const route = useRoute()
    const profile = ref(null)
    const symbol = route.params.symbol
    const options = ref(null)

    // methods
    const fetchProfile = async () => {
      profile.value = await (await axios.get(`/profile/${symbol}`)).data
      options.value = {
        symbol: `${profile.value.exchange}:${profile.value.symbol}`,
      }
    }
    onMounted(() => {
      fetchProfile()
    })
    return {
      profile,
      options,
    }
  },
}
</script>
