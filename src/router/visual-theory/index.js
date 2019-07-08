


import IntroReadme from './intro.md'
import GestaltReadme from './gestalts.md'
import VariableReadme from './variables.md'
import GroupingReadme from './grouping.md'
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
      path:      '/theory/gestalt',
      component: components.gestalt,
      meta:      {
        title:  'Gestalt Theory',
        readme: GestaltReadme
      }
    },
    {
      path:      '/theory/grouping',
      component: components.grouping,
      meta:      {
        title:  'Law of Prägnanz',
        readme: GroupingReadme
      }
    },
    {
      path:      '/theory/variables',
      component: components.variables,
      meta:      {
        title:  'Visual Variables',
        readme: VariableReadme
      }
    }
  ]
}

export default config