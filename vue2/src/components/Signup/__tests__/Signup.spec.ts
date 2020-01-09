import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import Signup from '../Signup.vue'
import { NewUser } from '@/types'

describe('Signup', () => {
  it('can be submitted when all fields are valid', async (done) => {
    const wrapper = mount(Signup, {
      localVue: createTestVue()
    })
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled')

    wrapper.find('input[name="username"]').setValue('username')
    wrapper.find('input[name="username"]').trigger('keyup')
    wrapper.find('input[name="email"]').setValue('email')
    wrapper.find('input[name="email"]').trigger('keyup')
    wrapper.find('input[name="password"]').setValue('password')
    wrapper.find('input[name="password"]').trigger('keyup')

    await wrapper.vm.$nextTick()

    setTimeout(() => {
      expect(wrapper.find('button').attributes('disabled')).toBe(undefined)
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.emitted().signup[0][0]).toEqual<NewUser>({
        email: 'email',
        password: 'password',
        username: 'username'
      })
      done()
    }, 600)
  })
})
  