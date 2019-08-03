export const Shapes = () => import('@/lessons/vue-d3/shapes/index.vue')
export const Layouts = () => import('@/lessons/vue-d3/layouts/index.vue')
export const Force = () => import('@/lessons/vue-d3/force/index.vue')

export const finished = {
  Shapes:  () => import('@/lessons/vue-d3/shapes/finished/index.vue'),
  Layouts: () => import('@/lessons/vue-d3/layouts/finished/index.vue'),
  Force:   () => import('@/lessons/vue-d3/force/finished/index.vue')
}