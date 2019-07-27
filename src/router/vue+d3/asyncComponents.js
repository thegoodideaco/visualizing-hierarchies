export const BasicRendering = () => import('./views/Intro.vue')

export const Layouts = () => import('./views/MakingComponent.vue')
export const Reactivity = () => import('@/lessons/vue/reactivity/index.vue')
export const TemplateRendering = () => import('@/lessons/vue/rendering/index.vue')
export const Interaction = () => import('@/lessons/vue/interact/index.vue')

export const finished = {
  MakingComponent: () => import('@/lessons/vue/create/finished/index.vue'),
  Reactivity:      () => import('@/lessons/vue/reactivity/finished/index.vue'),
  Rendering:       () => import('@/lessons/vue/rendering/finished/index.vue'),
  Interaction:     () => import('@/lessons/vue/interact/finished/index.vue')
}