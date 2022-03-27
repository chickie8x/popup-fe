<template>
  <div class="overflow-auto table-heigh">
    <table class="min-w-full divide-y divide-gray-300 overflow-auto">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(key, idx) of keys"
            :key="idx"
            scope="col"
            class="sticky top-0 bg-gray-200 whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            {{ headers[key].title || key }}
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(item, idx) in items" :key="idx">
          <td
            v-for="(key, kdx) of keys"
            :key="`${idx}_${kdx}`"
            class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500"
            :class="itemClasses(key, item)"
          >
            {{ itemValue(key, item) }}
          </td>
        </tr>
        <tr>
          <infinite-loading @infinite="onInfinite">
            <template #spinner>Đang tải...</template>
            <template #no-more />
            <template #no-results>Không có dữ liêu</template>
          </infinite-loading>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
  name: 'CTable',

  props: {
    heigh: {
      type: String,
      required: true,
    },
    headers: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const { headers } = toRefs(props)
    const keys = computed(() => {
      if (!headers?.value) {
        return []
      }
      return Object.keys(headers.value)
    })

    const itemValue = (key, item) => {
      const config = headers.value[key]
      if (config.valueFn) {
        return config.valueFn(item)
      }

      if (config.key) {
        return item[config.key]
      }

      return item[key]
    }

    const itemClasses = (key, item) => {
      const config = headers.value[key]
      const classes = config.classes

      if (typeof classes === 'function') {
        return classes(item)
      }

      return classes
    }

    const onInfinite = ($state) => {
      emit('onInfinite', $state)
    }

    return {
      keys,
      itemValue,
      onInfinite,
      itemClasses,
    }
  },
}
</script>

<style scoped>
.table-heigh {
  height: v-bind(heigh);
}
</style>
