<template>
  <a class="panel-block">
    <div class="level">
      {{ post.title }}
    </div>
  </a>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { Post } from '@/types'

export default createComponent({
  name: 'TimelineItem',

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
  }
})
</script>