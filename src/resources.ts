import moment from 'moment'

import { Post, User } from '@/types'

const post: Post = {
  title: 'title',
  content: 'content',
  markdown: `<h1 id="my-great-post">My great post!</h1>
  <p>This is a <em>really exciting</em> post.</p>
  <pre><code>const a = <span class="hljs-function"><span class="hljs-params">(val: <span class="hljs-built_in">string</span>)</span> =&gt;</span> {}</code></pre>
  `,
  authorId: 1,
  likes: 10,
  id: 1,
  tags: [],
  created: moment()
}


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