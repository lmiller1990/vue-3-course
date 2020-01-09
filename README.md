# Welcome to Vue.js 3: Composition API, TypeScript and Unit Testing!

Title: Vue.js 3.0: The Composition API, TypeScript, Vuex, VueRouter and Unit Testing

In this guide, we will build a blogging applications for developers. It supports writing posts using markdown.
```
function demo() {
  console.log('It supports syntax highlighting, too!')
}
```
In this course, I'll teach you:
- Vue.js 3 and the Composition API
- TypeScript
- Unit Testing with Jest and `vue-test-utils` (my favorite topic)
- Typesafe Vuex with `vuex-smart-module`
- Using `vue-router`
- ...and much more!

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
import { createLocalVue } from '@vue/test-utils'
import Composition from '@vue/composition-api'

const createTestVue = () => {
  const localVue = createLocalVue()
  localVue.use(Composition)

  return localVue
}

export {
  createTestVue
}
```

```ts
  // with router
  const localVue = createTestVue()
  localVue.use(VueRouter)
  it('renders posts', async () => {
    const wrapper = mount(Timeline, {
      localVue,
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

# 4.6 Adding syntax highlighting with higlight.js

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

# 4.7 Dispatching an Action to Insert the New Post into the Posts state

Now we have all the functionality in place to publish a basic post, let's add some code to the posts store to let us insert the post.

Coding: Add the relevant action and mutation + test. Note the edge case of using Math.max where it returns -Infinity.

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

# 4.8 Emitting a submitted event and dispatching a create action

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

# 4.9 Using `mocks` to fake a router and fixing the SET_POSTS mutation

There is a bug - once we create our post, if we navigate back to the root page, it doesn't show up! That's because in we are overwriting it in the `SET_POSTS` mutation. Let's update `SET_POSTS` to update any existing posts. This time, let's write the test first.

Coding: Update the SET_POSTS mutation and test to not reset the state each time. Discuss the `mocks` mounting option.

That brings us to the end of this section. The next series of lectures will focus on the concept of a user, signin up and logging in.

```ts
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
```

```ts
SET_POSTS(posts: Post[]) {
  for (const post of posts) {
    if (!this.state.ids.includes(post.id)) {
      this.state.ids.push(post.id)
    }

    this.state.all[post.id] = post
  }
}
```

Update NewPost to redirect to the root:

```ts
const handleSubmit = async (post: Post) => {
  await posts.actions.create(post)
  ctx.root.$router.push('/')
}
```

And update NewPost.spec.ts:

```ts
it('calls a create action when a post is submitted and redirects to root', async () => {
  const wrapper = mount(NewPost, {
    localVue: createTestVue(),
    mocks: {
      $router: { push: () => {} }
    }
  })

  wrapper.find(PostWriter).find('button').trigger('click')
  await wrapper.vm.$nextTick()
  
  expect(mockCreate).toHaveBeenCalled()
})
```

# 5.0 Users Sign Up, Log in and Validation

This is the section where we finally introduce the concept of a user. We will change which buttons show in the TopNav depending on if the user has signed in, as well as allow users to edit their own posts, and view other users' post. We will also implement a sign in form with some basic validation.

Coding: Show the signup form with validation.

In a large, complex app, I might lean towards something like Vuelidate or Vee-Validate. They are large, complete libraries. Since the validation I want is very simple, I'll be writing my own. It's also a great way to see some more of the Composition API, as well as build our first truly modular component that could easily be reused in another application.

# 5.1 Creating the NewUser component and route

Let's make the NewUser route and view.

Coding: Create a NewUser.vue component and route.


```ts // router/index.ts
import NewUser from '../views/NewUser.vue'

const routes = [
  {
    path: '/users/new',
    name: 'NewUser',
    component: NewUser
  },
  // ...
```

```html // views/NewPost.vue
<template>
  <div>
    New User
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'NewUser',
})
</script>
```

# 5.2 Creating new NewUser route and a ValidatorInput Custom Component

Let's create a Signup component, and a basic component called ValidatorInput that wraps an input with the Bulma styling. We will also start implementing v-model on a custom component, which is tiny bit more involved that a regular HTML component, since Vue can't know how your component handles inputs.

Coding: Signup.vue and ValidatorInput.vue, update NewUser.vue. Show v-model not working (yet).

```html NewUser.vue
<template>
  <Signup />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import Signup from '@/components/Signup/Signup.vue'

export default createComponent({
  name: 'NewUser',

  components: {
    Signup
  }
})
</script>
```

```html Signup.vue
<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        name="username"
        type="text"
        label="Username"
        v-model="username"
      />
      {{ username }}

      <ValidatorInput 
        name="email"
        type="email"
        label="Email"
      />

      <ValidatorInput 
        name="password"
        type="password"
        label="Password"
      />
    </form>
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

import ValidatorInput from '../ValidatorInput/ValidatorInput.vue'

export default createComponent({
  components: {
    ValidatorInput,
  },

  setup() {
    const username = ref('Lachlan')
    const handleSubmit = () => {
    }

    return {
      handleSubmit,
      username
    }
  }
})
</script>
```

```html ValidatorInput
<template>
  <div class="field">
    <label class="label">
      {{ label }}
    </label>
    <div class="control">
      <input 
        :type="type" 
        :name="name"
        class="input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    }
  },

  setup() {
  }
})
</script>
```

```ts ValidatorInput.spec.ts
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import ValidatorInput from '../ValidatorInput.vue'

describe('ValidatorInput', () => {
  it('renders', async () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username'
      }
    })
  })
})
```


# 5.3 Implementing a custom v-model using @input and :value

Let's finish the custom v-model.

Coding: Explain v-model is just @input and :value. Write a test. Show event.target.value in the browser.

```html
<template>
  <div class="field">
    <label class="label">
      {{ label }}
    </label>
    <div class="control">
      <input 
        :type="type" 
        :name="name"
        @input="handleInput"
        :value="value"
        class="input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
    // ...
    value: {
      type: String,
      required: true,
    },
  },

  setup(props, ctx) {
    const handleInput = (e: any) => {
      ctx.emit('input', e.target.value)
    }

    return {
      handleInput,
    }
  }
})
</script>
```

```ts ValidatorInput.spec.ts
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import ValidatorInput from '../ValidatorInput.vue'

describe('ValidatorInput', () => {
  it('emits an event with current value', async () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username',
        value: '',
      }
    })

    wrapper.find('input').setValue('some-value')

    expect(wrapper.emitted().input[0][0]).toBe('some-value')
  })
})
```

# 5.4 Defining the Rule type and test driving the validator.ts.

Before we get started showing errors and validations in the form, let's think a bit about the API we want to expose - after all, we want this component to be modular and generic enough to be used in future applications.

Coding: Rule type, for MinLength, and write the tests for validation using TDD. Show that it and aexpect are generic.

```ts validation.ts
interface MinLength {
  name: 'min-length'
  length: number
}

interface MaxLength {
  name: 'max-length'
  length: number
}

export interface Status {
  valid: boolean
  message?: string
}

export type Rule = MinLength | MaxLength

const minLength = (n: number): MinLength => {
  return {
    name: 'min-length',
    length: n
  }
}

const maxLength = (n: number): MaxLength => {
  return {
    name: 'max-length',
    length: n
  }
}

interface Payload {
  value: string
  rules: Rule[]
}

const validate = (payload: Payload): Status => {
  for (const rule of payload.rules) {
    if (rule.name === 'min-length' && payload.value.length < rule.length) {
      return {
        valid: false,
        message: `The value is too short. Minimum length is ${rule.length}.`
      }
    }

    if (rule.name === 'max-length' && payload.value.length > rule.length) {
      return {
        valid: false,
        message: `The value is too long. Maximum length is ${rule.length}.`
      }
    }
  }

  return {
    valid: true,
  }
}

export {
  validate,
  minLength,
  maxLength,
}
```

```ts validation.spec.ts
import { validate, minLength, maxLength, Status } from '../validate'

describe('validate', () => {
  it('returns invalid due when too short', () => {
    const result = validate({ 
      value: '1234',
      rules: [minLength(5)]
    })

    const expected: Status = {
      valid: false,
      message: 'The value is too short. Minimum length is 5.'
    }

    expect(result).toEqual(expected)
  })

  it('returns invalid due when too long', () => {
    const result = validate({ 
      value: '12345678',
      rules: [maxLength(5)]
    })

    const expected: Status = {
      valid: false,
      message: 'The value is too long. Maximum length is 5.'
    }

    expect(result).toEqual(expected)
  })

  it('returns valid when length is within limits', () => {
    const result = validate({ 
      value: '1234',
      rules: [minLength(3), maxLength(5)]
    })

    const expected: Status = {
      valid: true,
      message: undefined
    }

    expect(result).toEqual(expected)
  })
})
```

# 5.5 Using `reactive` to integrate the validation with the ValidatorInput

Now we have the validation working, let's integrate it into the ValidatorInput.

Coding: Integrate validate.ts with ValidatorInput.

```
<template>
  <div class="field">
    <label class="label">
      {{ label }}
    </label>
    <div class="control">
      <input 
        :type="type" 
        :name="name"
        @input="handleInput"
        @keyup="handleValidation"
        :value="value"
        class="input"
      />
    </div>

    <span>
      <p v-if="!validity.valid" class="help is-danger">{{ validity.message }}</p>
    </span>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'

import { validate, Rule, Status } from './validate'

export default createComponent({
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    rules: {
      type: Array as () => Rule[],
      default: () => []
    }
  },

  setup(props, ctx) {
    const validity = reactive<Status>({
      valid: true,
      message: undefined
    })

    const handleInput = (e: any) => {
      ctx.emit('input', e.target.value)
    }

    const handleValidation = () => {
      const result = validate({ value: props.value, rules: props.rules })

      validity.valid = result.valid
      validity.message = result.message
    }

    return {
      handleInput,
      handleValidation,
      validity,
    }
  }
})
</script>
```

```
<template>
  <section class="section">
    <form @submit.prevent="handleSubmit">
      <ValidatorInput 
        name="username"
        type="text"
        label="Username"
        v-model="username"
        :rules="usernameRules"
      />
  </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

import ValidatorInput from '../ValidatorInput/ValidatorInput.vue'
import { minLength, maxLength } from '../ValidatorInput/validate'

export default createComponent({
  components: {
    ValidatorInput,
  },

  setup() {
    const username = ref('')
    const handleSubmit = () => {
    }

    return {
      usernameRules: [minLength(5), maxLength(10)],
      handleSubmit,
      username
    }
  }
})
</script>
```

# 5.6 Testing Validator Input

Ok, it works. Let's test it.

Coding: write the tests. Touch on why setInput and trigger(keyup) does not work.

```ts
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import ValidatorInput from '../ValidatorInput.vue'
import { minLength } from '../validate'

describe('ValidatorInput', () => {
  it('emits an event with current value', async () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username',
        value: '',
      }
    })

    wrapper.find('input').setValue('some-value')

    expect(wrapper.emitted().input[0][0]).toBe('some-value')
  })

  it('shows an error when invalid', async () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username',
        value: 'val',
        rules: [minLength(4)]
      }
    })

    wrapper.find('input').trigger('keyup')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.is-danger').text()).toEqual(
      'The value is too short. Minimum length is 4.'
    )
  })

  it('shows no error when valid', async () => {
    const wrapper = mount(ValidatorInput, {
      localVue: createTestVue(),
      propsData: {
        label: 'Username',
        type: 'text',
        name: 'username',
        value: 'hello',
        rules: [minLength(4)]
      }
    })

    wrapper.find('input').trigger('keyup')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.is-danger').exists()).toEqual(false)
  })
})
```

# 5.7 Adding a debounce

Let's add a debounce to make it less jarring. We will also see some new, cool tricks with Jest. Lodash has a debounce method.

Coding: yarn add lodash @types/lodash. Test using `done`.

```ts
const handleValidation = debounce(() => {
  const result = validate({ value: props.value, rules: props.rules })

  validity.valid = result.valid
  validity.message = result.message
}, 500)
```


```ts
it('emits an event with current value', async () => {
  // ...
  setTimeout(() => {
    expect(wrapper.find('.is-danger').text()).toEqual(
      'The value is too short. Minimum length is 4.'
    )
    done()
  }, 600)

  // ...
```

# 5.8 Completing the Signup Component

We have a solid ValidatorInput control - let's finish the Signup component.

Coding: Build out Signup with ValidatorInputs, implement forValidity state with type safety, emit an event when submitted and respond to event in parent. 

Exercise: Implement a format validation rule.


```html Signup.vue
<script lang="ts">
import { createComponent, ref, reactive } from '@vue/composition-api'

import ValidatorInput from '../ValidatorInput/ValidatorInput.vue'
import { minLength, maxLength } from '../ValidatorInput/validate'
import { NewUser } from '@/types'

type Name = 'username' | 'password' | 'email'

interface ValidatedInput {
  name: Name
  valid: boolean
}

type FormValidationState = {
  [key in Name]: boolean
}

export default createComponent({
  components: {
    ValidatorInput,
  },

  setup(props, ctx) {
    const formValidationState = reactive<FormValidationState>({
      username: false,
      email: false,
      password: false,
    })

    const handleSubmit = () => {
      const newUser: NewUser = {
        username: username.value,
        email: email.value,
        password: password.value,
      }
      ctx.emit('signup', newUser)
    }

    const handleValidate = (validated: ValidatedInput) => {
      formValidationState[validated.name] = validated.valid
      formValid.value = Object.values(formValidationState).every(x => x)
    }

    return {
      handleValidate,
    }
  }
})
</script>
```

```ts ValidatorInput
const handleValidation = debounce(() => {
  const result = validate({ value: props.value, rules: props.rules })
  validity.valid = result.valid
  validity.message = result.message
  ctx.emit('validate', {
    name: props.name,
    valid: result.valid,
  })
}, 500)
```

```ts src/types.ts
export interface NewUser {
  username: string
  password: string
  email: string
}
```

```ts views/NewUser.vue
const handleSignup = (newUser: NewUser) => {
  // ... dispatch createUser action
}

return {
  handleSignup,
}
```

# 5.9 Testing the Signup Flow

Finally, everything is in place. Let's add a final test, to make sure all the Signup workflow is working correctly.

Coding: write test. Show of generic toEqual.

```ts
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import Signup from '../Signup.vue'
import { NewUser } from '@/types'

describe('Signup', () => {
  it('can be submitted when all fields are valid', async (done) => {
    const wrapper = mount(Signup, {
      localVue: createTestVue()
    })
    expect(wrapper.find('button').attributes('disabled')).toBe('disabled')

    wrapper.find('input[name="username"]').setValue('username')
    wrapper.find('input[name="username"]').trigger('keyup')
    wrapper.find('input[name="email"]').setValue('email')
    wrapper.find('input[name="email"]').trigger('keyup')
    wrapper.find('input[name="password"]').setValue('password')
    wrapper.find('input[name="password"]').trigger('keyup')

    await wrapper.vm.$nextTick()

    setTimeout(() => {
      expect(wrapper.find('button').attributes('disabled')).toBe(undefined)
      wrapper.find('form').trigger('submit.prevent')
      expect(wrapper.emitted().signup[0][0]).toEqual<NewUser>({
        email: 'email',
        password: 'password',
        username: 'username'
      })
      done()
    }, 600)
  })
})
```


# 6.0 Creating Users, Log In, Log Out

Introduce the section. We will create the entire Users store, then implement login/logout. We will also code logic to update the TopNav respectively.

Coding: Demo.

# 6.1: Defining the User Interface

Let's define a User interface, and create some mock users.

```ts
// src/types.ts
export interface User {
  id: number
  username: string
  isCurrentUser: boolean
}
```

```ts resources.ts
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
```

# 6.2 Defining the Users Store

Let's define the Users Store; all the classes, the mutations we want, and the initial state.

Coding: the store. In the next video, we will use TDD to write the mutations.

```ts
import { Module, Mutations, Actions, Getters } from 'vuex-smart-module'
import { Store } from 'vuex'

import { User, HashMap, NewUser } from '@/types'
import { userA, userB } from '@/resources'

export interface State {
  ids: number[]
  all: HashMap<User>
  authenticated: boolean
}

export class UsersState implements State {
  ids = [userA.id, userB.id]
  all = {
    [userA.id]: userA,
    [userB.id]: userB,
  }
  authenticated = false
}

export class UsersMutations extends Mutations<UsersState> {
  LOGIN(payload: User) {
  }

  LOGOUT(payload: User) {
  }

  ADD_USER(payload: NewUser) {
  }
}

export class UsersGetters extends Getters<UsersState> {
}

export class UsersActions extends Actions<UsersState, UsersGetters, UsersMutations, UsersActions> {
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
```

# 6.3 Writing the Mutations using TDD

TDD Time!!

Coding: Mutations and tests.

```ts
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
```

```ts
import { inject } from 'vuex-smart-module'

import { State, UsersMutations, UsersActions, UsersGetters } from '../index'
import { User } from '@/types'

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
```

# 6.4 Writing the Actions using TDD

Actions!

Coding: Actions. Tests. Pros/cons of using delay, discuss mock.calls, mock Axios. Point out duplication and opportunity to refactor as an exercise.


```ts
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
```

```ts
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
```


# 6.5 Writing the Getters using TDD

Easy... just code getById and currentUser.


```ts
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
```

```ts
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
```

# 6.6 Importing the Store, Signup and Login!

Now we have done all the hard work, let's sign our user in!

Let's import the store to the store/index.ts so we can actually use it. Then let's allow a user to sign in!


Coding: import the users store to store/index.ts. Update NewUser.vue to dispatch the action and redirect. Explain how the same user will be signed-in no matter what.

```ts
import { posts } from './posts'

const root = new Module({
  modules: {
    posts: posts,
    users: users,
  }
})
```

```ts
import { useUsers } from '@/store/users'

export default createComponent({
  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)
    const handleSignup = async (newUser: NewUser) => {
      // ... dispatch createUser action
      await users.actions.signup(newUser)
      ctx.root.$router.push('/')
    }

    return {
      handleSignup,
    }
  }
})
```

# 6.7 Update the TopNav based on current authentication status

Let's update the TopNav now we have the concept of authentication.

Coding: Add data-test attributes. Stub the Router Link. Mock the users store.

```html // TopNav.vue
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
              v-if="!authenticated"
              class="button"
              to="/users/new"
              data-test-signup
            >  
              Sign Up
            </RouterLink>

            <RouterLink 
              v-if="!authenticated"
              class="button"
              to="/users/login"
              data-test-login
            >  
              Log In
            </RouterLink>

            <RouterLink 
              v-if="authenticated"
              class="button"
              to="/posts/new"
              data-test-new-post
            >  
              New Post
            </RouterLink>

            <button 
              v-if="authenticated"
              class="button"
              @click="logout"
              data-test-logout
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
import { createComponent, computed } from '@vue/composition-api'

import { useUsers } from '@/store/users'

export default createComponent({
  name: 'TopNav',

  setup(props, ctx) {
    const users = useUsers(ctx.root.$store)
    const logout = () => {
      console.log('Log out')
    }

    const authenticated = computed(() => users.state.authenticated)

    return {
      logout,
      authenticated,
    }
  },
})
</script>
```

```ts // TopNav.spec.ts
import { mount } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import TopNav from '../TopNav.vue'

let mockAuthenticated = false
jest.mock('@/store/users', () => {
  return {
    useUsers: () => ({
      state: {
        authenticated: mockAuthenticated
      }
    })
  }
})


it('shows login and signup when user is not authenticated', () => {
  mockAuthenticated = false
  const wrapper = mount(TopNav, {
    localVue: createTestVue(),
    stubs: {
      RouterLink: true
    }
  })

  expect(wrapper.find('[data-test-login]').exists()).toEqual(true)
  expect(wrapper.find('[data-test-signup]').exists()).toEqual(true)
  expect(wrapper.find('[data-test-logout]').exists()).toEqual(false)
  expect(wrapper.find('[data-test-new-post]').exists()).toEqual(false)
})

it('shows new post and logout when user is authenticated', () => {
  mockAuthenticated = true
  const wrapper = mount(TopNav, {
    localVue: createTestVue(),
    stubs: {
      RouterLink: true
    }
  })

  expect(wrapper.find('[data-test-login]').exists()).toEqual(false)
  expect(wrapper.find('[data-test-signup]').exists()).toEqual(false)
  expect(wrapper.find('[data-test-logout]').exists()).toEqual(true)
  expect(wrapper.find('[data-test-new-post]').exists()).toEqual(true)
})
```


/****
OTHER STUFF
****/


# 7.0 Finish the App

By this point, I have introduced most of the new features and techniques I wanted to cover. This last section will be about adding the finishing touches to the app, going over some of the techniques we covered and fixing some edge cases. 

# 7.1 Adding a Show Post Page

We allowed the user to create beautiful posts using markdown with syntax highlighting - we should add a show page now! This is pretty easy.

Coding: ShowPost.vue. Update routes. Add a getById action.

```ts router/index.ts
{
  path: '/posts/:id',
  name: 'ShowPost',
  component: ShowPost
}
```

```ts
async getById(id: number) {
  // const posts = await axios.get('/api/posts/:id')
  await delay()
  await delay()
  const thePost = allPosts.find(x => x.id === id)!
  console.log(thePost)
  this.commit('SET_POSTS', [ thePost ])
}
```

```ts
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
```

```html /views/ShowPost.vue
<template>
  <div v-if="!post">
    Loading...
  </div>

  <div v-else>
    {{ post }}
  </div>
</template>

<script lang="ts">
import { ref, createComponent, computed, watch } from '@vue/composition-api'

import { usePosts } from '@/store/posts'
import { Post } from '../types'


export default createComponent({
  name: 'ShowPost',
  
  components: {
    // PostViewer,
  },

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)
    const id = ctx.root.$route.params.id
    if (!posts.state.all[id]) {
      posts.actions.getById(parseInt(id, 10))
    }
    const post = computed(() => posts.state.all[id])

    return {
      post,
    }
  },
})
</script>
```

# 7.2 Adding a PostViewer Component

Now we have the route, let's introduce a PostViewer. This will show the post's markdown, as well as some buttons to do things like share and edit the post.

```html
<template>
  <div class="columns">
    <div class="column"></div>

    <div class="column is-two-thirds">

      <div class="columns">
        <div class="column">
          <div class="is-pulled-right">
            <RouterLink class="button is-rounded is-link" to="#">
              <i class="fas fa-edit" />
            </RouterLink>

            <div class="button is-rounded is-success">
              <i class="fas fa-share" />
            </div>

            <div class="button is-rounded is-info">
              <i class="far fa-thumbs-up" />
            </div>
          </div>
        </div>
      </div>

      <h1 class="title">
        {{ post.title }}
      </h1>

      <div class="post-html" v-html="post.markdown" />
    </div>

    <div class="column"></div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, reactive } from '@vue/composition-api'

import { Post } from '../../types'

export default createComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    }
  },

  setup(props, ctx) {
    return {
    }
  }
})
</script>
```

```ts
import { mount, } from '@vue/test-utils'

import { createTestVue } from '@/testHelper'
import PostViewer from '../PostViewer.vue'
import { post } from '@/resources'
import VueRouter from 'vue-router'

describe('PostViewer', () => {
  it('Renders the article', async () => {
    const localVue = createTestVue()
    localVue.use(VueRouter)
    const wrapper = mount(PostViewer, {
      localVue,
      router: new VueRouter(),
      propsData: {
        post: {
          ...post,
          title: 'Title',
          markdown: '<div>OK</div>'
        }
      }
    })

    expect(wrapper.find('h1').text()).toBe('Title')
    expect(wrapper.find('.post-html').element.innerHTML).toBe('<div>OK</div>')
  })
})
```

# 7.3 Authorizing Editing the Post

We haven't got an `/edit` link - but this is pretty easy, we can reuse the `PostWriter` component. What we do need to do is ensure that a user cannot edit another user's post.

Coding: Use currentUser getter and authorId decide if a post is editable.


```ts PostViewer
<RouterLink 
  v-if="canEdit"
  class="button is-rounded is-link" 
  data-edit
  :to="editUrl"
>
  <i class="fas fa-edit" />
</RouterLink>

// ...

setup(props, ctx) {
  const users = useUsers(ctx.root.$store)
  const canEdit = ref(false)
  const editUrl = `/posts/${props.post.id}/edit`

  if (
    users.getters.currentUser() &&
    props.post.authorId === users.getters.currentUser()!.id
  ) {
    canEdit.value = true
  }

  return {
    canEdit,
    editUrl,
  }
}
```

Test:

```ts PostViewer.spec.ts
import { mount, } from '@vue/test-utils'
import VueRouter from 'vue-router'

import { createTestVue } from '@/testHelper'
import PostViewer from '../PostViewer.vue'
import { post, userA as mockUserA } from '@/resources'

jest.mock('@/store/users', () => {
  return {
    useUsers: () => ({
      getters: {
        currentUser: () => ({
          ...mockUserA,
          id: 1
        })
      }
    })
  }
})


describe('PostViewer', () => {
  const localVue = createTestVue()
  localVue.use(VueRouter)

  it('shows edit button when authorized', async () => {
    const wrapper = mount(PostViewer, {
      localVue,
      router: new VueRouter(),
      propsData: {
        post: {
          ...post,
          authorId: 1,
          title: 'Title',
          markdown: '<div>OK</div>'
        }
      }
    })

    expect(wrapper.find('[data-edit]').exists()).toBe(true)
  })

  it('does not show edit button when not authorized', async () => {
    const wrapper = mount(PostViewer, {
      localVue,
      router: new VueRouter(),
      propsData: {
        post: {
          ...post,
          authorId: 2,
          title: 'Title',
          markdown: '<div>OK</div>'
        }
      }
    })

    expect(wrapper.find('[data-edit]').exists()).toBe(false)
  })
})
```

# 7.4 Editing Posts with the PostWriter Component

Now we've got a link to edit posts (for authorized users) we should go ahead and allow them to edit the post! It's easy, we can basic copy-paste the NewPost component.


```
{
  path: '/posts/:id/edit',
  name: 'EditPost',
  component: EditPost
}
```

```EditPost.vue
<template>
  <PostWriter
    :post="post"
  />
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'

import { usePosts } from '@/store/posts'
import { Post } from '../types'
import PostWriter from '@/components/PostWriter/PostWriter.vue'


export default createComponent({
  name: 'EditPost',
  
  components: {
    PostWriter,
  },

  setup(props, ctx) {
    const posts = usePosts(ctx.root.$store)
    const id = ctx.root.$route.params.id
    if (!posts.state.all[id]) {
      posts.actions.getById(parseInt(id, 10))
    }
    const post = computed(() => posts.state.all[id])

    return {
      post,
    }
  },
})
</script>
```

# 7.5 Sorting the Timeline Posts by Date

Let's sort the posts by date! Talk about making it separate to add more filters/ordering later, eg by like. tag...

```ts
import moment from 'moment';

import { Post } from '@/types';
import { Period } from './types';

const filterByPeriod = (period: Period, posts: Post[]): Post[] => {
  if (period === 'Today') {
    return posts.filter(
      x => x.created.isSameOrAfter(moment().subtract(1, 'days'))
    )
  }

  if (period === 'This Week') {
    return posts.filter(
      x => x.created.isSameOrAfter(moment().subtract(7, 'days'))
    )
  }

  if (period === 'This Month') {
    return posts.filter(
      x => x.created.isSameOrAfter(moment().subtract(1, 'month'))
    )
  }

  throw Error(`Period ${period} is not valid`)
}

export { filterByPeriod } 

```

```ts
const allPosts = computed(() =>
  filterByPeriod(activeTab.value, posts.getters.allPosts())
)
```

# 7.6 Implementing Log Out

The final thing we will cover is logging out! Another easy one.

# 7.7 Conclusion, Improvements and Summary