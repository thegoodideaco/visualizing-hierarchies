
/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'vued3',
  path:      '/vue-d3',
  component: () => import('@/layouts/SidenavLayout.vue'),
  meta:      {
    title: 'Vue + D3'
  },
  children: [
    {
      path:      '/vue-d3/basic-rendering',
      component: () => import('@/views/Home.vue'),
      meta:      {
        title: 'Basic Rendering'
      }
    },
    {
      path:      '/vue-d3/layouts',
      component: () => import('@/views/Home.vue'),
      meta:      {
        title: 'Hierarchical Layouts'
      }
    },
    {
      path:      '/vue-d3/optimization',
      component: () => import('@/views/Home.vue'),
      meta:      {
        title: 'optimization'
      }
    },
    {
      path:      '/vue-d3/infographics',
      component: () => import('@/views/Home.vue'),
      meta:      {
        title: 'Automating Infographics'
      }
    }
  ]
}

export default config