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
        @keyup="handleValidation"
        :value="value"
        class="input"
      />
    </div>

    <span>
      <p v-if="!validity.valid" class="help is-danger">{{ validity.message }}</p>
    </span>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import debounce from 'lodash/debounce'

import { validate, Rule, Status } from './validate'

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
    },

    rules: {
      type: Array as () => Rule[],
      default: () => []
    }
  },

  setup(props, ctx) {
    const validity = reactive<Status>({
      valid: true,
      message: undefined
    })

    const handleInput = (e: any) => {
      ctx.emit('input', e.target.value)
    }

    const handleValidation = debounce(() => {
      const result = validate({ value: props.value, rules: props.rules })

      validity.valid = result.valid
      validity.message = result.message
    }, 500)

    return {
      handleInput,
      handleValidation,
      validity,
    }
  }
})
</script>
