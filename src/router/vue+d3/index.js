
import ShapesReadme from './shapes.md'
import LayoutsReadme from './layouts.md'
import ForceReadme from './force.md'
import * as components from './asyncComponents'
import { SideNavLayout } from '@/layouts/componentViews'


/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'vued3',
  path:      '/vue-d3',
  redirect:  '/vue-d3/shapes',
  component: SideNavLayout,
  meta:      {
    title: 'Vue + D3'
  },
  children: [
    {
      path:      '/vue-d3/shapes',
      component: components.Shapes,
      meta:      {
        title:  'Shapes',
        readme: ShapesReadme
      }
    },
    {
      path:      '/vue-d3/code/Layouts',
      component: components.Layouts,
      meta:      {
        title:  'Layouts',
        readme: LayoutsReadme
      }
    },
    // {
    //   path:      '/vue/code/single-file-component/finished',
    //   component: components.finished.MakingComponent,
    //   meta:      {
    //     readme: RenderingReadme
    //   }

    // },
    {
      path:      '/vue-d3/force',
      component: components.Force,
      meta:      {
        title:  'Force',
        readme: ForceReadme
      }
    }
  ]
}

export default config