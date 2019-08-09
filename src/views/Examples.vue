<template>
  <sidenav-layout :readme="readme">
    <div class="examples h-full">
      <image-slider :items="images"
                    :active-index.sync="curIndex" />
    </div>
  </sidenav-layout>
</template>

<script>
import SidenavLayoutVue from '../layouts/SidenavLayout.vue'
import readme from './examples.md'
import { ReportTree, ImageSlider } from '@/components/demos/asyncDemos'

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
          url:   'https://i.stack.imgur.com/iLsgy.png',
          title: 'Cluster Dendrogram'
        },
        {
          url:
            'https://architect-api.readthedocs.io/en/latest/_images/node-link-tree.png',
          title: 'Tidy Tree'
        },
        {
          url:   '/static/images/radial-tree.png',
          title: 'Radial Tidy Tree'
        },
        {
          url:   '/static/images/starburst.gif',
          title: 'Starburst'
        },
        ReportTree,
        {
          url:
            'https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/imgs/js-profile.png',
          title: 'Flame Graph using Partition Layout'
        },
        {
          url:   'https://www.d3indepth.com/img/layouts/pack.png',
          title: 'Circle Packing'
        }
      ],
      curIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.examples {
  display: grid;
}
</style>
