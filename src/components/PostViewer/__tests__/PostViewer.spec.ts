import { mount, } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import PostViewer from '../PostViewer.vue'
import { post } from '@/resources'
import VueRouter from 'vue-router'

describe('Signup', () => {
  it('can be submitted when all fields are valid', async () => {
    const localVue = createTestVue()
    localVue.use(VueRouter)
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
})
  