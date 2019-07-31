<template>
  <div class="h-full grid">
    <image-slider :items="items"
                  :active-index.sync="index" />
  </div>
</template>

<script>
import ImageSliderVue from '@/components/ImageSlider.vue'
import { ReportTree } from '@/components/demos/asyncDemos'
export default {
  components: {
    ImageSlider: ImageSliderVue
  },
  data: () => ({
    items: [
      {
        url:   'https://i.stack.imgur.com/iLsgy.png',
        title: 'Cluster Dendrogram'
      },
      {
        url:   'https://architect-api.readthedocs.io/en/latest/_images/node-link-tree.png',
        title: 'Tidy Tree'
      },
      {
        url:   '/static/images/radial-tree.png',
        title: 'Radial Tidy Tree'
      },
      {
        url:   '/static/images/starburst.gif',
        title: 'Starburst'
      },
      ReportTree,
      {
        url:   'https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/js-profile.png',
        title: 'Flame Graph using Partition Layout'
      },
      {
        url:   'https://www.d3indepth.com/img/layouts/pack.png',
        title: 'Circle Packing'
      }
    ],
    index: 0
  })
}
</script>

<style>

</style>
