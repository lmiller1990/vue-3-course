import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { posts } from './posts'

Vue.use(Vuex)

const root = new Module({
  modules: {
    posts: posts
  }
})

const store = createStore(root)

export default store