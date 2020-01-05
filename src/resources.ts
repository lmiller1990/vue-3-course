import moment from 'moment'

import { Post, User } from '@/types'

const post: Post = {
  title: 'title',
  content: 'content',
  markdown: '<h1>Hello</h1>',
  authorId: 1,
  likes: 10,
  id: 1,
  tags: [],
  created: moment()
}

const currentUser: User = {
  id: 1,
  username: 'Lachlan',
  isCurrentUser: true
}

const notCurrentUser: User = {
  id: 2,
  username: 'Max',
  isCurrentUser: false
}

export {
  post,
  currentUser,
  notCurrentUser,
}