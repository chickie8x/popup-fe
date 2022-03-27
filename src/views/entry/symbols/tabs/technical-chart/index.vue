<template>
  <div class="overflow-auto">
    <div id="trading-view" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'TechnicalChart',

  setup() {
    // data
    const route = useRoute()
    const initOption = async () => {
      const data = await axios.get(`/profile/${route.params.symbol}`)
      const { symbol } = data
      const options = {
        width: 860,
        height: 490,
        symbol: symbol,
        locale: 'vi',
        container_id: 'trading-view',
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
          `${import.meta.env.VITE_API_URL}/chart`,
        ),
        library_path: '/tv/',
      }
      new window.TradingView.widget(options)
    }
    onMounted(() => {
      initOption()
    })
  },
}
</script>
