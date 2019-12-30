# 0. Introduce the Course, App

In this course, we will be building the front-end for a blogging platform, similar to Medium or Dev.to. I will give a demo of the application in a moment. Their are three main focuses of this course:

- Building applications with Vue.js 3, specifically focusing on the new features including the Composition API and Portals.
- Use of TypeScript throughout the app, including the unit tests and the Vuex store.
- Unit testing, using Vue Test Utils and Jest.

To keep the course focused, we will not be building a back-end. However, we will include artificial delays to simulate API calls to a server, and how to handle loading states and transitions. This will make it easy to add a back end in the future, if we so desire.

Lastly, this course is made for intermediate users of JavaScript frameworks like Vue.js - I assume you have some knowledge of modern JavaScript and web development. We move quickly but thoroughly.

# 1.1 Getting Setup

You will need to have Node.js, the yarn package manager, and `vue-cli` installed. If you don't, just do a quick search and get them installed. You can verify they are installed by running `npm --version && yarn --version && vue --version`. If all of those output a version number, you are good to go.

We will be using the `vue-cli` to generate a basic template. Create the app by running:

`yarn create app`

- Check babel, typescript, unit testing, router, and vuex
- not class style
- use babel alongside
- history mode
Jest
- config in package.json
- run `yarn serve` to serve the app
- run `yarn test:unit` to make sure tests are working

`cd` in, and run `yarn serve`. Visit port 8080, and we are ready to start building!

# 1.2 Creating the TopNav component

I like to keep each major component in it's own directory. This includes and TypeScript type definitions I might write, any sub-components, and of course, the unit tests. Jest, the test runner we are using, will run any tests found in a special directory named `__tests__`. With all this in mind, I've crreated a `TopNav` directory under components, containing an almost empty `TopNav.vue` file, as well as a `__tests__` directory. This is where our test will go, which we will be writing shortly.

To get started, open `TopNav.vue`. We will add three links; log in and sign up, which will be displayed when the user is not authenticated, and new post and log out, which display when the user is authenticated. I'll write this as a traditional Vue.js 2 component for now, and convert it to a Vue.js 3 component using the Composition API in the next video.

Let's go ahead and create the links. Vue Router, which we will look at in more detail shortly, provides a global `RouterLink` component for links.

Log out will be different to the other links; it will be a button with a `@click` listener.

Coding: Create basic TopNav

```vue
<template>
  <nav>
    <RouterLink 
      to="/"
    >  
      Vue 3 Composition API
    </RouterLink>

    <RouterLink 
      to="/users/new"
    >  
      Sign Up
    </RouterLink>

    <RouterLink 
      to="/users/login"
    >  
      Log In
    </RouterLink>

    <RouterLink 
      to="/posts/new"
    >  
      New Post
    </RouterLink>

    <button @click="logout">  
      Log Out
    </button>
  </nav>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'TopNav',

  methods: {
    logout() {
      console.log('Log Out')
    }
  }
})
</script>
```

Now, let's import this to the root component, `App.vue`, and render it. It's rendering, but notice the console is showing an error - we did not define the `logout` function. First, let's see what this looks like using the Vue 2 API, also knows as the options API.

Now the errors are gone. In the next video, we will convert this to use the Composition API.

# 1.3 Using the Composition API

Now we get into the exciting stuff. Vue 3 gives us a new API that is supposed to help with code organization and type interfence - the Composition API. You can read an overview if you want to get a quick idea of how things work, or just follow along. Basically, as you will soon see, the idea is centered around using the new `setup` function, and various utility functions. This takes the place of the `computed`, `data` and `methods` fields from Vue 2 - although you can still use those if you prefer. For this course, I'll be exclusively using the Composition API, so you can get an idea of how to use it in your own applications.

Coding: Update TopNav.vue to use createComponent and setup
Notes: no `this` instance in `setup`. We will see how to access `props` a bit later.

```vue
<template>
  <nav>
    <RouterLink 
      to="/"
    >  
      Vue 3 Composition API
    </RouterLink>

    <RouterLink 
      to="/users/new"
    >  
      Sign Up
    </RouterLink>

    <RouterLink 
      to="/users/login"
    >  
      Log In
    </RouterLink>

    <RouterLink 
      to="/posts/new"
    >  
      New Post
    </RouterLink>

    <button @click="logout">  
      Log Out
    </button>
  </nav>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'TopNav',

  setup() {
    const logout = () => {
      console.log('Log out')
    }

    return {
      logout,
    }
  },
})
</script>
```

Congrats, you made your first Composition API component! We will see another of the new APIs, `ref`, very soon. Before that, we should make the app look at least somewhat decent, so in the next video we will add Bulma, a simple CSS framework, and some icons.

# 1.4 Adding Bulma

We will use Bulma, a CSS-only framework to make the app look good. There is a few libraries that integrate Bulma with Vue components, but I chose not to use those for a few reasons. Since Vue 3 is so new, there ia a chance the frameworks haven't had time to update to support all the new feature yet. Also, since Bulma doesn't provide any JS out of the box, we can use the new Composition API features to integrate the components ourselves. It's a great way to learn.

Coding: Get Bulma CDN link.
Coding: Get Font Awesome 5 CDN link

```vue
<template>
  <nav class="navbar">
    <nav class="navbar-brand">
      <RouterLink 
        class="navbar-item"
        to="/"
      >  
        Vue 3 Composition API
      </RouterLink>
    </nav>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink 
              class="button"
              to="/users/new"
            >  
              Sign Up
            </RouterLink>

            <RouterLink 
              class="button"
              to="/users/login"
            >  
              Log In
            </RouterLink>

            <RouterLink 
              class="button"
              to="/posts/new"
            >  
              New Post
            </RouterLink>

            <button 
              class="button"
              @click="logout"
            >  
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'TopNav',

  setup() {
    const logout = () => {
      console.log('Log out')
    }

    return {
      logout,
    }
  },
})
</script>
```

```vue
<template>
  <div id="app">
    <TopNav />

    <section class="section">
      <div class="container">
        <router-view/>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav/TopNav.vue'

export default {
  components: {
    TopNav,
  },
}
</script>

<style>
</style>
```


The next part of the app we build will be the Timeline component. We will start with these three tabs, and see another new part of the Composition API, `ref`.

# 1.5 Rendering the Timeline component and Tabs with Vue Router

I've created the same folder structure as I did with the TopNav, including the `__tests__` directory. I've also included a `types.ts` file, since I want to define some custom types.

We will get the tabs rendered first, then improve the typing and see how to use `ref` to make them reactive.

Coding: Make this:

```vue
<template>
  <p class="panel-tabs">
    <a
      v-for="tab in tabs"
      :key="tab"
    >
      {{ tab }}
    </a>
  </p>  
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'Timeline',

  setup() {
    const tabs = ['Today', 'This Week', 'This Month']

    return {
      tabs,
    }
  }
})
</script>
```

Before going any further, let's get this displaying in the app. To do this, we will need to learn a bit about Vue Router. Go to `router/index.ts`.

So that's how Vue Router decides what to render. Update `Home.vue` to render our `Timeline` component.

```
<template>
  <div>
    <Timeline />
  </div>
</template>

<script>
// @ is an alias to /src
import Timeline from '@/components/Timeline/Timeline.vue'

export default {
  name: 'home',
  components: {
    Timeline
  }
}
</script>
```

Now we have the tabs rendering, let's use `ref` from the Composition API to toggle the tabs when the user clicks on one.

# 1.6 Creating reactive tabs with `ref`

Coding: impoort `ref` and use it to make the active tab class change

```vue
<template>
  <p class="panel-tabs">
    <a
      v-for="tab in tabs"
      :key="tab"
      :class="[ tab === activeTab ? 'is-active' : '']"
    >
      {{ tab }}
    </a>
  </p>  
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  name: 'Timeline.vue',

  setup() {
    const tabs = ['Today', 'This Week', 'This Month']
    const activeTab = ref('Today')

    return {
      tabs,
      activeTab
    }
  }
})
</script>
```

Coding: Add a setActiveTab method and Period type. Explain `ref` using proxy reference.

```vue
<template>
  <p class="panel-tabs">
    <a
      v-for="tab in tabs"
      :key="tab"
      :class="[ tab === activeTab ? 'is-active' : '']"
      @click="() => setActiveTab(tab)"
    >
      {{ tab }}
    </a>
  </p>  
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

import { Period } from './types'

export default createComponent({
  name: 'Timeline.vue',

  setup() {
    const tabs: Period[] = ['Today', 'This Week', 'This Month']
    const activeTab = ref<Period>('Today')

    const setActiveTab = (tab: Period) => {
      activeTab.value = tab
    }

    return {
      tabs,
      activeTab,
      setActiveTab,
    }
  }
})
</script>
```

```ts
export type Period = 'Today' | 'This Week' | 'This Month'
```

This is great. But we had to test it by hand - let's add our first unit test, using Vue Test Utils, to make sure we don't break this feature as we continue development.

# 1.7 Intro to Vue Test Utils - Testing the Timeline component

Before building any more features, we will add a unit test to make sure we do noot break the tabs feature as we continue development. Open Timeline.spec.ts, and the following basic test code:

```ts
import Vue from 'vue'
import Composition from '@vue/composition-api'
Vue.use(Composition)

import Timeline from '../Timeline.vue'

describe('Timeline', () => {
  it('changes active tab when clicked', () => {
  })
})
```

We use the global `describe` function to specify the file or component we are testing, and different scenarios with the `it` function. Next, we will import the `mount` method from VTU, and use it to `mount` the Timeline component. `mount` renders the component to an in-memory DOM using a library called JS DOM. It also creates a `wrapper` around the component, providing some useful methods for testing.

Coding: mount the Timeline component. Show how to use Jest's watch.

```ts
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Composition from '@vue/composition-api'
Vue.use(Composition)

import Timeline from '../Timeline.vue'

describe('Timeline', () => {
  it('changes active tab when clicked', () => {
    const wrapper = mount(Timeline)

    console.log(wrapper.html())
  })
})
```

Let's verify that Today is the active tab. Then we will click another tab, and verify it changed.

Coding: Talk about find, findAll, trigger, and classes.contains.

```ts
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Composition from '@vue/composition-api'
Vue.use(Composition)

import Timeline from '../Timeline.vue'

describe('Timeline', () => {
  it('changes active tab when clicked', () => {
    const wrapper = mount(Timeline)
    expect(wrapper.find('a').classes()).toContain('is-active')

    wrapper.findAll('a').at(1).trigger('click')
    expect(wrapper.findAll('a').at(1).classes()).toContain('is-active')
  })
})
```

# 1.8 Improving the test with data attributes and await nextTick

The test we wrote in the previous video works great, however there are a few improvements we can make. First, we will start by addressing one common problem Vue unit tests suffer from; asynchronous rendering.

Coding: Explain nextTick and async, and using onUpdated.

```vue
<script>
onUpdated(() => {
  // this will be called when the DOM updates.
  console.log('Updating')
})
</script>
```

```ts
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Composition from '@vue/composition-api'
Vue.use(Composition)

import Timeline from '../Timeline.vue'

describe('Timeline', () => {
  it('changes active tab when clicked', async () => {
    const wrapper = mount(Timeline)
    expect(wrapper.find('a').classes()).toContain('is-active')

    wrapper.findAll('a').at(1).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('a').at(1).classes()).toContain('is-active')
  })
})
```

Coding: `data-test` attributes

```vue
<template>
  <p class="panel-tabs">
    <a
      v-for="tab in tabs"
      :data-test="tab"
      :key="tab"
      :class="[ tab === activeTab ? 'is-active' : '']"
      @click="() => setActiveTab(tab)"
    >
      {{ tab }}
    </a>
  </p>  
</template>
```

```ts
import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Composition from '@vue/composition-api'
Vue.use(Composition)

import Timeline from '../Timeline.vue'

describe('Timeline', () => {
  it('changes active tab when clicked', async () => {
    const wrapper = mount(Timeline)
    expect(wrapper.find('[data-test="Today"]').classes()).toContain('is-active')

    wrapper.findAll('[data-test="This Week"').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="This Week"]').classes()).toContain('is-active')
  })
})
```

# 2.0 Typesafe Vuex with `vuex-smart-module`

This next section will be focused on a quick introduction to Vuex, the official Flux store for Vue. We will use the helper library `vuex-smart-module`, written by the maintainer of Vuex, to get typesafety. `vuex-smart-module` is just some convinience methods on top of Vuex to let us leverage the full power of TypeScript. We wil create the `posts` store, then use it to render the posts on the Timeline.

Coding: Install the module, brief intro. Also install moment and @types/moment

https://github.com/ktsn/vuex-smart-module

# 2.1 Creating the Posts Store

Let's get started on the post store. I've created a `posts` directory in the `store` directory, containing and `index.ts` file and a `__tests__` directory with a `posts.spec.ts`. We will write tests for the store, as well.

Coding: posts/index.ts, src/types.ts

```ts
import { Moment } from 'moment'

export interface Post {
  id: number
  title: string
  markdown: string
  html: string
  created: Moment
  authorId: number
  likes: number
  tags: string[]
}
```

```ts
import { Module, Mutations } from 'vuex-smart-module'
import { Post } from '@/types'

export interface State {
  touched: boolean
  loading: boolean
  ids: number[]
  all: { [key: string]: Post }
}

class PostsState implements State {
  touched = false
  loading = false
  ids: number[] = []
  all: { [key: string]: Post } = {}
}
```

Coding: Mutations

```ts
class PostsMutations extends Mutations<PostsState> {
  SET_POSTS(posts: Post[]) {
    const ids: number[] = []
    const all: { [key: string]: Post } = {}

    for (const post of posts) {
      all[post.id] = post
      ids.push(post.id)
    }

    this.state.all = all
    this.state.ids = ids
  }
}

const posts = new Module({
  state: PostsState,
  mutations: PostsMutations
})
```

Coding: HashMap Interface

```ts
export interface HashMap<T> {
  [key: string]: T
}
```

# 2.2 Testing the Posts Mutation

Before going any further, let's write a test for the mutation, to make sure if it behaving correctly.

Coding: Write a test

```ts
import moment from 'moment'

import { State, PostsMutations } from '../index'
import { inject } from 'vuex-smart-module'
import { Post } from '@/types'

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
```

Now, let's move the mock post to a dedicated mock directory. I made a `resources.ts` file.

Coding: Move `post` to resources

Now we have a mutation to add posts to post state. Next, we need a way to fetch the posts in the first place, for example from an API. Vuex provides a solution in the form of actions. In the next video, we will write a type-safe action and follow it up with a test.

# 2.3 Writing a Type Safe Action

The next part of the Vuex workflow we will add is an action. An action different to a mutation that it does update the state directly; instead, it receives a commit function, by which it invokes a mutation. An action, unlike a mutation, can perform asynchronous operations. This is where we will make an API call to a server (which we will be stubbing out, but add some artificial delay to simulate a server call).

Coding: Write the action

```ts
export class PostsActions extends Actions<PostsState, PostsGetters, PostsMutations, PostsActions> {
  async fetchAll() {
    // const posts = await axios.get('/api/posts')
    await delay()
    this.commit('SET_POSTS', [ post ])
  }
}
```

Although the idea of an action sounds complex, it is really not. You can do whatever post processing of the API that might be necessary before commiting the mutation. You can also call other actions by typing `this.actions.<ACTION>`.

Let's write a quick test for this one.

Coding: Write test, explain jest.fn, async.

```ts
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
```

Coding: Lastly, we should register the actions in the posts module:

```ts
const posts = new Module({
  state: PostsState,
  mutations: PostsMutations,
  actions: PostsActions,
  getters: PostsGetters
})

export {
  posts
}
```

Now we have a basic Vuex workflow in place, let's see how we can access the posts state in the Timeline component, and render some posts.

# 2.4 Consuming a Vuex store with the Composition API

Before access the posts module, we should import it to the root of our store. Head to `store/index.ts`.

Coding: show that createStore is, in fact, a wrapper around Vuex.

```ts
import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { posts } from './posts'

Vue.use(Vuex)

const root = new Module({
  modules: {
    posts: posts
  }
})

const store = createStore(root)

export default store
```

Traditionally in Vue 2 apps, the Vuex store is available on the `this` instance for a component. This is still true in Vue 3, however because the `setup` function is called before the component is instantiated, we cannot access the `this` instance. There is a few alternatives, which we will look at now.

Coding: Show `this.$store` in `methods`, `ctx` in setup, and `usePosts` to get type safety.

https://github.com/ktsn/vuex-smart-module#method-style-access-for-actions-and-mutations

```ts
import { posts } from '@/store/posts'

export default createComponent({
  name: 'Timeline.vue',

  setup(props, ctx) {
    const postsStore = posts.context(ctx.root.$store)
  }
})
```

Coding: useStore

```ts
const usePosts = ($store: Store<any>) => {
  return posts.context($store)
}
```

```ts
import { usePosts } from '@/store/posts'

export default createComponent({
  name: 'Timeline.vue',

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)
  }
})
```

# 2.5 Calling an Action and Access the Posts with `computed`

Now we can access the store in the Timeline component, let's fetch the posts and render them!

Coding: Call the action. Return `posts` with computed. Use `computed`.

```ts
<template>
  <nav class="panel is-primary">
    <p class="panel-tabs">
      <a
        v-for="tab in tabs"
        :data-test="tab"
        :key="tab"
        :class="[ tab === activeTab ? 'is-active' : '']"
        @click="() => setActiveTab(tab)"
      >
        {{ tab }}
      </a>
    </p>  

    div
      v-for="post in allPosts"
      :key="post.id"
    >
      <a class="panel-block">
        <div class="level">
          {{ post.title }}

        </div>
      </a>
    </div>
  </nav>
</template>

// ...

posts.actions.fetchAll()

const allPosts = computed(() => {
  return posts.state.ids.map(id => posts.state.all[id])
})
```

AWESOME! Our test is now failing, though. Before fixing it, there is a sneaky refactor we can do, using Vuex. `getters`. Before we get into that, though, we should look at the difference between a `ref` and `computed.

# 2.6 `ref` vs `computed`

Explain `ref` is for primative values that the component updates, and `computed` is for derived, READ ONLY values. Touch on `reactive`.

# 2.7 Accessing Vuex State using Getters

In a previous video, we created a PostsGetters class in the posts store. Getters are a way to access derived data - we will now implement a `allPosts` getter, moving some logic out of the Timeline component to the Vuex store.

Coding:

```ts
// posts.ts
export class PostsGetters extends Getters<State> {
  allPosts() {
    return this.state.ids.map(id => this.state.all[id])
  }
}


// spec.ts
const createState = (): State => {
  return {
    touched: false,
    loading: false,
    ids: [],
    all: {}
  }
}

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
```

It works! In the next video, we will fix the failing test, and write one verifying that the Timeline component is correctly rendering the posts.

# 2.8 Mocking a Vuex store using `jest.mock`

There are a few options to testing components using a Vuex store. One option, is to import the store, set everything up, verify everything works correctly. This is what we call an "integration" test - it verifies all the moving parts are working together. I prefer to write integration tests with a framework like Cypress or Selenium, which runs the actual app in a browser. You should have both integration tests and unit tests. I'll be demonstrating how to mock the Vuex store using `jest.mock`, which gives us more fine grained control over the state of the Vuex store, with far less code and overhead.

Coding: Write test, add data-test-post attribute, show inline `require` and mockPost.

```ts
jest.mock('@/store/posts', () => {
  return {
    usePosts: () => ({
      actions: {
        fetchAll: () => { }
      },
      getters: {
        allPosts: () => [require('@/resources').post]
      }
    })
  }
})
```

Coding: show jest.fn() and jest.mock.resetMock and beforeEach hook.

```ts
describe('Timeline', () => {
  beforeEach(() => {
    mockFetchAll.mockReset()
  })

  it('renders posts', async () => {
    const wrapper = mount(Timeline)

    expect(mockFetchAll).toHaveBeenCalled()
    expect(wrapper.findAll('[data-test-post]')).toHaveLength(1)
  })
})
```

# 3.0 Improving the Timeline with a TimelineItem component

In this section, we will expand on the TimelineItem component. We will set up a link to the a page which will show the post, and use Portals, a new feature of Vue to render a component at a completely different location on a page. We will also get more in depth with Vue Router extend our Store to include `users`, in preparation for adding authentication and authorization.

Coding: Demo the features.

# 3.1 Extracting a TimelineItem component and using Props

Since each row on the Timeline is about to get more complicated, we will create a new `TimelineItem.vue` component to hold all the logic. I've created a Timeline.vue component and a test file.

Coding: Move the existing code into TimelineItem. Update spec to use `find(TimelineItem)`. show how to use props.

```vue
<template>
  <!-- ... -->
  <TimelineItem
    v-for="post in allPosts"
    :key="post.id"
    :post="post"
  >
  </TimelineItem>
</template>
```

```vue
<template>
  <a class="panel-block">
    <div class="level">
      {{ post.title }}
    </div>
  </a>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { Post } from '@/types'

export default createComponent({
  name: 'TimelineItem',

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
  }
})
</script>
```

# 3.2 Improving the TimelineItem with RouterLink

Let's make the Timeline Item a bit more interesting now, by adding the author, number of likes and a link to view the content of the article. We will also add a test to make sure everything works correctly.

Coding: Add RouterLink and various elements. Write a test. Show how to use propsData, and add a Router to the wrapper. Show the Timeline spec as having errors and hint at an upcoming refactor.

```
<template>
  <a class="panel-block">
    <div class="level">
      <div>
        <div>
          <RouterLink 
            :to="link"
            class="link"
          >
            {{ post.title }}
          </RouterLink>
        </div>
        <span data-test-author>
          {{ ` ${post.created.format('Do MMM')} by ${author}.` }}
        </span>
        <span data-test-likes @click="handleLike">
          <i class="far fa-thumbs-up" />
          {{ post.likes }}
        </span>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { Post } from '@/types'

export default createComponent({
  name: 'TimelineItem',

  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
    const link = `/posts/${props.post.id}`
    const author = 'Lachlan'
    const handleLike = () => {
      // ...
    }

    return {
      link,
      author,
      handleLike,
    }
  }
})
</script>
```

```ts
import Vue from 'vue'
import VueRouter from 'vue-router'
import { mount } from '@vue/test-utils'
import Composition from '@vue/composition-api'
Vue.use(Composition)
Vue.use(VueRouter)

import TimelineItem from '../TimelineItem.vue'
import { post as mockPost } from '@/resources'

describe('TimelineItem', () => {
  it('renders information about the post', () => {
    const wrapper = mount(TimelineItem, {
      router: new VueRouter({ mode: 'history' }),
      propsData: {
        post: mockPost
      },
    })

    expect(wrapper.find({ name: 'RouterLink' }).attributes('href')).toEqual('/posts/1')
    expect(wrapper.find('[data-test-author]').text()).toContain('Lachlan')
    expect(wrapper.find('[data-test-likes]').text()).toEqual('10')
  })
})
```

# 3.3 Adding a createTestVue method to avoid polluting the global Vue

Now is a great time to revisit why doing `Vue.use` in a unit test is not ideal, and do a small refactor to our tests more concise. I've created a `src/testHelper.ts` file.

Coding: testHelper.ts, update Timeline and TimelineItem. Also, show how to use `stubs` in Timeline instead of using a real router.

```ts
import VueRouter from 'vue-router'
import { createLocalVue } from '@vue/test-utils'
import Composition from '@vue/composition-api'

const createTestVue = () => {
  const localVue = createLocalVue()
  localVue.use(Composition)
  localVue.use(VueRouter)

  return localVue
}

export {
  createTestVue
}
```

```ts
  // with router
  it('renders posts', async () => {
    const wrapper = mount(Timeline, {
      localVue: createTestVue(),
      router: new VueRouter({ mode: 'history' }),
    })
    expect(wrapper.find('[data-test="Today"]').classes()).toContain('is-active')

    expect(mockFetchAll).toHaveBeenCalled()
    expect(wrapper.findAll(TimelineItem)).toHaveLength(1)
  })

  // with stubs
  it('renders posts', async () => {
    const wrapper = mount(Timeline, {
      localVue: createTestVue(),
      stubs: {
        RouterLink: true
      }
    })
    expect(wrapper.find('[data-test="Today"]').classes()).toContain('is-active')

```

# 3.4 Using `emitted` to test events

We need some way to know if the like button was clicked. In Vue 3, we use events to commmunicate between components. VTU provides the awesome `emitted` helper to test events.

Coding: show how `emitted` is an array of events, and how to use `ctx.emit`.

```ts
const handleLike = () => {
    ctx.emit('like', { postId: props.post.id })
}

it('emits a like event when like is clicked', () => {
  const wrapper = mount(TimelineItem, {
    router: new VueRouter({ mode: 'history' }),
    localVue: createTestVue(),
    propsData: {
      post: mockPost
    },
  })

  wrapper.find('[data-test-likes]').trigger('click')

  expect(wrapper.emitted().like).toHaveLength(1)
  expect(wrapper.emitted().like[0]).toEqual([ { postId: 1 } ])
})
```

# 3.5 Using Portals to render a modal, testing with exists

Vue 3 has a new completely new feature - portals. You can use a portal to render a component in a completely different place. In this video, we will render a form asking the user to sign up when they click on the Like button if they have not already logged in.

Coding: Add `Portal` to App.vue. Add the listener for `like` in Timeline.vue. Render something with the portal. Write a test.

```ts
// Timeline.vue
<TimelineItem
  v-for="post in allPosts"
  :key="post.id"
  :post="post"
  @like="handleLike"
>
</TimelineItem>

<Portal to="modal">
  <div data-test-modal v-if="showModal">
    This is a modal
  </div>
</Portal>

const showModal = ref(false)
const authenticated = computed(() => false)
const handleLike = ({ postId }: { postId: number }) => {
  if (authenticated.value) {
  // if authenticated, "like" a post
    return
  }

  showModal.value = true
}

// Timeline.spec.ts
it('renders a modal when like is clicked', async () => {
  const wrapper = mount(Timeline, {
    localVue: createTestVue(),
    stubs: {
      RouterLink: true,
      Portal: true
    }
  })
  expect(wrapper.find('[data-test-modal]').exists()).toEqual(false)

  wrapper.find('[data-test-likes]').trigger('click')
  await wrapper.vm.$nextTick()

  expect(wrapper.find('[data-test-modal]').exists()).toEqual(true)
})
```

# 3.6 Improve the Modal UI

To finish this section off, let's make the modal UI look a bit better by adding some classes provided by Bulma.


```ts
<Portal to="modal">
  <div 
    v-if="showModal"
    data-test-modal 
    class="modal is-active"
  >
    <div 
      data-test-hide-modal
      class="modal-background"
      @click="showModal = false"
    >
    </div>
    <div class="modal-content">
      <div class="card">
        <div class="section">
          Please sign up to like this post.
        </div>
      </div>
    </div>
  </div>
</Portal>

// Timeline.spec.ts 
it('shows and hides a modal', async () => {
  const wrapper = mount(Timeline, {
    localVue: createTestVue(),
    stubs: {
      RouterLink: true,
      Portal: true
    }
  })
  expect(wrapper.find('[data-test-modal]').exists()).toEqual(false)

  wrapper.find('[data-test-likes]').trigger('click')
  await wrapper.vm.$nextTick()

  expect(wrapper.find('[data-test-modal]').exists()).toEqual(true)

  wrapper.find('[data-test-hide-modal]').trigger('click')
  await wrapper.vm.$nextTick()

  expect(wrapper.find('[data-test-modal]').exists()).toEqual(false)
})
```

# 3.7 Section Summary

We covered a huge amount of content in this series of lectures. We looked at

- using `props` to pass data to child components
- using `find` with `name`, a selector, and an actual component
- communicating between components by using events
- using localVue to avoid polluting the global instance
- using emitted to test an event was triggered
- Portals,
- testing with `exists`

The next section will look at creating the routing to a `posts` page, where we will render a post, as well allowing a user to sign up and log in.

# 4.0 Section Preview

In this section we will build out the `/posts/new` page, which allows a user to compose a new post. We will let them write their posts using markdown, as well as show a real-time preview of the outputted HTML using `marked`. Since the platform is aimed at developers, we will also support syntax highlighting using highlight.js.

Coding: demonstrate section 4.

# 4.1 Adding a `/posts/edit` route.

I've made a `views/NewPost.vue` component and test file, as well as a `components/PostWriter` directory with a file for the component and for the test. We will use the PostWriter component for both composing new posts and editing posts. The NewPost view will simply render the PostWriter, and pass a new post as a prop.

Coding: NewPost.vue, update routes, PostWriter.vue.


```
<template>
  <PostWriter :post="newPost" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import moment from 'moment'

import { Post } from '@/types'
import PostWriter from '@/components/PostWriter/PostWriter.vue'

export default createComponent({
  name: 'NewPost',

  components: {
    PostWriter
  },

  setup() {
    const newPost: Post = {
      id: 0,
      title: '',
      content: '',
      tags: [],
      markdown: '',
      created: moment(),
      authorId: 1,
      likes: 0,
    }

    return {
      newPost,
    }
  }
})
</script>
```

```
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import NewPost from '../NewPost.vue'
import PostWriter from '@/components/PostWriter/PostWriter.vue'

describe('NewPost', () => {
  it('renders a post writer', () => {
    const wrapper = mount(NewPost, {
      localVue: createTestVue(),
    })

    expect(wrapper.find(PostWriter).exists()).toBe(true)
  })
})
```

```
<template>
  <div>Write your new post</div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { Post } from '@/types'

export default createComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  }
})
```

```
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import PostWriter from '@/components/PostWriter/PostWriter.vue'

describe('PostWriter', () => {
  it('renders', () => {
    const wrapper = mount(PostWriter, {
      localVue: createTestVue(),
    })
  })
})
```

```
// router/inde.ts
{
  path: '/posts/new',
  name: 'NewPost',
  component: NewPost
}
```

# 4.2 Using v-model and Creating the Layout for the PostWriter

In this lecture we will create the basic layout required for the PostWriter. We will look at `v-model`, a directive to handle two way binding.

Coding: Create the layout, and add a ref with v-model

```
<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="label">Title</div>
          <div class="control">
            <input v-model="title" type="text" class="input">
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column one-half">
        <div id="markdown" contenteditable />
      </div>

      <div class="column one-half">
        <div id="content" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="buttons is-pulled-right">
          <button class="button is-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

import { Post } from '@/types'

export default createComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
    const title = ref(props.post.title)

    return {
      title
    }
  }
})

</script>

<style scoped>
#markdown, #content {
  min-height: 400px;
  border: 1px solid #dbdbdb;
  padding: calc(0.75em - 1px);
  border-radius: 4px;
}

#markdown {
  white-space: pre-wrap;
  outline: none;
}

</style>
```

# 4.3 Implementing Two way binding manually on contenteditable

The ultimate goal will be to capture the user's input markdown and convert it to html. Before that, the first step will be simply capturing the input and rendering it in the preview pane. Unfortunately, v-model does not work with contentediable, so we need to implement this manually. It's a great way to see some new parts of the composition API, and how you might go about integrating non-Vue based components in your Vue applications.

Coding: introduce `onMounted` and `watch`. Also show how to use the `input` event to capture an event.

```
<div class="columns">
  <div class="column one-half">
    <div id="markdown" contenteditable @input="handleEdit" />
  </div>

  <div class="column one-half">
    <div id="content" v-html="content" />
  </div>
</div>

setup(props, ctx) {
  const title = ref(props.post.title)
  const markdown = ref(props.post.markdown)
  const content = ref(props.post.content)
  let editableDiv: HTMLDivElement | null = null

  onMounted(() => {
    const div = ctx.root.$el.querySelector<HTMLDivElement>('#markdown')
    if (!div) {
      throw Error('Content Editable not found')
    }

    editableDiv = div
    div.innerText = props.post.markdown
  })

  watch(() => markdown.value, (val) => {
    content.value = val
  })

  const handleEdit = () => {
    if (!editableDiv) {
      return
    }
    markdown.value = editableDiv.innerText
  }
})
```

# 4.4 Introducing `marked` to convert the markdown to HTML

We will use the awesome marked.js library to handle converting the markdown to HTML. 

Coding: install marked. `yarn add marked @types/marked`. Show how the conversion is working, explain about the styling.

Install sass-loader, node-sass, demo multiple `style` tags.

```
watch(() => markdown.value, (val) => {
  marked(markdown.value, {}, (err, res) => {
    if (err) {
      return
    }
    content.value = res
  })
})

// ...


<style lang="scss">
@import '../../markdown.scss';
</style>
```

```
// markdown.scss
#content {
  h1 { font-size: 1.7rem !important; }
  h2 { font-size: 1.3rem !important; }
  h3 { font-size: 1.1rem !important; }

  h1, h2, h3 {
    font-weight: bold;
  }

  p, ul, ol {
    padding: 5px 0;
  }

  li {
    list-style: disc;
    margin-left: 15px;
  }
}
```

# 4.5 Adding a test for the markdown functionality

The markdown conversion has quite a few steps involved - it's also a huge part of the application, which makes certain candidate for thorough testing. Let's start off.

Coding: explain about nextTick again.

```
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import PostWriter from '@/components/PostWriter/PostWriter.vue'
import { post } from '@/resources'

describe('PostWriter', () => {
  it('converts the post content to markdown on first render', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createTestVue(),
      propsData: {
        post: {
          ...post,
          markdown: '# My great post!\nThis is a *really exciting* post.',
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('#content').element.innerHTML
    ).toEqual(
      '<h1 id="my-great-post">My great post!</h1>\n<p>This is a <em>really exciting</em> post.</p>\n'
    )
  })

  it('updates the preview when markdown is updated', async () => {
    const wrapper = mount(PostWriter, {
      localVue: createTestVue(),
      propsData: {
        post: {
          ...post,
          markdown: '# My great post!\nThis is a *really exciting* post.',
        }
      }
    })

    await wrapper.vm.$nextTick()
    wrapper.find('#markdown').element.innerText = '## My new post'
    wrapper.find('#markdown').trigger('input')
    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('#content').element.innerHTML
    ).toEqual(
      '<h2 id="my-new-post">My new post</h2>\n'
    )
  })
})
```

# 4.5 Adding syntax highlighting with higlight.js

Our markdown and preview is looking pretty good. The last step is to add syntax highlighting. `marked` provides a great way to integrate any syntax highlighting library of your choice. I've used both prism and highlight.js, and found highlight.js to be the simplest to integrate, so we will be going with that.

Coding: `yarn install highlight.js @types/highlight.js`. Explain about importing the css globally (since we use it on multiple pages, unlikely to clash). Nothing to test!

```
// main.ts
import 'highlight.js/styles/github.css'
```

```
import marked, { MarkedOptions } from 'marked'
import { highlightAuto } from 'highlight.js'

// ...
const options: MarkedOptions = {
  highlight: (code: string) => {
    return highlightAuto(code).value
  }
}
watch(() => markdown.value, (val) => {
  marked(markdown.value, options, (err, res) => {
    if (err) {
      return
    }
    content.value = res
  })
})
```

# 4.6 Dispatching an Action to Insert the New Post into the Posts state

Now we have all the functionality in place to publish a basic post, let's add some code to the posts store to let us insert the post.

Coding: Add the relevant action and mutation + test. Note the edge case of using Math.max.

```ts
ADD_POST(post: Post) {
  this.state.all[post.id] = post
  this.state.ids.push(post.id)
}

async create(post: Post) {
  // const posts = await axios.post('/api/posts')
  await delay()
  const id = Math.max(...this.state.ids) + 1
  this.commit('ADD_POST', {...post, id })
}

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
```

# 4.7 Emitting a submitted event and dispatching a create action

Now we have the relevant Vuex action and mutation in place, we can update the PostWriter to call the action! We could call it directly in PostWriter, but it makes more sense to emit an event and handle this in the parent, NewPost. This is because when we use the PostWriter for `editing` a post, we will be using another action (instead of ADD_POST, something like UPDATE_POST).

Coding: emit a submitted event, mock usePosts and assert against mockCreate. Point out you can also test which arguments the function was called with. Explain workaround for Math.Infinity when no ids are present in the store.

```ts
// NewPost
<template>
  <PostWriter 
    :post="newPost" 
    @submitted="handleSubmit"
  />
</template>

const handleSubmit = (post: Post) => {
  posts.actions.create(post)
}

return {
  newPost,
  handleSubmit,
}
```

```ts
// NewPost.spec.ts
it('calls a create action when a post is submitted', async () => {
  const wrapper = mount(NewPost, {
    localVue: createTestVue(),
  })

  wrapper.find(PostWriter).find('button').trigger('click')
  await wrapper.vm.$nextTick()
  
  expect(mockCreate).toHaveBeenCalled()
})
```

```ts
PostWriter.vue

const handleSubmit = () => {
const post: Post = {
  ...props.post,
  title: title.value,
  content: content.value,
  markdown: markdown.value,
}

ctx.emit('submitted', post)
```


```ts
// store/posts.index.ts - actions
async create(post: Post) {
  // const posts = await axios.post('/api/posts')
  await delay()
  const id = this.state.ids.length 
    ? Math.max(...this.state.ids) + 1
    : 100
  this.commit('ADD_POST', {...post, id })
}
```