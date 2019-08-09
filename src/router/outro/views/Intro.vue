<template>
  <div class="h-full grid">
    <image-slider :items="items"
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
    items: [
      {
        url: '/static/images/ender.gif'
      }

    ],
    index: 0
  })
}
</script>

<style>

</style>
