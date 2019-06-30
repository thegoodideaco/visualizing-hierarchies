/** @type {import('vue-router').RouteConfig[]} */
const routes = [
  {
    path:      '/',
    name:      'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path:      '/intro',
    name:      'introduction',
    component: () =>
      import(/* webpackChunkName: "intro" */ '@/views/intro.vue'),
    meta: {
      title: 'Introduction'
    }
  },
  {
    path:      '/definition',
    name:      'definition',
    component: () =>
      import(/* webpackChunkName: "definition" */ '@/views/About.vue'),
    meta: {
      title: 'Defining a Hierarchy'
    }
  },
  {
    path:      '/examples',
    name:      'examples',
    component: () =>
      import(/* webpackChunkName: "examples" */ '@/views/Examples.vue'),
    meta: {
      title: 'Examples'
    }
  },
  {
    path:      '/about',
    name:      'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

export default routes
