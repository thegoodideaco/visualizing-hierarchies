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
        url: '/static/images/chaos2.gif'
      },
      {
        url: '/static/images/chaos1.gif'
      },
      {
        url:   'https://media.giphy.com/media/GR81UZYyhN3Ww/giphy.gif',
        title: 'that\'s better'
      },
      {
        url:   'https://media3.giphy.com/media/3osxYzUOBRWEg5S5q0/source.gif',
        title: 'that\'s also better'
      }
    ]
  })
}
</script>

<style>

</style>
