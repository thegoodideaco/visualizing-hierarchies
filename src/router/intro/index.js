import IntroReadme from './intro.md'
import ExamplesReadme from './examples.md'
import { SideNavLayout } from '@/layouts/componentViews'
import * as components from './asyncComponents'

/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'intro',
  path:      '/intro',
  redirect:  '/intro/setup',
  component: SideNavLayout,
  meta:      {
    title: 'Intro'
  },
  children: [
    {
      path:      '/intro/setup',
      component: components.Setup,
      meta:      {
        title: 'Setup'
      }
    },
    {
      path:      '/intro/welcome',
      component: components.intro,
      meta:      {
        title:  'Hello World!',
        readme: IntroReadme
      }
    },
    {
      path:      '/intro/examples',
      component: components.Examples,
      meta:      {
        title:  'Examples',
        readme: ExamplesReadme
      }
    }
  ]
}

export default config
