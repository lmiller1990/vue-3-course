import { inject } from 'vuex-smart-module'

import { State, PostsMutations, PostsActions } from '../index'
import { post } from '@/resources'

const state: State = {
  touched: false,
  loading: false,
  ids: [],
  all: {}
}

describe('mutations - SET_POSTS', () => {
  it('bulk inserts posts to the state', () => {
    const mutations = inject(PostsMutations, {
      state
    })

    mutations.SET_POSTS([ post ])

    expect(state.ids).toEqual([ 1 ])
    expect(state.all[1]).toEqual(post)
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