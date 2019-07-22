import IntroReadme from './intro.md'
import TransformReadme from './transform.md'
import ScaleReadme from './scales.md'
import HierarchyReadme from './hierarchy.md'
import { SideNavLayout } from '@/layouts/componentViews'
import { ReactiveView } from '@/views/vue'
import * as components from './asyncComponents'
/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'd3',
  path:      '/d3',
  component: SideNavLayout,
  meta:      {
    title: 'D3'
  },
  children: [
    {
      path:      '/d3/intro',
      component: components.Intro,
      meta:      {
        title:  'What is D3?',
        readme: IntroReadme
      }
    },
    {
      path:      '/d3/transforming-data',
      component: components.TransformingData,
      meta:      {
        title:  'Transforming Data',
        readme: TransformReadme
      }
    },
    {
      path:      '/d3/scales',
      component: ReactiveView,
      meta:      {
        title:  'Scales',
        readme: ScaleReadme
      }
    },
    {
      path:      '/d3/hierarchy',
      component: ReactiveView,
      meta:      {
        title:  'D3.hierarchy',
        readme: HierarchyReadme
      }
    }
  ]
}

export default config