<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        name="username"
        type="text"
        label="Username"
        v-model="username"
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

export default createComponent({
  components: {
    ValidatorInput,
  },

  setup() {
    const username = ref('Lachlan')
    const handleSubmit = () => {
    }

    return {
      handleSubmit,
      username
    }
  }
})
</script>