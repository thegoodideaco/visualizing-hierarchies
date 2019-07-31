<template>
  <div class="h-full grid">
    <image-slider :items="items"
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
    items: [
      {
        url: 'https://thumbs.gfycat.com/DifficultDiligentCobra-size_restricted.gif'
      },
      {
        url: 'http://worklad.co.uk/wp-content/uploads/2015/01/440860250997548473.jpg'
      },
      {
        url:   'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/80d41e10901127.560ed42405670.png',
        title: 'History of Life / Juan Martinez'
      },
      {
        url: 'http://media3.washingtonpost.com/wp-dyn/content/graphic/2009/08/12/GR2009081200033.gif'
      },
      {
        url:   'https://i.pinimg.com/originals/66/2d/ad/662dadef598541451d14d07a97999e4e.gif',
        title: 'Let\'s do this!'
      }
    ],
    index: 0
  })
}
</script>

<style>

</style>
