<template>
  <svg :fill="fill" data-icon="chat" width="14" height="14" viewBox="0 0 16 16">
    <desc>chat</desc>
    <path
      d="M6 10c-1.1 0-2-.9-2-2V3H1c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1v2a1.003 1.003 0 001.71.71L5.41 13H10c.55 0 1-.45 1-1v-1.17l-.83-.83H6zm9-10H6c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h4.59l2.71 2.71c.17.18.42.29.7.29.55 0 1-.45 1-1V9c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1z"
      fill-rule="evenodd"
    />
  </svg>
</template>

<script>
import mixin from './_mixin'

export default {
  name: 'ReplyIcon',

  mixins: [mixin],
}
</script>
