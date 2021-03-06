import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import Timeline from '../Timeline.vue'
import TimelineItem from '../TimelineItem.vue'
import { post as mockPost } from '@/resources'

const mockFetchAll = jest.fn()

jest.mock('@/store/posts', () => {
  return {
    usePosts: () => ({
      actions: {
        fetchAll: mockFetchAll
      },
      getters: {
        allPosts: () => [mockPost]
      }
    })
  }
})

describe('Timeline', () => {
  beforeEach(() => {
    mockFetchAll.mockReset()
  })

  it('changes active tab when clicked', async () => {
    const wrapper = mount(Timeline, {
      localVue: createTestVue(),
      stubs: {
        RouterLink: true,
        Portal: true
      }
    })
    expect(wrapper.find('[data-test="Today"]').classes()).toContain('is-active')

    wrapper.findAll('[data-test="This Week"').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="This Week"]').classes()).toContain('is-active')
  })

  it('renders posts', async () => {
    const wrapper = mount(Timeline, {
      localVue: createTestVue(),
      stubs: {
        RouterLink: true,
        Portal: true
      }
    })
    expect(wrapper.find('[data-test="Today"]').classes()).toContain('is-active')

    expect(mockFetchAll).toHaveBeenCalled()
    expect(wrapper.findAll(TimelineItem)).toHaveLength(1)
  })

  it('shows and hides a modal', async () => {
    const wrapper = mount(Timeline, {
      localVue: createTestVue(),
      stubs: {
        RouterLink: true,
        Portal: true
      }
    })
    expect(wrapper.find('[data-test-modal]').exists()).toEqual(false)

    wrapper.find('[data-test-likes]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test-modal]').exists()).toEqual(true)

    wrapper.find('[data-test-hide-modal]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test-modal]').exists()).toEqual(false)
  })
})