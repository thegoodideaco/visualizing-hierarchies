
/* eslint-disable */

import IntroReadme from '@/views/vue/intro.md'
import Sfc from '@/views/vue/sfc.md'
import ReactivityReadme from '@/views/reactivity.md'
import SlotsReadme from './slots.md'
import RenderingReadme from './rendering.md'
import { SideNavLayout } from '@/layouts/componentViews';
import * as components from './asyncComponents'


/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'vue',
  path:      '/vue',
  redirect: '/vue/intro',
  component: SideNavLayout,
  meta:      {
    title: 'Vue'
  },
  children: [
    {
      path:      '/vue/intro',
      component: components.intro,
      meta:      {
        title:  'What is Vue?',
        readme: IntroReadme
      }
    },
    {
      path:      '/vue/code/single-file-component',
      component: components.sfc,
      meta:      {
        title:  'Making a Component',
        readme: Sfc
      }
    },
    {
      path:      '/vue/reactivity',
      component: components.reactivity,
      meta:      {
        title:  'Reactivity',
        readme: ReactivityReadme
      }
    },
    {
      path:      '/vue/rendering',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'Template Rendering',
        readme: RenderingReadme
      }
    },
    {
      path:      '/vue/interaction',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'Interaction',
        readme: ReactivityReadme
      }
    },
    {
      path:      '/vue/nesting',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'Nesting Components',
        readme: ReactivityReadme
      }
    },
    {
      path:      '/vue/slots',
      component: components.slots,
      meta:      {
        title: 'Slots',
        readme: SlotsReadme
      }
    }
  ]
}

export default config