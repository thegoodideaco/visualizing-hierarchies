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
    // ! Shapes
    {
      path:      '/vue-d3/shapes',
      component: components.Shapes,
      meta:      {
        title:  'SVG & Shapes',
        readme: ShapesReadme
      }
    },
    {
      path:      '/vue-d3/shapes/finished',
      component: components.finished.Shapes,
      meta:      {
        readme: ShapesReadme
      }
    },

    // ! Layouts
    {
      path:      '/vue-d3/layouts',
      component: components.Layouts,
      meta:      {
        title:  'Layouts',
        readme: LayoutsReadme
      }
    },
    {
      path:      '/vue-d3/layouts/finished',
      component: components.finished.Layouts,
      meta:      {
        readme: LayoutsReadme
      }
    },

    // ! Layouts
    {
      path:      '/vue-d3/radial-layouts',
      component: components.Layouts,
      meta:      {
        title:  'Radial Layouts',
        readme: LayoutsReadme
      }
    },
    {
      path:      '/vue-d3/radial-layouts/finished',
      component: components.finished.Layouts,
      meta:      {
        readme: LayoutsReadme
      }
    },

    // ! Force
    {
      path:      '/vue-d3/force',
      component: components.Force,
      meta:      {
        title:  'Force',
        readme: ForceReadme
      }
    },
    {
      path:      '/vue-d3/force/finished',
      component: components.finished.Force,
      meta:      {
        readme: ForceReadme
      }
    }
  ]
}

export default config
