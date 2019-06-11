
/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'vue',
  path:      '/vue',
  component: () => import('@/layouts/SidenavLayout.vue'),
  meta:      {
    title: 'Combining Vue'
  },
  children: [
    {
      path:      'reactivity',
      component: () => import('@/views/Home.vue'),
      meta:      {
        title: 'Reactivity'
      }
    },
    {
      path:      'generators',
      component: () => import('@/views/MainView.vue'),
      meta:      {
        title: 'Generators'
      }
    }
  ]
}

export default config