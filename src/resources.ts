import moment from 'moment'
import random from 'lodash/random'

import { Post, User } from '@/types'

const post: Post = {
  title: 'title',
  markdown: '# My great Post',
  content: `<h1 id="my-great-post">My great post!</h1>
  <p>This is a <em>really exciting</em> post.</p>
  <pre><code>const a = <span class="hljs-function"><span class="hljs-params">(val: <span class="hljs-built_in">string</span>)</span> =&gt;</span> {}</code></pre>
  `,
  authorId: 1,
  likes: 10,
  id: 1,
  tags: [],
  created: moment()
}

const testPosts: Post[] = [
  {
    id: 1,
    title: 'Vue.js 3: Composition API, TypeScript and Unit Testing!',
    content: '',
    markdown: '',
    created: moment(),
    likes: random(0, 100),
    authorId: 1,
    tags: ['vue.js 3.0', 'composition api', 'typescript', 'vuex', 'vue-router', 'unit testing']
  },
  {
    id: 2,
    title: 'My production experience with used React and Vue',
    content: '',
    created: moment().subtract(random(0, 24), 'hours'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['javascript', 'react', 'vuejs'],
  },
  {
    id: 3,
    title: 'Vue.js 2 Quickstart Tutorial 2019',
    content: '',
    created: moment().subtract(random(0, 24), 'hours'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'tutorial'],
  },
  {
    id: 5,
    title: 'Scalable backends using Nest.js',
    content: '',
    created: moment().subtract(random(0, 24), 'hours'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: [],
  },
  {
    id: 6,
    title: '10 Things You Will Eventually Learn About JavaScript Projects',
    content: '',
    created: moment().subtract(random(0, 24), 'hours'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['javascript', 'programming'],
  },
  {
    id: 7,
    title: 'Vue.js: the good, the meh, and the ugly',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs'],
  },
  {
    id: 8,
    title: 'Vue + Firebase: How to build a Vue app with Firebase authentication system in 15 minutes',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'firebase', 'authentication'],
  },
  {
    id: 9,
    title: 'The Vue Handbook: a thorough introduction to Vue.js',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'handbook', 'guide'],
  },
  {
    id: 10,
    title: 'What’s new in Vue Devtools 4.0',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'devtools'],
  },
  {
    id: 11,
    title: 'Why I us TSX in my Vue components',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'tsx'],
  },
  {
    id: 12,
    title: 'Hooks vs Lifecycle methods',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'react', 'hooks'],
  },
  {
    id: 13,
    title: 'Testing JavaScript applications with Jest',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'testing', 'jest'],
  },
  {
    id: 14,
    title: 'Building a Chrome Extension with Vue.js',
    content: '',
    created: moment().subtract(random(0, 10), 'days'),
    likes: random(0, 100),
    authorId: random(1, 2),
    markdown: '',
    tags: ['vuejs', 'devtools', 'extension'],
  },
]


const anotherPost: Post = {
  title: 'This is an interesting post',
  content: 'Content',
  markdown: '<h1>Hello</h1>',
  authorId: 1,
  likes: 10,
  id: 2,
  tags: [],
  created: moment()
}

const allPosts = [
  post,
  anotherPost,
]

const userA: User = {
  id: 1,
  username: 'Lachlan',
  isCurrentUser: true
}

const userB: User = {
  id: 2,
  username: 'Max',
  isCurrentUser: false
}

export {
  allPosts,
  post,
  anotherPost,
  userA,
  userB,
}