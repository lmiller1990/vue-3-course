<template>
  <p class="panel-tabs">
    <a
      v-for="tab in tabs"
      :key="tab"
      :class="[ tab === activeTab ? 'is-active' : 'active']"
      @click="() => setActiveTab(tab)"
    >
      {{ tab }}
    </a>
  </p>  
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

import { Period } from './types'

export default createComponent({
  name: 'Timeline.vue',

  setup() {
    const tabs: Period[] = ['Today', 'This Week', 'This Month']
    const activeTab = ref<Period>('Today')

    const setActiveTab = (tab: Period) => {
      activeTab.value = tab
    }

    return {
      tabs,
      activeTab,
      setActiveTab,
    }
  }
})
</script>