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
        url: '/static/images/pragnanz.png'
      },
      {
        url:   '/static/images/laws/proximity2.png',
        title: 'Law of Proximity'
      },
      {
        url:   '/static/images/laws/similarity.png',
        title: 'Law of Similarity'
      },
      {
        url:   '/static/images/laws/closure.png',
        title: 'Law of Closure'
      },
      {
        url:   '/static/images/laws/symmetry.jpg',
        title: 'Law of Symmetry'
      },
      {
        url:   '/static/images/laws/common-fate.png',
        title: 'Law of Common Fate'
      },
      {
        url:   '/static/images/laws/continuity.png',
        title: 'Law of Continuity'
      }
    ]
  })
}
</script>

<style></style>
