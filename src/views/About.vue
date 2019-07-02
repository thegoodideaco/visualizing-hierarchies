<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      <image-slider :items="images"
                    :active-index.sync="curIndex" />
    </div>
  </sidenav-layout>
</template>

<script>

// import { extent, scaleOrdinal } from 'd3'
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import ImageSliderVue from '../components/ImageSlider.vue'
import readme from './about.md'
export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    ImageSlider:   ImageSliderVue
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
