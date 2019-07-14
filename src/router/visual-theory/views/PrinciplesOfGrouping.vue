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
        url:   'https://designforgeeks.com/wp-content/uploads/2018/08/Two-groups-of-blue-dots-exemplifying-the-Gestalt-principle-of-Proximity.png',
        title: 'Law of Proximity'
      },
      {
        url:   'https://miro.medium.com/max/1400/1*iQgs-ITePo_itl3dfQcFIw.png',
        title: 'Law of Similarity'
      },
      {
        url:   'https://miro.medium.com/max/700/1*LxCr2o4bLGzzZpYp3tPtFw.png',
        title: 'Law of Closure'
      },
      {
        url:   'https://uxmisfit.com/wp-content/uploads/2019/04/symmetry.jpg',
        title: 'Law of Symmetry'
      },
      {
        url:   'https://miro.medium.com/max/1400/1*idl16iEtKFaMKbIuxn-GaA.png',
        title: 'Law of Common Fate'
      },
      {
        url:   'https://miro.medium.com/max/700/1*qiXDOZnWm_NFprHEcDEp8w.png',
        title: 'Law of Continuity'
      }
    ]
  })
}
</script>

<style>

</style>
