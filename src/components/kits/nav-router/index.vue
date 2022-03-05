<template>
  <div class="flex gap-2">
    <button
      v-for="(button, idx) of buttons"
      :key="idx"
      type="button"
      class="inline-flex items-center p-1 border border-transparent rounded-md shadow-sm text-white bg-gray-300 hover:bg-gray-400"
      @click="button.handler"
    >
      <component :is="button.icon" class="h-5 w-5" aria-hidden="true" />
    </button>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'

export default {
  name: 'NavRouter',

  setup() {
    const router = useRouter()
    const buttons = [
      {
        icon: ChevronLeftIcon,
        handler: () => router.go(-1),
      },
      {
        icon: ChevronRightIcon,
        handler: () => router.go(),
      },
    ]

    return {
      buttons,
    }
  },
}
</script>
