
/* eslint-disable */

import IntroReadme from '@/views/vue/intro.md'

/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'advanced',
  path:      '/advanced',
  component: () => import('@/layouts/SidenavLayout.vue'),
  meta:      {
    title: 'Advanced'
  },
  children: [
    {
      path:      '/advanced/generator',
      component: () => import('@/views/vue/Intro.vue'),
      meta:      {
        title:  'Hierarchy Generator',
        readme: IntroReadme
      }
    },
    {
      path:      '/advanced/force-graphs',
      component: () => import('@/views/vue/Intro.vue'),
      meta:      {
        title:  'Force Graphs',
        readme: IntroReadme
      }
    },
    {
      path:      '/advanced/brushing',
      component: () => import('@/views/vue/Intro.vue'),
      meta:      {
        title:  'Selection Brushing',
        readme: IntroReadme
      }
    }
  ]
}

export default config