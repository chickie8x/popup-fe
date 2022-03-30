<template>
  <div>
    <div class="sm:block">
      <nav class="flex space-x-2" aria-label="Tabs">
        <a
          v-for="(tab, idx) in tabs"
          :key="idx"
          :class="[
            current.key === tab.key
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            size === 'md' ? 'px-3 py-2 text-sm' : 'px-2 py-1.5 text-xs',
            'font-medium rounded-md cursor-pointer',
          ]"
          @click="select(tab)"
        >
          {{ tab.name }}
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CTabs',

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    tabs: {
      required: true,
      type: Array,
    },
    size: {
      type: String,
      default: 'md',
    },
  },

  setup(props, { emit }) {
    const router = useRouter()
    const current = computed({
      get: () => {
        return props.modelValue
      },
      set: (val) => {
        emit('update:modelValue', val)
      },
    })

    const select = (tab) => {
      if (tab.to) {
        router.push(tab.to)
      }
      current.value = tab
    }

    return {
      select,
      current,
    }
  },
}
</script>
