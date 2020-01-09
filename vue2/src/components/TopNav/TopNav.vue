<template>
  <nav class="navbar">
    <nav class="navbar-brand">
      <RouterLink 
        class="navbar-item"
        to="/"
      >  
        Vue 3 Composition API
      </RouterLink>
    </nav>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink 
              v-if="!authenticated"
              class="button"
              to="/users/new"
              data-test-signup
            >  
              Sign Up
            </RouterLink>

            <RouterLink 
              v-if="!authenticated"
              class="button"
              to="/users/login"
              data-test-login
            >  
              Log In
            </RouterLink>

            <RouterLink 
              v-if="authenticated"
              class="button"
              to="/posts/new"
              data-test-new-post
            >  
              New Post
            </RouterLink>

            <button 
              v-if="authenticated"
              class="button"
              @click="logout"
              data-test-logout
            >  
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'

import { useUsers } from '@/store/users'

export default createComponent({
  name: 'TopNav',

  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)
    const logout = () => {
      console.log('Log out')
    }

    const authenticated = computed(() => users.state.authenticated)

    return {
      logout,
      authenticated,
    }
  },
})
</script>