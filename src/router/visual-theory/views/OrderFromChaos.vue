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
        url:   '/static/images/chaos1.gif',
        title: 'Typical Human Reaction'
      },
      {
        url:   '/static/images/headache.gif',
        title: 'Also acceptable'
      },
      {
        url:   '/static/images/nice1.gif',
        title: 'that\'s better'
      },
      {
        url:   '/static/images/nice2.gif',
        title: 'that\'s also better'
      },
      {
        url:   '/static/images/memory.jpg',
        title: 'the flow of data'
      },
      {
        url:   '/static/images/sense-bandwidth.jpg',
        title: 'Bandwidth of our senses'
      }
    ]
  })
}
</script>

<style></style>
