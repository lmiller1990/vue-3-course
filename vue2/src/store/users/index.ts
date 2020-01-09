import { Module, Mutations, Actions, Getters } from 'vuex-smart-module'
import { Store } from 'vuex'

import { User, HashMap, NewUser } from '@/types'
import { userA, userB } from '@/resources'

const delay = () => {
  return new Promise(res => {
    window.setTimeout(() => {
      res()
    }, 1000)
  })
}

export interface State {
  ids: number[]
  all: HashMap<User>
  authenticated: boolean
}

export class UsersState implements State {
  ids = [userA.id, userB.id]
  all = {
    [userA.id]: {...userA, isCurrentUser: true},
    [userB.id]: userB,
  }
  authenticated = true
}

export class UsersMutations extends Mutations<UsersState> {
  LOGIN(payload: User) {
    if (!this.state.all[payload.id]) {
      this.state.ids.push(payload.id)
    }

    this.state.all[payload.id] = {
      ...payload,
      isCurrentUser: true,
    }
    this.state.authenticated = true
  }

  LOGOUT(payload: User) {
    this.state.all[payload.id].isCurrentUser = false
    this.state.authenticated = false
  }

  ADD_USER(payload: User) {
    if (!this.state.all[payload.id]) {
      this.state.ids.push(payload.id)
    }

    this.state.all[payload.id] = payload
  }
}

export class UsersGetters extends Getters<UsersState> {
  getById(id: number) {
    return this.state.all[id]
  }

  currentUser() {
    if (!this.state.authenticated) {
      return
    }
    const id = this.state.ids.find(x => this.state.all[x].isCurrentUser)!
    return this.state.all[id]
  }
}


export class UsersActions extends Actions<UsersState, UsersGetters, UsersMutations, UsersActions> {
  async login(user: NewUser) {
    await delay() // axios.post('/users/login')
    this.commit('LOGIN', {
      id: 3,
      username: user.username,
      isCurrentUser: true 
    })
  }

  async logout(user: User) {
    await delay()
    this.commit('LOGOUT', user)
  }

  async signup(user: NewUser) {
    await delay() // const response = await axios.post('/users/signup')
    this.commit('ADD_USER', {
      id: 3,
      username: user.username,
      isCurrentUser: false 
    })
    this.commit('LOGIN', {
      id: 3,
      username: user.username,
      isCurrentUser: true 
    })
  }
}

const users = new Module({
  state: UsersState,
  mutations: UsersMutations,
  actions: UsersActions,
  getters: UsersGetters,
})

const useUsers = ($store: Store<any>) => {
  return users.context($store)
}

export {
  users,
  useUsers,
}