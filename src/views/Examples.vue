<template>
  <sidenav-layout :readme="readme">
    <div class="examples h-full">
      <image-slider :items="images"
                    :active-index.sync="curIndex" />
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './examples.md'
import { csv } from 'd3'

export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    ImageSlider:   () => import(
      /* webpackChunkName: "ImageSlider" */
      '@/components/ImageSlider.vue')
  },
  data() {
    return {
      readme: () => readme,
      images: [
        () => import(
          /* webpackChunkName: "ReportTree" */
          '@/components/demos/ReportTree.vue'
        ),
        {
          url:   '/static/images/starburst.gif',
          title: 'Testing'
        },
        {
          url:   '/static/images/edge-bundling.jpg',
          title: 'Edge Bundling'
        },
        {
          url:   '/static/images/vue ui starburst.jpg',
          title: 'Starburst visualization in Vue UI'
        }
      ],
      curIndex: 0


    }
  },
  async mounted() {
    const data = await csv('/datasets/googleplaystore.csv')

    console.log(data)
  }
}
</script>

<style lang="scss" scoped>
.examples {
  display: grid;
}
</style>
