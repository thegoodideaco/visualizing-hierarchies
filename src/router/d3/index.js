import IntroReadme from './intro.md'
import TransformReadme from './transform.md'
import ScaleReadme from './scales.md'
import HierarchyReadme from './hierarchy.md'
/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'd3',
  path:      '/d3',
  component: () => import('@/layouts/SidenavLayout.vue'),
  meta:      {
    title: 'D3'
  },
  children: [
    {
      path:      '/d3/intro',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'What is D3?',
        readme: IntroReadme
      }
    },
    {
      path:      '/d3/transforming-data',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'Transforming Data',
        readme: TransformReadme
      }
    },
    {
      path:      '/d3/scales',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'Scales',
        readme: ScaleReadme
      }
    },
    {
      path:      '/d3/hierarchy',
      component: () => import('@/views/vue/Reactivity.vue'),
      meta:      {
        title:  'D3.hierarchy',
        readme: HierarchyReadme
      }
    }
  ]
}

export default config