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

    <TimelineItem
      v-for="post in allPosts"
      :key="post.id"
      :post="post"
      @like="handleLike"
    >
    </TimelineItem>

    <Portal to="modal">
      <div 
        v-if="showModal"
        data-test-modal 
        class="modal is-active"
      >
        <div 
          data-test-hide-modal
          class="modal-background"
          @click="showModal = false"
        >
        </div>
        <div class="modal-content">
          <div class="card">
            <div class="section">
              Please sign up to like this post.
            </div>
          </div>
        </div>
      </div>
    </Portal>
  </nav>
</template>

<script lang="ts">
import { createComponent, ref, onUpdated, computed } from '@vue/composition-api'

import { usePosts } from '@/store/posts'
import { Period } from './types'
import { filterByPeriod } from './filters'
import TimelineItem from './TimelineItem.vue'

export default createComponent({
  name: 'Timeline.vue',

  components: {
    TimelineItem,
  },

  props: {},

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)
    posts.actions.fetchAll()

    const tabs: Period[] = ['Today', 'This Week', 'This Month']
    const activeTab = ref<Period>('Today')
    const setActiveTab = (tab: Period) => {
      activeTab.value = tab
    }

    const allPosts = computed(() =>
      filterByPeriod(activeTab.value, posts.getters.allPosts())
    )


    const showModal = ref(false)
    const authenticated = computed(() => false)
    const handleLike = ({ postId }: { postId: number }) => {
      if (authenticated.value) {
      // if authenticated, "like" a post
        return
      }

      showModal.value = true
    }

    return {
      allPosts,
      tabs,
      activeTab,
      setActiveTab,
      showModal,
      handleLike,
    }
  }
})
</script>