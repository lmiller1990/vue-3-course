<template>
  <PostWriter
    :post="post"
  />
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'

import { usePosts } from '@/store/posts'
import { Post } from '../types'
import PostWriter from '@/components/PostWriter/PostWriter.vue'


export default createComponent({
  name: 'EditPost',
  
  components: {
    PostWriter,
  },

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)
    const id = ctx.root.$route.params.id
    if (!posts.state.all[id]) {
      posts.actions.getById(parseInt(id, 10))
    }
    const post = computed(() => posts.state.all[id])

    return {
      post,
    }
  },
})
</script>