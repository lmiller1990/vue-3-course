<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Title</div>
          <div class="control">
            <input v-model="title" type="text" class="input">
            {{ title }}
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column one-half">
        <div id="markdown" contenteditable @input="handleEdit" />
      </div>

      <div class="column one-half">
        <div id="content" v-html="content" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="buttons is-pulled-right">
          <button class="button is-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, watch } from '@vue/composition-api'

import { Post } from '@/types'

export default createComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
    const title = ref(props.post.title)
    const markdown = ref(props.post.markdown)
    const content = ref(props.post.content)
    let editableDiv: HTMLDivElement | null = null

    onMounted(() => {
      const div = ctx.root.$el.querySelector<HTMLDivElement>('#markdown')
      if (!div) {
        throw Error('Content Editable not found')
      }

      editableDiv = div
      div.innerText = props.post.markdown
    })

    watch(() => markdown.value, (val) => {
      content.value = val
    })

    const handleEdit = (e: any) => {
      if (!editableDiv) {
        return
      }
      markdown.value = editableDiv.innerText
    }

    return {
      title,
      markdown,
      content,
      handleEdit,
    }
  }
})

</script>

<style scoped>
#markdown, #content {
  min-height: 400px;
  border: 1px solid #dbdbdb;
  padding: calc(0.75em - 1px);
  border-radius: 4px;
}

#markdown {
  white-space: pre-wrap;
  outline: none;
}

</style>