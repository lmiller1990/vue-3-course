import { mount, } from '@vue/test-utils'
import VueRouter from 'vue-router'

import { createTestVue } from '@/testHelper'
import PostViewer from '../PostViewer.vue'
import { post, userA as mockUserA } from '@/resources'

jest.mock('@/store/users', () => {
  return {
    useUsers: () => ({
      getters: {
        currentUser: () => ({
          ...mockUserA,
          id: 1
        })
      }
    })
  }
})


describe('PostViewer', () => {
  const localVue = createTestVue()
  localVue.use(VueRouter)

  it('can be submitted when all fields are valid', async () => {
    const wrapper = mount(PostViewer, {
      localVue,
      router: new VueRouter(),
      propsData: {
        post: {
          ...post,
          title: 'Title',
          markdown: '<div>OK</div>'
        }
      }
    })

    expect(wrapper.find('h1').text()).toBe('Title')
    expect(wrapper.find('.post-html').element.innerHTML).toBe('<div>OK</div>')
  })

  it('shows edit button when authorized', async () => {
    const wrapper = mount(PostViewer, {
      localVue,
      router: new VueRouter(),
      propsData: {
        post: {
          ...post,
          authorId: 1,
          title: 'Title',
          markdown: '<div>OK</div>'
        }
      }
    })

    expect(wrapper.find('[data-edit]').exists()).toBe(true)
  })

  it('does not show edit button when not authorized', async () => {
    const wrapper = mount(PostViewer, {
      localVue,
      router: new VueRouter(),
      propsData: {
        post: {
          ...post,
          authorId: 2,
          title: 'Title',
          markdown: '<div>OK</div>'
        }
      }
    })

    expect(wrapper.find('[data-edit]').exists()).toBe(false)
  })
})
  