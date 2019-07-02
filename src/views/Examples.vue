<template>
  <sidenav-layout :readme="readme">
    <div class="examples h-full">
      <image-slider v-if="false"
                    :items="images"
                    :active-index.sync="curIndex" />

      <iframe class="cover-full gpu"
              width="100%"
              height="100%"
              :src="debug ? '/static/report.html' : '/report.html'" />
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './examples.md'
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
      debug:  process.env.NODE_ENV === 'development',
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
