<template>
  <div>
    <image-slider :active-index.sync="index"
                  :items="items" />
  </div>
</template>

<script>
import ImageSliderVue from '@/components/ImageSlider.vue'
import * as d3 from 'd3-array'
import {csv} from 'd3-fetch'
export default {
  components: {
    ImageSlider: ImageSliderVue
  },
  data: () => ({
    index: 0,
    items: [
      {
        url:   '/static/images/d31.png',
        title: 'This is D3'
      },
      {
        url:   '/static/images/d32.png',
        title: 'Data Utilities'
      },
      {
        url:   '/static/images/d3-visualization.png',
        title: 'Visualization'
      }
    ],
    dataset: null,
    d3:      d3
  }),
  async mounted() {
    const data = await csv('/datasets/googleplaystore.csv')

    this.dataset = Object.freeze(data)
  }
}
</script>

<style>

</style>
