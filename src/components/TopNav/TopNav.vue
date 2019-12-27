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
              class="button"
              to="/users/new"
            >  
              Sign Up
            </RouterLink>

            <RouterLink 
              class="button"
              to="/users/login"
            >  
              Log In
            </RouterLink>

            <RouterLink 
              class="button"
              to="/posts/new"
            >  
              New Post
            </RouterLink>

            <button 
              class="button"
              @click="logout"
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
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'TopNav',

  setup() {
    const logout = () => {
      console.log('Log out')
    }

    return {
      logout,
    }
  },
})
</script>