<template>
  <div>Write your new post</div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { Post } from '@/types'

export default createComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  }
})