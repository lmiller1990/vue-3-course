<template>
  <div id="app">
    <TopNav />

    <section class="section">
      <div class="container">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav/TopNav.vue'

export default {
  components: {
    TopNav,
  },
}
</script>

<style>
</style>
