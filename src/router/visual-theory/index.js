


import Sfc from '@/views/vue/sfc.md'
import IntroReadme from './intro.md'
import { SideNavLayout } from '@/layouts/componentViews'
import * as components from './asyncComponents'


/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'theory',
  path:      '/theory',
  redirect:  '/theory/intro',
  component: SideNavLayout,
  meta:      {
    title: 'Visual Theory'
  },
  children: [
    {
      path:      '/theory/intro',
      component: components.intro,
      meta:      {
        title:  'Order from Chaos',
        readme: IntroReadme
      }
    },
    {
      path:      '/theory/intro',
      component: components.sfc,
      meta:      {
        title:  'Gestalt Theory',
        readme: Sfc
      }
    },
    {
      path:      '/vue/reactivity',
      component: components.reactivity,
      meta:      {
        title:  'Principles of Grouping',
        readme: IntroReadme
      }
    },
    {
      path:      '/vue/rendering',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'Visual Variables',
        readme: IntroReadme
      }
    }
  ]
}

export default config