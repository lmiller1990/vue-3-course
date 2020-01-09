<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        name="username"
        type="text"
        label="Username"
        v-model="username"
        :rules="usernameRules"
        @validate="handleValidate"
      />

      <ValidatorInput 
        name="email"
        type="email"
        label="Email"
        v-model="email"
        :rules="usernameRules"
        @validate="handleValidate"
      />

      <ValidatorInput 
        name="password"
        type="password"
        label="Password"
        v-model="password"
        :rules="passwordRules"
        @validate="handleValidate"
      />

      <button 
        class="button is-primary"
        type="submit"
        :disabled="!formValid"
      >
        Submit
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { createComponent, ref, reactive } from '@vue/composition-api'

import ValidatorInput from '../ValidatorInput/ValidatorInput.vue'
import { minLength, maxLength } from '../ValidatorInput/validate'
import { NewUser } from '@/types'

type Name = 'username' | 'password' | 'email'

interface ValidatedInput {
  name: Name
  valid: boolean
}

type FormValidationState = {
  [key in Name]: boolean
}

export default createComponent({
  components: {
    ValidatorInput,
  },

  setup(props, ctx) {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const formValid = ref(false)
    const formValidationState = reactive<FormValidationState>({
      username: false,
      email: false,
      password: false,
    })

    const handleSubmit = () => {
      const newUser: NewUser = {
        username: username.value,
        email: email.value,
        password: password.value,
      }
      ctx.emit('signup', newUser)
    }

    const handleValidate = (validated: ValidatedInput) => {
      formValidationState[validated.name] = validated.valid
      formValid.value = Object.values(formValidationState).every(x => x)
    }

    return {
      usernameRules: [minLength(5), maxLength(10)],
      passwordRules: [minLength(8), maxLength(255)],
      formValid,
      handleValidate,
      handleSubmit,
      username,
      email,
      password,
    }
  }
})
</script>