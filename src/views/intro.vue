<template>
  <sidenav-layout :readme="readme">
    <div class="intro h-full">
      <image-slider :active-index.sync="curIndex"
                    :items="items" />
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '@/layouts/SidenavLayout.vue'
import readme from './intro.md'
import { ImageSlider } from '@/components/demos/asyncDemos'
export default {
  components: {
    SidenavLayout: SidenavLayoutVue,
    ImageSlider
  },
  data() {
    return {
      readme:   () => readme,
      curIndex: 0,
      items:    [
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
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.intro {
  display: grid;
  grid: 1fr / 1fr;

  > * {
    position: relative;

    &:first-child {
      padding: 10px;

      display: grid;
      grid: 1fr/ 1fr;
    }
  }
}
</style>
