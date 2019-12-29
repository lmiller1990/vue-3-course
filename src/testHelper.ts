import VueRouter from 'vue-router'
import { createLocalVue } from '@vue/test-utils'
import Composition from '@vue/composition-api'

const createTestVue = () => {
  const localVue = createLocalVue()
  localVue.use(Composition)
  localVue.use(VueRouter)

  return localVue
}

export {
  createTestVue
}
