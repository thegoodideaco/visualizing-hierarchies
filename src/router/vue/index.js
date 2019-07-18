
import IntroReadme from './intro.md'
import MakingReadme from './making.md'
import ReactivityReadme from './reactivity.md'
import InteractionReadme from './interaction.md'
import RenderingReadme from './rendering.md'
import * as components from './asyncComponents'
import { SideNavLayout } from '@/layouts/componentViews'


/** @type {import("vue-router").RouteConfig} */
export const config = {
  name:      'vue',
  path:      '/vue',
  redirect:  '/vue/intro',
  component: SideNavLayout,
  meta:      {
    title: 'Vue'
  },
  children: [
    {
      path:      '/vue/intro',
      component: components.Intro,
      meta:      {
        title:  'What is Vue?',
        readme: IntroReadme
      }
    },
    {
      path:      '/vue/code/single-file-component',
      component: components.MakingComponent,
      meta:      {
        title:  'Making a Component',
        readme: MakingReadme
      }
    },
    {
      path:      '/vue/reactivity',
      component: components.Reactivity,
      meta:      {
        title:  'Reactivity',
        readme: ReactivityReadme
      }
    },
    {
      path:      '/vue/rendering',
      component: components.TemplateRendering,
      meta:      {
        title:  'Template Rendering',
        readme: RenderingReadme
      }
    },
    {
      path:      '/vue/interaction',
      component: components.Interaction,
      meta:      {
        title:  'Interaction',
        readme: InteractionReadme
      }
    }
  ]
}

export default config