import Vue from 'vue'
import CompositionAPI from '@vue/composition-api'
import VuePortal from 'portal-vue'
import 'highlight.js/styles/github.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VuePortal)
Vue.use(CompositionAPI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
