<template>
  <div v-if="!post">
    Loading...
  </div>

  <PostViewer v-else
    :post="post"
  />
</template>

<script lang="ts">
import { ref, createComponent, computed, watch } from '@vue/composition-api'

import { usePosts } from '@/store/posts'
import { Post } from '../types'
import PostViewer from '@/components/PostViewer/PostViewer.vue'


export default createComponent({
  name: 'ShowPost',
  
  components: {
    PostViewer,
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