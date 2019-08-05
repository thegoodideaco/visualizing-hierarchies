


// import IntroReadme from './intro.md'
import { SideNavLayout } from '@/layouts/componentViews'
import * as components from './asyncComponents'


/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'outro',
  path:      '/outro',
  redirect:  '/outro/thanks',
  component: SideNavLayout,
  meta:      {
    title: 'Outro'
  },
  children: [
    {
      path:      '/outro/thanks',
      component: components.intro,
      meta:      {
        title: 'Thank You!'
      }
    }
  ]
}

export default config