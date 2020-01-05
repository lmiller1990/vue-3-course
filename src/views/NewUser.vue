<template>
  <Signup />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import Signup from '@/components/Signup/Signup.vue'

export default createComponent({
  name: 'NewUser',

  components: {
    Signup
  }
})
</script>