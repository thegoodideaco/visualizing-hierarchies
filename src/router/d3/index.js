
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
      path:      'create',
      component: () => import('@/views/Home.vue'),
      meta:      {
        title: 'Creating the Dataset'
      }
    },
    {
      path:      'add',
      component: () => import('@/views/MainView.vue'),
      meta:      {
        title: 'Adding D3.Hierarchy'
      }
    }
  ]
}

export default config