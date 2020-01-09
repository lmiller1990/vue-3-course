import { inject } from 'vuex-smart-module'

import { State, PostsMutations, PostsActions, PostsGetters } from '../index'
import { post, anotherPost } from '@/resources'
import { Post } from '@/types'

const createState = (): State => {
  return {
    touched: false,
    loading: false,
    ids: [],
    all: {}
  }
}

describe('mutations - SET_POSTS', () => {
  it('bulk inserts new posts to the state, and updates existing ones', () => {
    const newPost: Post = {
      ...post,
      id: 2,
      title: 'New Post'
    }

    const state: State = {
      ...createState(),
      all: {
        1: post
      },
      ids: [1]
    }

    const mutations = inject(PostsMutations, {
      state
    })

    mutations.SET_POSTS([ newPost ])

    expect(state.ids).toEqual([ 1, 2 ])
    expect(state.all[1]).toEqual(post)
    expect(state.all[2]).toEqual(newPost)
  })
})

describe('mutations - ADD_POST', () => {
  it('inserts a new post to the state', () => {
    const state = createState()
    const mutations = inject(PostsMutations, {
      state
    })

    mutations.ADD_POST(post)

    expect(state.ids).toEqual([ 1 ])
    expect(state.all[1]).toEqual(post)
  })
})

describe('getters - allPosts', () => {
  it('returns an array of posts', async () => {
    const state: State = {
      ...createState(),
      ids: [1],
      all: {
        1: post
      }
    }
    const getters = inject(PostsGetters, {
      state
    })

    expect(getters.allPosts()).toEqual([ post ])
  })
})

describe('actions - fetchAll', () => {
  it('fetches post from an API and commits a mutation', async () => {
    const commit = jest.fn()
    const actions = inject(PostsActions, {
      commit
    })

    await actions.fetchAll()

    expect(commit).toHaveBeenCalledWith('SET_POSTS', [ post ])
  })
})

describe('actions - getById', () => {
  it('fetches post from an API by id', async () => {
    const commit = jest.fn()
    const actions = inject(PostsActions, {
      commit
    })

    await actions.getById(2)

    expect(commit).toHaveBeenCalledWith('SET_POSTS', [ anotherPost ])
  })
})

describe('actions - create', () => {
  it('creates a new post and calls a ADD_POST mutation', async () => {
    const commit = jest.fn()
    const state = createState()
    const actions = inject(PostsActions, {
      commit,
      state: {
        ...state,
        ids: [1],
        all: {
          1: post
        }
      }
    })

    await actions.create(post)

    expect(commit).toHaveBeenCalledWith('ADD_POST', { ...post, id: 2 })
  })
})
