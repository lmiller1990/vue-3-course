import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { post } from '@/resources'

describe('PostWriter', () => {
  it('converts the post content to markdown on first render', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createTestVue(),
      propsData: {
        post: {
          ...post,
          markdown: '# My great post!\nThis is a *really exciting* post.',
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('#content').element.innerHTML
    ).toEqual(
      '<h1 id="my-great-post">My great post!</h1>\n<p>This is a <em>really exciting</em> post.</p>\n'
    )
  })

  it('updates the preview when markdown is updated', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createTestVue(),
      propsData: {
        post: {
          ...post,
          markdown: '# My great post!\nThis is a *really exciting* post.',
        }
      }
    })

    await wrapper.vm.$nextTick()
    wrapper.find('#markdown').element.innerText = '## My new post'
    wrapper.find('#markdown').trigger('input')
    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('#content').element.innerHTML
    ).toEqual(
      '<h2 id="my-new-post">My new post</h2>\n'
    )
  })
})
