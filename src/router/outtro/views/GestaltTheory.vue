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
        url:   'https://i.giphy.com/media/73epRtPyzaOOY/giphy.webp',
        title: 'This is your brain making sense of random stuff'
      },
      {
        url:   '/static/images/reading-gravity.jpg',
        title: 'The Gutenberg Diagram'
      }
    ],
    index: 0
  })
}
</script>

<style>

</style>
