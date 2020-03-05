<template>
  <div class="h-full grid">
    <image-slider
      :items="items"
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
        url: '/static/images/hello.gif'
      },
      {
        url:   '/static/images/excited1.gif',
        title: 'Let\'s do this!'
      }
    ],
    index: 0
  })
}
</script>

<style></style>
