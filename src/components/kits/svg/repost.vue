<template>
  <svg data-icon="link" width="16" height="16" viewBox="0 0 16 16" class="mr-2">
    <desc>link</desc>
    <path
      d="M15 0H5c-.55 0-1 .45-1 1v2h2V2h8v7h-1v2h2c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zm-4 4H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 10H2V6h8v8z"
      fill-rule="evenodd"
      :fill="fill"
    />
  </svg>
</template>

<script>
import mixin from './_mixin'

export default {
  name: 'RepostIcon',

  mixins: [mixin],
}
</script>
