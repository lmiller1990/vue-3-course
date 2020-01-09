import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'

import { posts } from './posts'
import { users } from './users'

Vue.use(Vuex)

const root = new Module({
  modules: {
    posts: posts,
    users: users,
  }
})

const store = createStore(root)

export default store