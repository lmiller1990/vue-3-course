import { Module, Mutations, Actions, Getters } from 'vuex-smart-module'
import { Post, HashMap } from '@/types'
import { post } from '@/resources'
import { Store } from 'vuex'

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
  ADD_POST(post: Post) {
    this.state.all[post.id] = post
    this.state.ids.push(post.id)
  }

  SET_POSTS(posts: Post[]) {
    for (const post of posts) {
      if (!this.state.ids.includes(post.id)) {
        this.state.ids.push(post.id)
      }

      this.state.all[post.id] = post
    }
  }
}

export class PostsGetters extends Getters<State> {
  allPosts() {
    return this.state.ids.map(id => this.state.all[id])
  }
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

  async create(post: Post) {
    // const posts = await axios.post('/api/posts')
    await delay()
    const id = this.state.ids.length 
      ? Math.max(...this.state.ids) + 1
      : 100
    this.commit('ADD_POST', {...post, id })
  }
}

const posts = new Module({
  state: PostsState,
  mutations: PostsMutations,
  actions: PostsActions,
  getters: PostsGetters
})

const usePosts = ($store: Store<any>) => {
  return posts.context($store)
}

export {
  posts,
  usePosts,
}