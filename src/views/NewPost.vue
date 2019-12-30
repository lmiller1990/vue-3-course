<template>
  <PostWriter 
    :post="newPost" 
    @submitted="handleSubmit"
  />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import moment from 'moment'

import { Post } from '@/types'
import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { usePosts } from '@/store/posts'

export default createComponent({
  name: 'NewPost',

  components: {
    PostWriter
  },

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)

    const newPost: Post = {
      id: 0,
      title: '',
      markdown: '# My great post!\nThis is a *really exciting* post.',
      tags: [],
      content: '',
      created: moment(),
      authorId: 1,
      likes: 0,
    }

    const handleSubmit = (post: Post) => {
      posts.actions.create(post)
    }

    return {
      newPost,
      handleSubmit,
    }
  }
})
</script>