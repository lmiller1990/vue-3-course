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
          <button class="button is-primary" @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import marked, { MarkedOptions } from 'marked'
import { highlightAuto } from 'highlight.js'
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

    const options: MarkedOptions = {
      highlight: (code: string) => {
        return highlightAuto(code).value
      }
    }
    watch(() => markdown.value, (val) => {
      marked(markdown.value, options, (err, res) => {
        if (err) {
          return
        }
        content.value = res
      })
    })

    const handleEdit = (e: any) => {
      if (!editableDiv) {
        return
      }
      markdown.value = editableDiv.innerText
    }

    const handleSubmit = () => {
      const post: Post = {
        ...props.post,
        title: title.value,
        content: content.value,
        markdown: markdown.value,
      }

      ctx.emit('submitted', post)
    }

    return {
      title,
      markdown,
      handleSubmit,
      content,
      handleEdit,
    }
  }
})

</script>

<style lang="scss">
@import '../../markdown.scss';
</style>

<style lang="scss">
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