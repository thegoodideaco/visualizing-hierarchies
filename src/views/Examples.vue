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
import { ReportTree, ImageSlider, EdgeBundling } from '@/components/demos/asyncDemos'

export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    ImageSlider
  },
  data() {
    return {
      readme: () => readme,
      images: [
        ReportTree,
        EdgeBundling,
        {
          url:   '/static/images/edge-bundling.jpg',
          title: 'Edge Bundling'
        },
        {
          url:   '/static/images/radial-tree.png',
          title: 'Starburst visualization in Vue UI'
        }
      ],
      curIndex: 0


    }
  }
}
</script>

<style lang="scss" scoped>
.examples {
  display: grid;
}
</style>
