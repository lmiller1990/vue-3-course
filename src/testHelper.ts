import { createLocalVue } from '@vue/test-utils'
import Composition from '@vue/composition-api'

const createTestVue = () => {
  const localVue = createLocalVue()
  localVue.use(Composition)

  return localVue
}

export {
  createTestVue
}
