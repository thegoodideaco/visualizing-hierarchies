<template>
  <sidenav-layout :readme="readme">
    <div class="about h-full">
      <image-slider :items="images"
                    :active-index.sync="curIndex" />
    </div>
  </sidenav-layout>
</template>

<script>

import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './about.md'
import { ImageSlider } from '../components/demos/asyncDemos'
export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    ImageSlider
  },
  data() {
    return {
      readme: () => readme,
      images: [
        {
          url:   '/static/images/graph vs tree.png',
          title: 'A Tree (Left) compared to a graph (Right)'
        },
        {
          url:   '/static/images/dom.png',
          title: 'DOM Hierarchy Sample'
        },
        {
          url:   '/static/images/decisiontree.png',
          title: 'Decision Tree'
        },
        {
          url:   '/static/images/organogram.jpg',
          title: 'Organogram'
        },
        {
          url:   '/static/images/taxonomy.jpg',
          title: 'Taxonomy'
        },
        {
          url:   '/static/images/imagenet.png',
          title: 'More Classification Uses'
        },
        {
          url: '/static/images/gestalt.png'
        },
        {
          url: '/static/images/what.gif'
        },
        {
          url: '/static/images/omg1.gif'
        },
        {
          url: '/static/images/clap1.gif'
        }
      ],
      curIndex: 0
    }
  }

}
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  align-items: center;
}
</style>
