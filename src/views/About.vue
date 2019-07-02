<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      <image-slider :items="images"
                    :active-index.sync="curIndex" />
    </div>
  </sidenav-layout>
</template>

<script>

import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './about.md'
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
        {
          url:   '/static/images/webpack-treemap.jpg',
          title: 'Testing'
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
          url:   '/static/images/semiology.png',
          title: 'Semiology of Graphics'
        },
        {
          url:   '/static/images/radial-tree.png',
          title: 'Radial Tree'
        },
        {
          url:   '/static/images/vue ui starburst.jpg',
          title: 'Testing 2'
        }
      ],
      curIndex: 0
    }
  }

}
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  align-items: center;
}
</style>
