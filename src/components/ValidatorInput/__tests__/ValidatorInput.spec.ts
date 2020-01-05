import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import ValidatorInput from '../ValidatorInput.vue'
import { minLength } from '../validate'

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

  it('shows an error when invalid', async (done) => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username',
        value: 'val',
        rules: [minLength(4)]
      }
    })

    wrapper.find('input').trigger('keyup')

    await wrapper.vm.$nextTick()

    setTimeout(() => {
      expect(wrapper.find('.is-danger').text()).toEqual(
        'The value is too short. Minimum length is 4.'
      )
      done()
    }, 600)
  })

  it('shows no error when valid', async (done) => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username',
        value: 'hello',
        rules: [minLength(4)]
      }
    })

    wrapper.find('input').trigger('keyup')

    await wrapper.vm.$nextTick()

    setTimeout(() => {
      expect(wrapper.find('.is-danger').exists()).toEqual(false)
      done()
    }, 600)
  })
})