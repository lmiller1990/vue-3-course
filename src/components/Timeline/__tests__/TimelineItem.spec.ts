import VueRouter from 'vue-router'
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import TimelineItem from '../TimelineItem.vue'
import { post as mockPost } from '@/resources'

describe('TimelineItem', () => {
  it('renders information about the post', () => {
    const wrapper = mount(TimelineItem, {
      localVue: createTestVue(),
      router: new VueRouter({ mode: 'history' }),
      propsData: {
        post: mockPost
      },
    })

    expect(wrapper.find({ name: 'RouterLink' }).attributes('href')).toEqual('/posts/1')
    expect(wrapper.find('[data-test-author]').text()).toContain('Lachlan')
    expect(wrapper.find('[data-test-likes]').text()).toEqual('10')
  })

  it('emits a like event when like is clicked', () => {
    const wrapper = mount(TimelineItem, {
      router: new VueRouter({ mode: 'history' }),
      localVue: createTestVue(),
      propsData: {
        post: mockPost
      },
    })

    wrapper.find('[data-test-likes]').trigger('click')

    expect(wrapper.emitted().like).toHaveLength(1)
  })
})