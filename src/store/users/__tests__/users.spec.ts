import { inject } from 'vuex-smart-module'

import { State, UsersMutations, UsersActions, UsersGetters } from '../index'
import { User, NewUser } from '@/types'
import { userA } from '@/resources'

const createState = (): State => {
  return {
    ids: [],
    all: {},
    authenticated: false,
  }
}


describe('Mutations - LOGIN', () => {
  it('adds user to state if necessary and sets authenticated', () => {
    const state = createState()
    const user: User = {
      id: 3,
      username: 'User 3',
      isCurrentUser: false 
    }

    const mutations = inject(UsersMutations, {
      state
    })

    mutations.LOGIN(user)

    expect(state).toEqual<State>({
      authenticated: true,
      ids: [3],
      all: {
        3: { ...user, isCurrentUser: true }
      }
    })
  })
})

describe('Mutations - LOGOUT', () => {
  it('sets isCurrentUser to false and authenticated to false', () => {
    const user: User = {
      id: 3,
      username: 'User 3',
      isCurrentUser: true 
    }
    const state: State = {
      ...createState(),
      authenticated: true,
      all: {
        3: user
      },
      ids: [3]
    }
    const mutations = inject(UsersMutations, {
      state
    })

    mutations.LOGOUT(user)

    expect(state).toEqual<State>({
      all: {
        3: { ...user, isCurrentUser: false }
      },
      ids: [3],
      authenticated: false,
    })
  })
})


describe('Mutations - ADD_USER', () => {
  it('adds a new user to the state', () => {
    const user: User = {
      id: 3,
      username: 'User 3',
      isCurrentUser: false 
    }
    const state: State = {
      ...createState(),
      authenticated: false,
      all: {},
      ids: []
    }
    const mutations = inject(UsersMutations, {
      state
    })

    mutations.ADD_USER(user)

    expect(state).toEqual<State>({
      all: {
        3: user,
      },
      ids: [3],
      authenticated: false,
    })
  })
})

describe('Actions - login', () => {
  it('commits a LOGIN mutation', async () => {
    const newUser: NewUser = {
      email: 'abc@def.com',
      password: 'asdf',
      username: 'Abc user'
    }
    const mockCommit = jest.fn()
    const state = createState()
    const actions = inject(UsersActions, {
      state,
      commit: mockCommit
    })

    await actions.login(newUser)

    expect(mockCommit).toHaveBeenCalledWith('LOGIN', {
      username: newUser.username,
      id: 3,
      isCurrentUser: true,
    })
  })
})

describe('Actions - logout', () => {
  it('commits a LOGOUT mutation', async () => {
    const user: User = {
      id: 3,
      username: 'User 3',
      isCurrentUser: true 
    }
    const state = createState()
    const mockCommit = jest.fn()
    const actions = inject(UsersActions, {
      state,
      commit: mockCommit
    })

    await actions.logout(user)

    expect(mockCommit).toHaveBeenCalledWith('LOGOUT', user)
  })
})

describe('Actions - signup', () => {
  it('commits a ADD_USER mutation and LOGIN mutation', async () => {
    const newUser: NewUser = {
      username: 'User 3',
      email: 'abc@def.com',
      password: 'asdf'
    }
    const user: User = {
      id: 3,
      username: 'User 3',
      isCurrentUser: true,
    }
    const state = createState()
    const mockCommit = jest.fn()
    const actions = inject(UsersActions, {
      state,
      commit: mockCommit
    })

    await actions.signup(newUser)

    expect(mockCommit.mock.calls[0]).toEqual(['ADD_USER', {...user, isCurrentUser: false}])
    expect(mockCommit.mock.calls[1]).toEqual(['LOGIN', user])
  })
})

describe('Getters - getById', () => {
  it('returns a user by their id', () => {
    const state: State = {
      ...createState(),
      ids: [userA.id],
      all: {
        [userA.id]: userA
      }
    }
    const getters = inject(UsersGetters, {
      state
    })

    const currentUser = getters.getById(userA.id)

    expect(currentUser).toEqual(userA)
  })
})

describe('Getters - currentUser', () => {
  it('returns the current user', () => {
    const state: State = {
      ...createState(),
      authenticated: true,
      ids: [userA.id],
      all: {
        [userA.id]: {
          ...userA,
          isCurrentUser: true,
        },
      }
    }
    const getters = inject(UsersGetters, {
      state
    })

    const currentUser = getters.currentUser()

    expect(currentUser).toEqual(userA)
  })
})