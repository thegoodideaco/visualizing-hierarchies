<template>
  <div>
    <image-slider :active-index.sync="index"
                  :items="items" />
  </div>
</template>

<script>
import ImageSliderVue from '@/components/ImageSlider.vue'
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
    ]
  })
}
</script>

<style>

</style>
