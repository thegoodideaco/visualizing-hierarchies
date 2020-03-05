<template>
  <div>
    <image-slider
      :active-index.sync="index"
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
        url: '/static/images/vue intro.png'
      }
    ]
  })
}
</script>

<style></style>
