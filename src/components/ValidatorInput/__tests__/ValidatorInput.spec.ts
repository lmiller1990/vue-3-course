import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import ValidatorInput from '../ValidatorInput.vue'

describe('ValidatorInput', () => {
  it('emits an event with current value', async () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username',
        value: '',
      }
    })

    wrapper.find('input').setValue('some-value')

    expect(wrapper.emitted().input[0][0]).toBe('some-value')
  })
})