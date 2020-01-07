import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import TopNav from '../TopNav.vue'

let mockAuthenticated = false
jest.mock('@/store/users', () => {
  return {
    useUsers: () => ({
      state: {
        authenticated: mockAuthenticated
      }
    })
  }
})


it('shows login and signup when user is not authenticated', () => {
  mockAuthenticated = false
  const wrapper = mount(TopNav, {
    localVue: createTestVue(),
    stubs: {
      RouterLink: true
    }
  })

  expect(wrapper.find('[data-test-login]').exists()).toEqual(true)
  expect(wrapper.find('[data-test-signup]').exists()).toEqual(true)
  expect(wrapper.find('[data-test-logout]').exists()).toEqual(false)
  expect(wrapper.find('[data-test-new-post]').exists()).toEqual(false)
})

it('shows new post and logout when user is authenticated', () => {
  mockAuthenticated = true
  const wrapper = mount(TopNav, {
    localVue: createTestVue(),
    stubs: {
      RouterLink: true
    }
  })

  expect(wrapper.find('[data-test-login]').exists()).toEqual(false)
  expect(wrapper.find('[data-test-signup]').exists()).toEqual(false)
  expect(wrapper.find('[data-test-logout]').exists()).toEqual(true)
  expect(wrapper.find('[data-test-new-post]').exists()).toEqual(true)
})