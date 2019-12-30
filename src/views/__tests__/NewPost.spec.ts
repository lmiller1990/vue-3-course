import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import NewPost from '../NewPost.vue'
import PostWriter from '@/components/PostWriter/PostWriter.vue'

const mockCreate = jest.fn()

jest.mock('@/store/posts', () => {
  return {
    usePosts: () => ({
      actions: {
        create: mockCreate
      },
    })
  }
})

describe('NewPost', () => {
  it('renders a post writer', () => {
    const wrapper = mount(NewPost, {
      localVue: createTestVue(),
    })

    expect(wrapper.find(PostWriter).exists()).toBe(true)
  })
  
  it('calls a create action when a post is submitted', async () => {
    const wrapper = mount(NewPost, {
      localVue: createTestVue(),
    })

    wrapper.find(PostWriter).find('button').trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(mockCreate).toHaveBeenCalled()
  })
})
