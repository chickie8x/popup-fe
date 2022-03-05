<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-400">
    <iframe
      :src="ifSrc"
      style="width: 900px; height: 700px"
      class="rounded-lg shadow-lg"
    />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const symbol = route.symbol || 'FPT'
    const ifSrc = `/entry/symbols/${symbol.toUpperCase()}`
    return {
      ifSrc,
    }
  },
}
</script>
