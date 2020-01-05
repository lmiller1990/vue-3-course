<template>
  <Signup @signup="handleSignup" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import Signup from '@/components/Signup/Signup.vue'
import { NewUser } from '@/types'
import { useUsers } from '@/store/users'

export default createComponent({
  name: 'NewUser',

  components: {
    Signup
  },

  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)
    const handleSignup = async (newUser: NewUser) => {
      // ... dispatch createUser action
      await users.actions.signup(newUser)
      ctx.root.$router.push('/')
    }

    return {
      handleSignup,
    }
  }
})
</script>