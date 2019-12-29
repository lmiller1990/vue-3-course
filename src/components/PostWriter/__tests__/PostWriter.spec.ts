import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import PostWriter from '@/components/PostWriter/PostWriter.vue'

describe('PostWriter', () => {
  it('renders', () => {
    const wrapper = mount(PostWriter, {
      localVue: createTestVue(),
    })
  })
})
