export const Shapes = () => import('@/lessons/vue-d3/shapes/index.vue')
export const Layouts = () => import('@/lessons/vue-d3/layouts/index.vue')
export const Force = () => import('@/lessons/vue-d3/force/index.vue')

export const finished = {
  Shapes:      () => import('@/lessons/vue-d3/shapes/finished/index.vue'),
  Reactivity:  () => import('@/lessons/vue/reactivity/finished/index.vue'),
  Rendering:   () => import('@/lessons/vue/rendering/finished/index.vue'),
  Interaction: () => import('@/lessons/vue/interact/finished/index.vue')
}