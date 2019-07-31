


import IntroReadme from './intro.md'
import { SideNavLayout } from '@/layouts/componentViews'
import * as components from './asyncComponents'


/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'intro',
  path:      '/intro',
  redirect:  '/intro/welcome',
  component: SideNavLayout,
  meta:      {
    title: 'Intro'
  },
  children: [
    {
      path:      '/intro/welcome',
      component: components.intro,
      meta:      {
        title:  'Hello World!',
        readme: IntroReadme
      }
    },
    {
      path:      '/intro/setup',
      component: components.Setup,
      meta:      {
        title:  'Setup',
        readme: IntroReadme
      }
    }
  ]
}

export default config