<template>
  <div>
    <VueTradingView />
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view/src/index'

export default {
  name: 'TechnicalChart',

  components: {
    VueTradingView,
  },
}
</script>
