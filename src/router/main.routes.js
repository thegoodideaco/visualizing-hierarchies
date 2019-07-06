import { HomeView, IntroView, AboutView, ExampleView, PerceptionView } from '@/views/asyncComponents'

const components = {
  home:       HomeView,
  intro:      IntroView,
  definition: AboutView,
  examples:   ExampleView,
  Perception: PerceptionView
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
