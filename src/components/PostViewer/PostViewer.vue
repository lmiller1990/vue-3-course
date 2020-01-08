<template>
  <div class="columns">
    <div class="column"></div>

    <div class="column is-two-thirds">

      <div class="columns">
        <div class="column">
          <div class="is-pulled-right">
            <RouterLink class="button is-rounded is-link" to="#">
              <i class="fas fa-edit" />
            </RouterLink>

            <div class="button is-rounded is-success">
              <i class="fas fa-share" />
            </div>

            <div class="button is-rounded is-info">
              <i class="far fa-thumbs-up" />
            </div>
          </div>
        </div>
      </div>

      <h1 class="title">
        {{ post.title }}
      </h1>

      <div class="post-html" v-html="post.markdown" />
    </div>

    <div class="column"></div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, reactive } from '@vue/composition-api'

import { Post } from '../../types'

export default createComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
    return {
    }
  }
})
</script>
