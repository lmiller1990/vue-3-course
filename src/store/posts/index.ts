import { Module, Mutations, Actions, Getters } from 'vuex-smart-module'
import { Post, HashMap } from '@/types'
import { post } from '@/resources'

export interface State {
  touched: boolean
  loading: boolean
  ids: number[]
  all: HashMap<Post>
}

export class PostsState implements State {
  touched = false
  loading = false
  ids: number[] = []
  all: HashMap<Post> = {}
}

export class PostsMutations extends Mutations<PostsState> {
  SET_POSTS(posts: Post[]) {
    const ids: number[] = []
    const all: HashMap<Post> = {}

    for (const post of posts) {
      all[post.id] = post
      ids.push(post.id)
    }

    this.state.all = all
    this.state.ids = ids
  }
}

export class PostsGetters extends Getters<State> {
}

const delay = () => {
  return new Promise(res => {
    window.setTimeout(() => {
      res()
    }, 1000)
  })
}

export class PostsActions extends Actions<PostsState, PostsGetters, PostsMutations, PostsActions> {
  async fetchAll() {
    // const posts = await axios.get('/api/posts')
    await delay()
    this.commit('SET_POSTS', [ post ])
  }
}

const posts = new Module({
  state: PostsState,
  mutations: PostsMutations
})
