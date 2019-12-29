import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import NewPost from '../NewPost.vue'
import PostWriter from '@/components/PostWriter/PostWriter.vue'

describe('NewPost', () => {
  it('renders a post writer', () => {
    const wrapper = mount(NewPost, {
      localVue: createTestVue(),
    })

    expect(wrapper.find(PostWriter).exists()).toBe(true)
  })
})
