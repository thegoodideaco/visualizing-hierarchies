
/* eslint-disable */

import IntroReadme from '@/views/vue/intro.md'
import { SideNavLayout } from '@/layouts/componentViews';
import { IntroView } from '@/views/vue';

/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'advanced',
  path:      '/advanced',
  component: SideNavLayout,
  meta:      {
    title: 'Advanced'
  },
  children: [
    {
      path:      '/advanced/generator',
      component: IntroView,
      meta:      {
        title:  'Hierarchy Generator',
        readme: IntroReadme
      }
    },
    {
      path:      '/advanced/force-graphs',
      component: IntroView,
      meta:      {
        title:  'Force Graphs',
        readme: IntroReadme
      }
    },
    {
      path:      '/advanced/brushing',
      component: IntroView,
      meta:      {
        title:  'Selection Brushing',
        readme: IntroReadme
      }
    }
  ]
}

export default config