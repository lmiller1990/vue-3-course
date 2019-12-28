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