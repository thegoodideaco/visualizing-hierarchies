const components = {
  home: () => import(
    /* webpackChunkName: "home" */
    '@/views/Home.vue'
  ),
  intro: () => import(
    /* webpackChunkName: "intro" */
    '@/views/intro.vue'
  ),
  definition: () => import(
    /* webpackChunkName: "definition" */
    '@/views/About.vue'
  ),
  examples: () => import(
    /* webpackChunkName: "examples" */
    '@/views/Examples.vue'
  )
}

/** @type {import('vue-router').RouteConfig[]} */
const routes = [
  {
    path:      '/',
    name:      'home',
    component: components.home
  },
  {
    path:      '/intro',
    name:      'introduction',
    component: components.intro,
    meta:      {
      title: 'Introduction'
    }
  },
  {
    path:      '/definition',
    name:      'definition',
    component: components.definition,
    meta:      {
      title: 'Defining a Hierarchy'
    }
  },
  {
    path:      '/examples',
    name:      'examples',
    component: components.examples,
    meta:      {
      title: 'Examples'
    }
  }
]

export default routes
