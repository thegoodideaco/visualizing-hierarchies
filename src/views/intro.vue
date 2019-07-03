<template>
  <sidenav-layout :readme="readme">
    <div class="intro h-full">
      <image-slider :active-index.sync="curIndex"
                    :items="items" />
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '@/layouts/SidenavLayout.vue'
import readme from './intro.md'
import { ImageSlider } from '@/components/demos/asyncDemos'
export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    ImageSlider
  },
  data() {
    return {
      readme:   () => readme,
      curIndex: 0,
      items:    [
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
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.intro {
  display: grid;
  grid: 1fr / 100%;

  > * {
    position: relative;

    &:first-child {
      padding: 10px;

      display: grid;
      grid: 100%/ 100%;
    }
  }
}
</style>
