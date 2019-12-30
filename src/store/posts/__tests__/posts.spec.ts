import { inject } from 'vuex-smart-module'

import { State, PostsMutations, PostsActions, PostsGetters } from '../index'
import { post } from '@/resources'

const createState = (): State => {
  return {
    touched: false,
    loading: false,
    ids: [],
    all: {}
  }
}

describe('mutations - SET_POSTS', () => {
  it('bulk inserts posts to the state', () => {
    const state = createState()
    const mutations = inject(PostsMutations, {
      state
    })

    mutations.SET_POSTS([ post ])

    expect(state.ids).toEqual([ 1 ])
    expect(state.all[1]).toEqual(post)
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
