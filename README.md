# 0. Introduce the Course, App

In this course, we will be building the front-end for a blogging platform, similar to Medium or Dev.to. I will give a demo of the application in a moment. Their are three main focuses of this course:

- Building applications with Vue.js 3, specifically focusing on the new features including the Composition API and Portals.
- Use of TypeScript throughout the app, including the unit tests and the Vuex store.
- Unit testing, using Vue Test Utils and Jest.

To keep the course focused, we will not be building a back-end. However, we will include artificial delays to simulate API calls to a server, and how to handle loading states and transitions. This will make it easy to add a back end in the future, if we so desire.

Lastly, this course is made for intermediate users of JavaScript frameworks like Vue.js - I assume you have some knowledge of modern JavaScript and web development. We move quickly but thoroughly.

# 1. Getting Setup

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