import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewPost from '../views/NewPost.vue'
import NewUser from '../views/NewUser.vue'
import ShowPost from '../views/ShowPost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/posts/:id',
    name: 'ShowPost',
    component: ShowPost
  },
  {
    path: '/posts/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/users/new',
    name: 'NewUser',
    component: NewUser
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// @ts-ignore
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
