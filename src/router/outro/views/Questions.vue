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
        url: '/static/images/questions.png'
      }
    ],
    index: 0,
    links: {

    }
  })
}
</script>

<style></style>
