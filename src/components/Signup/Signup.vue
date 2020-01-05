<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        name="username"
        type="text"
        label="Username"
        v-model="username"
        :rules="usernameRules"
      />
      {{ username }}

      <!-- <ValidatorInput 
        name="email"
        type="email"
        label="Email"
      />

      <ValidatorInput 
        name="password"
        type="password"
        label="Password"
      /> -->
    </form>
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

import ValidatorInput from '../ValidatorInput/ValidatorInput.vue'
import { minLength, maxLength } from '../ValidatorInput/validate'

export default createComponent({
  components: {
    ValidatorInput,
  },

  setup() {
    const username = ref('')
    const handleSubmit = () => {
    }

    return {
      usernameRules: [minLength(5), maxLength(10)],
      handleSubmit,
      username
    }
  }
})
</script>