<template>
  <div>
    <div class="hidden sm:block">
      <nav class="flex space-x-2" aria-label="Tabs">
        <a
          v-for="(tab, idx) in tabs"
          :key="idx"
          :class="[
            current.key === tab.key
              ? 'bg-gray-100 text-gray-700'
              : 'text-gray-500 hover:text-gray-700',
            'px-3 py-2 font-medium text-sm rounded-md cursor-pointer',
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
import { computed } from 'vue';

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
  },

  setup(props, { emit }) {
    const current = computed({
      get: () => {
        return props.modelValue;
      },
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    const select = (tab) => {
      current.value = tab;
    };

    return {
      select,
      current,
    };
  },
};
</script>
