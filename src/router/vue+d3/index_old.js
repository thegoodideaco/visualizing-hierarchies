import { HomeView } from '@/views/asyncComponents'
import { SideNavLayout } from '@/layouts/componentViews'

/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'vued3',
  path:      '/vue-d3',
  component: SideNavLayout,
  meta:      {
    title: 'Vue + D3'
  },
  children: [
    {
      path:      '/vue-d3/basic-rendering',
      component: HomeView,
      meta:      {
        title: 'Basic Rendering'
      }
    },
    {
      path:      '/vue-d3/layouts',
      component: HomeView,
      meta:      {
        title: 'Hierarchical Layouts'
      }
    },
    {
      path:      '/vue-d3/optimization',
      component: HomeView,
      meta:      {
        title: 'optimization'
      }
    },
    {
      path:      '/vue-d3/infographics',
      component: HomeView,
      meta:      {
        title: 'Automating Infographics'
      }
    }
  ]
}

export default config