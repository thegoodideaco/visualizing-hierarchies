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
        url:   'https://miro.medium.com/max/7000/0*LRtj-YX29bDYCFLN',
        title: 'Visualization'
      }
    ]
  })
}
</script>

<style>

</style>
