<template>
  <button
    class="inline-flex items-center px-3 py-2 shadow-sm text-xs font-medium rounded"
    :class="classes"
    type="button"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, defineEmits } from 'vue'

const typeMaps = {
  primary: 'text-white bg-indigo-600 hover:bg-indigo-700',
  white: 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300 border',
}

const props = defineProps({
  type: {
    type: String,
    default: 'white',
  },
})

const emits = defineEmits(['click'])
const onClick = (e) => {
  emits('click', e)
}

const classes = computed(() => {
  return typeMaps[props.type]
})
</script>

<script>
export default {
  name: 'TButton',
}
</script>
