<template>
  <PostWriter :post="newPost" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import moment from 'moment'

import { Post } from '@/types'
import PostWriter from '@/components/PostWriter/PostWriter.vue'

export default createComponent({
  name: 'NewPost',

  components: {
    PostWriter
  },

  setup() {
    const newPost: Post = {
      id: 0,
      title: '',
      content: '',
      tags: [],
      markdown: '',
      created: moment(),
      authorId: 0,
      likes: 0,
    }

    return {
      newPost,
    }
  }
})
</script>