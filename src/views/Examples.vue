<template>
  <sidenav-layout :readme="readme">
    <div class="examples h-full">
      <image-slider v-if="false"
                    :items="images"
                    :active-index.sync="curIndex" />

      <report-tree />
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './examples.md'
import { csv } from 'd3'
import ReportTreeVue from '../components/demos/ReportTree.vue'

export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    ImageSlider:   () => import(
      /* webpackChunkName: "ImageSlider" */
      '@/components/ImageSlider.vue'),
    ReportTree: ReportTreeVue
  },
  data() {
    return {
      readme: () => readme,
      images: [
        {
          url:   '/static/images/webpack-treemap.jpg',
          title: 'Webpack generated treemap of the final build.'
        },
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
  align-items: center;
  justify-items: center;
}
</style>
