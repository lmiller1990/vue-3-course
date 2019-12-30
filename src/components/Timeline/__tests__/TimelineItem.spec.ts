import VueRouter from 'vue-router'
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import TimelineItem from '../TimelineItem.vue'
import { post as mockPost } from '@/resources'

const localVue = createTestVue()
localVue.use(VueRouter)

describe('TimelineItem', () => {
  it('renders information about the post', () => {
    const wrapper = mount(TimelineItem, {
      localVue,
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
      localVue,
      propsData: {
        post: mockPost
      },
    })

    wrapper.find('[data-test-likes]').trigger('click')

    expect(wrapper.emitted().like).toHaveLength(1)
    expect(wrapper.emitted().like[0]).toEqual([ { postId: 1 } ])
  })
})