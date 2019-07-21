export const Intro = () => import('./views/Intro.vue')

export const MakingComponent = () => import('./views/MakingComponent.vue')
export const Reactivity = () => import('@/lessons/vue/reactivity/index.vue')
export const TemplateRendering = () => import('./views/TemplateRendering.vue')
export const Interaction = () => import('./views/Interaction.vue')

export const finished = {
  MakingComponent: () => import('@/lessons/vue/create/finished/index.vue'),
  Reactivity:      () => import('@/lessons/vue/reactivity/finished/index.vue'),
  Rendering:       () => import('@/lessons/vue/rendering/finished/index.vue')
}