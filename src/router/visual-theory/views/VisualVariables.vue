<template>
  <div>
    <image-slider :items="images"
                  :active-index.sync="index" />
  </div>
</template>

<script>
import ImageSliderVue from '@/components/ImageSlider.vue'
export default {
  components: {
    ImageSlider: ImageSliderVue
  },
  data: () => ({
    index:  0,
    images: [
      {
        url: '/static/images/semiology.png'
      }
    ]
  })
}
</script>

<style>

</style>
