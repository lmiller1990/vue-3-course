import { Moment } from 'moment'

export interface Post {
  id: number
  title: string
  content: string
  markdown: string
  created: Moment
  authorId: number
  likes: number
  tags: string[]
}

export interface User {
  id: number
  username: string
  isCurrentUser: boolean
}


export interface HashMap<T> {
  [key: string]: T
}