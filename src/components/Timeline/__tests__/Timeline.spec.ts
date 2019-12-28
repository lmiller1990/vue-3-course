import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Composition from '@vue/composition-api'
Vue.use(Composition)

import Timeline from '../Timeline.vue'

describe('Timeline', () => {
  it('changes active tab when clicked', async () => {
    const wrapper = mount(Timeline)
    expect(wrapper.find('[data-test="Today"]').classes()).toContain('is-active')

    wrapper.findAll('[data-test="This Week"').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="This Week"]').classes()).toContain('is-active')
  })
})