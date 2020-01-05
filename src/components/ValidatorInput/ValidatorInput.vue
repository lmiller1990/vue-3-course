<template>
  <div class="field">
    <label class="label">
      {{ label }}
    </label>
    <div class="control">
      <input 
        :type="type" 
        :name="name"
        @input="handleInput"
        :value="value"
        class="input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    }
  },

  setup(props, ctx) {
    const handleInput = (e: any) => {
      ctx.emit('input', e.target.value)
    }

    return {
      handleInput,
    }
  }
})
</script>
