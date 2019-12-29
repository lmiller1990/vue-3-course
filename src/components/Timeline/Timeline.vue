<template>
  <nav class="panel is-primary">
    <p class="panel-tabs">
      <a

        v-for="tab in tabs"
        :data-test="tab"
        :key="tab"
        :class="[ tab === activeTab ? 'is-active' : '']"
        @click="() => setActiveTab(tab)"
      >
        {{ tab }}
      </a>
    </p>  

    <div
      v-for="post in allPosts"
      :key="post.id"
      data-test-post
    >
      <a class="panel-block">
        <div class="level">
          {{ post.title }}

        </div>
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { createComponent, ref, onUpdated, computed } from '@vue/composition-api'

import { usePosts } from '@/store/posts'
import { Period } from './types'

export default createComponent({
  name: 'Timeline.vue',

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)
    posts.actions.fetchAll()

    const allPosts = computed(() => {
      return posts.getters.allPosts()
    })

    const tabs: Period[] = ['Today', 'This Week', 'This Month']
    const activeTab = ref<Period>('Today')

    const setActiveTab = (tab: Period) => {
      activeTab.value = tab
    }

    return {
      allPosts,
      tabs,
      activeTab,
      setActiveTab,
    }
  }
})
</script>