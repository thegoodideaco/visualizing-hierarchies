<template>
  <div class="h-full grid">
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
        url: '/static/images/chaos1.gif'
      },
      {
        url: '/static/images/chaos2.gif'
      }
    ]
  })
}
</script>

<style>

</style>
