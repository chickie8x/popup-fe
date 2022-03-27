<template>
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <button
      v-for="(btn, idx) of buttons"
      :key="idx"
      type="button"
      :class="[
        'relative inline-flex items-center px-3 py-2 text-sm font-medium border',
        idx > 0 ? '-ml-px' : 'rounded-l-md',
        idx === buttons.length - 1 ? 'rounded-r-md' : '',
        classes,
      ]"
      @click="btn.handler"
    >
      {{ btn.text }}
    </button>
  </span>
</template>

<script setup>
import { computed, toRefs } from 'vue'

const typeMaps = {
  primary: 'text-white bg-indigo-600 border-indigo-700 hover:bg-indigo-700',
  white: 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300',
}

const props = defineProps({
  buttons: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: 'white',
  },
})

const { buttons } = toRefs(props)
const classes = computed(() => {
  return typeMaps[props.type]
})
</script>

<script>
export default {
  name: 'TButtons',
}
</script>
