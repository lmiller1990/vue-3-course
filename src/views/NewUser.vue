<template>
  <Signup @signup="handleSignup" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import Signup from '@/components/Signup/Signup.vue'
import { NewUser } from '@/types'

export default createComponent({
  name: 'NewUser',

  components: {
    Signup
  },

  setup(props, ctx) {
    const handleSignup = (newUser: NewUser) => {
      // ... dispatch createUser action
    }

    return {
      handleSignup,
    }
  }
})
</script>