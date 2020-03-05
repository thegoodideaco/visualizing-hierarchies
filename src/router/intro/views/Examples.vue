<template>
  <div class="h-full grid">
    <image-slider
      :items="items"
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
        url:   '/static/images/examples/cluster.png',
        title: 'Cluster Dendrogram'
      },
      {
        url:   '/static/images/examples/tidy-tree.png',
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
        url:   '/static/images/examples/partition.png',
        title: 'Flame Graph using Partition Layout'
      },
      {
        url:   '/static/images/examples/circle-packing.png',
        title: 'Circle Packing'
      }
    ],
    index: 0
  })
}
</script>

<style></style>
