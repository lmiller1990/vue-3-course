<template>
  <a class="panel-block">
    <div class="level">
      <div>
        <div>
          <RouterLink 
            :to="link"
            class="link"
          >
            {{ post.title }}
          </RouterLink>
        </div>
        <span data-test-author>
          {{ ` ${post.created.format('Do MMM')} by ${author}.` }}
        </span>
        <span data-test-likes @click="handleLike">
          <i class="far fa-thumbs-up" />
          {{ post.likes }}
        </span>
      </div>
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
    const link = `/posts/${props.post.id}`
    const author = 'Lachlan'
    const handleLike = () => {
      ctx.emit('like', { postId: props.post.id })
    }

    return {
      link,
      author,
      handleLike,
    }
  }
})
</script>