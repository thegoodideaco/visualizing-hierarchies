<template>
  <div class="h-full grid">
    <image-slider :items="images"
                  :active-index.sync="index" />
  </div>
</template>

<script>
import ImageSliderVue from '../../../components/ImageSlider.vue'
export default {
  components: {
    ImageSlider: ImageSliderVue
  },
  data: () => ({
    images: [
      {
        url:   '/static/images/gestalt logo.png',
        title: '"The whole is other than the sum of the parts."'
      },
      {
        url:   '/static/images/gestalt1.webp',
        title: 'This is your brain making sense of random stuff'
      }
    ],
    index: 0
  })
}
</script>

<style></style>
