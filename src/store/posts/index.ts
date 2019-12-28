import { Module, Mutations } from 'vuex-smart-module'
import { Post, HashMap } from '@/types'

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

const posts = new Module({
  state: PostsState,
  mutations: PostsMutations
})