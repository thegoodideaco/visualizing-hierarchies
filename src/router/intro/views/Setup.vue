<template>
  <div class="h-full grid">
    <!-- <image-slider :items="items"
                  :active-index.sync="index" /> -->
    <markdown-viewer class="h-full text-2xl w-full"
                     :value="readme" />
  </div>
</template>

<script>
// import ImageSliderVue from '../../../components/ImageSlider.vue'
import MarkdownDisplayVue from '../../../components/MarkdownDisplay.vue'
import setup from '../setup.md'
export default {
  components: {
    // ImageSlider:    ImageSliderVue,
    MarkdownViewer: MarkdownDisplayVue
  },
  data: () => ({
    readme: setup,
    items:  [
      {}
    ]
  })
}
</script>

<style scoped lang="scss">
.grid {
  align-items: center;
  justify-items: center;
}
</style>
