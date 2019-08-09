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
        url:   '/static/images/chaos2.gif',
        title: 'This is Annoying'
      },
      {
        url:   '/static/images/chaos1.gif',
        title: 'Typical Human Reaction'
      },
      {
        url:   'https://media.giphy.com/media/GR81UZYyhN3Ww/giphy.gif',
        title: 'that\'s better'
      },
      {
        url:   'https://media3.giphy.com/media/3osxYzUOBRWEg5S5q0/source.gif',
        title: 'that\'s also better'
      },
      {
        url:   '/static/images/sense-bandwidth.jpg',
        title: 'Bandwidth of our senses'
      }
    ]
  })
}
</script>

<style>

</style>
